const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Exercise the actual service with an injected SDK boundary; no credentials or network.
const source = fs.readFileSync(
  path.join(__dirname, "../features/plan-items/plan-item-service.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const row = {
  id: "00000000-0000-0000-0000-000000000001",
  plan_id: "00000000-0000-0000-0000-000000000002",
  item_id: "00000000-0000-0000-0000-000000000003",
  quantity: 2,
  is_checked: true,
  note: "Keep this note",
  sort_order: 4,
  group_id: null,
};

function setup({
  data = row,
  error = null,
  user = { id: "owner" },
  authError = null,
} = {}) {
  const calls = [];
  const query = {};
  for (const method of [
    "select",
    "insert",
    "update",
    "delete",
    "eq",
    "order",
  ]) {
    query[method] = (...args) => {
      calls.push([method, ...args]);
      return query;
    };
  }
  for (const method of ["returns", "single", "maybeSingle"]) {
    query[method] = async () => {
      calls.push([method]);
      return { data, error };
    };
  }
  const client = {
    auth: { getUser: async () => ({ data: { user }, error: authError }) },
    from: (table) => {
      calls.push(["from", table]);
      return query;
    },
  };
  const module = { exports: {} };
  const mockRequire = (name) => {
    assert.equal(name, "@/utils/supabase/client");
    return { createClient: () => client };
  };
  new Function("require", "module", "exports", compiled)(
    mockRequire,
    module,
    module.exports,
  );
  return { service: module.exports, calls };
}

test("list filters by plan, orders deterministically and maps DB fields", async () => {
  const { service, calls } = setup({ data: [row] });
  const result = await service.getPlanItems(row.plan_id);
  assert.equal(result[0].itemId, row.item_id);
  assert.equal(result[0].isChecked, true);
  assert.equal(result[0].groupId, null);
  assert.ok(
    calls.some(
      (call) =>
        call[0] === "eq" && call[1] === "plan_id" && call[2] === row.plan_id,
    ),
  );
  assert.deepEqual(
    calls.filter((call) => call[0] === "order").map((call) => call[1]),
    ["sort_order", "id"],
  );
});

test("single read handles missing/invisible rows without inventing data", async () => {
  const { service } = setup({ data: null });
  assert.equal(await service.getPlanItem(row.id), null);
});

test("create applies defaults and only inserts a checklist entry", async () => {
  const { service, calls } = setup();
  await service.createPlanItem({ planId: row.plan_id, itemId: row.item_id });
  assert.deepEqual(calls.find((call) => call[0] === "insert")[1], {
    plan_id: row.plan_id,
    item_id: row.item_id,
    quantity: 1,
    is_checked: false,
    note: null,
    sort_order: 0,
    group_id: null,
  });
  assert.deepEqual(
    calls.filter((call) => call[0] === "from"),
    [["from", "plan_items"]],
  );
});

test("ticking sends only checked state, including explicit false", async () => {
  const { service, calls } = setup();
  await service.updatePlanItem(row.id, { isChecked: false });
  assert.deepEqual(calls.find((call) => call[0] === "update")[1], {
    is_checked: false,
  });
  assert.ok(
    calls.some(
      (call) => call[0] === "eq" && call[1] === "id" && call[2] === row.id,
    ),
  );
});

test("update preserves zero/null and never accepts ownership or relation reassignment", async () => {
  const { service, calls } = setup();
  await service.updatePlanItem(row.id, {
    note: null,
    groupId: null,
    sortOrder: 0,
    planId: row.item_id,
    itemId: row.plan_id,
    user_id: "another-user",
  });
  assert.deepEqual(calls.find((call) => call[0] === "update")[1], {
    note: null,
    group_id: null,
    sort_order: 0,
  });
});

test("rejects invalid values before querying the database", async () => {
  const { service, calls } = setup();
  for (const input of [
    {},
    { planId: row.plan_id },
    { quantity: 0 },
    { quantity: -1 },
    { quantity: 1.5 },
    { quantity: NaN },
    { quantity: null },
    { quantity: 2147483648 },
    { sortOrder: -1 },
    { sortOrder: 0.5 },
    { isChecked: "true" },
    { isChecked: null },
    { groupId: "mock-group" },
    { note: 123 },
  ]) {
    await assert.rejects(service.updatePlanItem(row.id, input));
  }
  await assert.rejects(service.getPlanItems("mock-plan"));
  await assert.rejects(
    service.createPlanItem({ planId: row.plan_id, itemId: "mock-item" }),
  );
  await assert.rejects(
    service.createPlanItem({
      planId: row.plan_id,
      itemId: row.item_id,
      quantity: null,
    }),
  );
  assert.equal(calls.length, 0);
});

test("requires a signed-in user before accessing plan_items", async () => {
  const { service, calls } = setup({ user: null });
  await assert.rejects(service.getPlanItems(row.plan_id), /đăng nhập/);
  assert.equal(calls.length, 0);
});

test("propagates database and auth errors for the UI", async () => {
  const dbError = { code: "42501", message: "RLS denied" };
  const { service } = setup({ error: dbError, data: null });
  await assert.rejects(
    service.createPlanItem({ planId: row.plan_id, itemId: row.item_id }),
    (error) => error === dbError,
  );
  const authError = new Error("Network unavailable");
  const auth = setup({ authError });
  await assert.rejects(
    auth.service.getPlanItems(row.plan_id),
    (error) => error === authError,
  );
  assert.equal(auth.calls.length, 0);
});

test("delete targets only the given checklist row and requests a result", async () => {
  const { service, calls } = setup({ data: { id: row.id } });
  await service.deletePlanItem(row.id);
  assert.deepEqual(calls, [
    ["from", "plan_items"],
    ["delete"],
    ["eq", "id", row.id],
    ["select", "id"],
    ["single"],
  ]);
});

test("zero affected rows must not report update/delete success", async () => {
  const error = { code: "PGRST116", message: "No row returned" };
  const { service } = setup({ error, data: null });
  await assert.rejects(
    service.deletePlanItem(row.id),
    (actual) => actual === error,
  );
  await assert.rejects(
    service.updatePlanItem(row.id, { quantity: 2 }),
    (actual) => actual === error,
  );
});
