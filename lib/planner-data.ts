/** Mock repository data. Keep these three entities aligned with the future Supabase tables. */
export type Plan = {
  id: string;
  userId: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  fee: number;
  category: string;
  cover: "dalat" | "danang" | "hanoi" | "custom";
  createdAt: string;
};

export type Item = {
  id: string;
  userId: string;
  name: string;
};

export type PlanItem = {
  id: string;
  planId: string;
  itemId: string;
  quantity: number;
  isChecked: boolean;
  note: string;
  sortOrder: number;
  group: string;
};

export type PlannerData = {
  plans: Plan[];
  items: Item[];
  planItems: PlanItem[];
};

export type TemplateItem = {
  name: string;
  quantity: number;
  group: string;
  note?: string; 
};

export type ChecklistTemplate = {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: TemplateItem[];
};

export const groups = [
  "Trang phục",
  "Đồ cá nhân",
  "Giấy tờ & thiết bị",
  "Chèo SUP",
  "Tennis",
  "Khác",
];

const demoUserId = "demo-user";
const createdAt = "2026-10-13T08:00:00.000+07:00";

export const templates: ChecklistTemplate[] = [
  {
    id: "weekend",
    name: "Cuối tuần đổi gió",
    description: "Những món cần thiết cho chuyến đi 2 ngày 1 đêm.",
    icon: "mountain",
    items: [
      { name: "Áo thun", quantity: 2, group: "Trang phục" },
      { name: "Quần dài", quantity: 1, group: "Trang phục" },
      { name: "Áo khoác", quantity: 1, group: "Trang phục" },
      { name: "Đồ lót", quantity: 3, group: "Trang phục" },
      { name: "Tất", quantity: 2, group: "Trang phục" },
      { name: "Bộ đồ ngủ", quantity: 1, group: "Đồ cá nhân" },
      { name: "Bàn chải & kem đánh răng", quantity: 1, group: "Đồ cá nhân" },
      { name: "Kem chống nắng", quantity: 1, group: "Đồ cá nhân" },
      { name: "CCCD", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Sạc điện thoại", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Pin dự phòng", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Áo mưa gọn", quantity: 1, group: "Đồ cá nhân" },
    ],
  },
  {
    id: "beach",
    name: "Hẹn với biển xanh",
    description: "Đồ bơi, chống nắng và một chút tinh thần mùa hè.",
    icon: "sun",
    items: [
      { name: "Áo thun", quantity: 3, group: "Trang phục" },
      { name: "Quần short", quantity: 2, group: "Trang phục" },
      { name: "Đồ lót", quantity: 4, group: "Trang phục" },
      { name: "Quần bơi", quantity: 2, group: "Trang phục" },
      { name: "Sandal có quai", quantity: 1, group: "Trang phục" },
      { name: "Kính mát", quantity: 1, group: "Đồ cá nhân" },
      { name: "Mũ", quantity: 1, group: "Đồ cá nhân" },
      { name: "Kem chống nắng", quantity: 1, group: "Đồ cá nhân" },
      { name: "Khăn nhỏ", quantity: 1, group: "Đồ cá nhân" },
      { name: "Túi đựng đồ ướt", quantity: 1, group: "Đồ cá nhân" },
      { name: "Bàn chải & kem đánh răng", quantity: 1, group: "Đồ cá nhân" },
      { name: "CCCD", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Sạc điện thoại", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Pin dự phòng", quantity: 1, group: "Giấy tờ & thiết bị" },
    ],
  },
  {
    id: "business",
    name: "Chuyến công tác gọn gàng",
    description: "Sẵn sàng cho lịch trình làm việc xa nhà.",
    icon: "briefcase",
    items: [
      { name: "Áo sơ mi", quantity: 2, group: "Trang phục" },
      { name: "Quần dài", quantity: 2, group: "Trang phục" },
      { name: "Áo khoác", quantity: 1, group: "Trang phục" },
      { name: "Đồ lót", quantity: 3, group: "Trang phục" },
      { name: "Tất", quantity: 3, group: "Trang phục" },
      { name: "Bàn chải & kem đánh răng", quantity: 1, group: "Đồ cá nhân" },
      { name: "Laptop & sạc", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Tai nghe", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "CCCD", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Sạc điện thoại", quantity: 1, group: "Giấy tờ & thiết bị" },
      { name: "Pin dự phòng", quantity: 1, group: "Giấy tờ & thiết bị" },
    ],
  },
];

type SeedEntry = TemplateItem & { checked?: boolean };

const dalatEntries: SeedEntry[] = [
  {
    name: "Áo thun trắng / kem",
    quantity: 2,
    group: "Trang phục",
    checked: true,
    note: "Sơ vin cùng quần suông, mỗi ngày một áo.",
  },
  {
    name: "Áo khoác dạ màu kem",
    quantity: 1,
    group: "Trang phục",
    checked: true,
    note: "Áo trucker yêu thích, khoác ngoài khi dạo phố.",
  },
  {
    name: "Quần suông đen",
    quantity: 1,
    group: "Trang phục",
    checked: true,
    note: "Mặc sẵn khi khởi hành.",
  },
  {
    name: "Quần suông be / xám",
    quantity: 1,
    group: "Trang phục",
    note: "Bộ dạo phố ngày Chủ nhật.",
  },
  { name: "Đồ lót", quantity: 4, group: "Trang phục", checked: true },
  {
    name: "Tất",
    quantity: 3,
    group: "Trang phục",
    checked: true,
    note: "Có một đôi tất thể thao.",
  },
  {
    name: "Áo thể thao nhanh khô",
    quantity: 1,
    group: "Chèo SUP",
    note: "Ưu tiên dài tay; giữ bộ đồ thay trong túi kín.",
  },
  { name: "Quần bơi", quantity: 1, group: "Chèo SUP" },
  { name: "Sandal có quai", quantity: 1, group: "Chèo SUP" },
  {
    name: "Túi chống nước điện thoại",
    quantity: 1,
    group: "Chèo SUP",
    checked: true,
  },
  { name: "Khăn nhỏ", quantity: 1, group: "Chèo SUP" },
  { name: "Áo tennis", quantity: 1, group: "Tennis" },
  { name: "Quần short thể thao", quantity: 1, group: "Tennis" },
  { name: "Giày tennis", quantity: 1, group: "Tennis", checked: true },
  {
    name: "Vợt tennis",
    quantity: 1,
    group: "Tennis",
    note: "Kiểm tra sân có cung cấp bóng không.",
  },
  { name: "Kem chống nắng", quantity: 1, group: "Đồ cá nhân", checked: true },
  { name: "Bàn chải & kem đánh răng", quantity: 1, group: "Đồ cá nhân" },
  {
    name: "Bộ đồ ngủ",
    quantity: 1,
    group: "Đồ cá nhân",
    note: "Bộ dài tay cho buổi tối.",
  },
  { name: "Áo mưa gọn", quantity: 1, group: "Đồ cá nhân" },
  { name: "Túi đựng đồ ướt", quantity: 2, group: "Đồ cá nhân" },
  { name: "CCCD", quantity: 1, group: "Giấy tờ & thiết bị", checked: true },
  {
    name: "Sạc điện thoại",
    quantity: 1,
    group: "Giấy tờ & thiết bị",
    checked: true,
  },
  {
    name: "Pin dự phòng",
    quantity: 1,
    group: "Giấy tờ & thiết bị",
    note: "Sạc đầy trước khi đi.",
  },
  {
    name: "Tiền mặt",
    quantity: 1,
    group: "Giấy tờ & thiết bị",
    note: "Một ít tiền lẻ cho chợ đêm và gửi xe.",
  },
];

function buildSeed(): PlannerData {
  const plans: Plan[] = [
    {
      id: "plan-dalat",
      userId: demoUserId,
      name: "Đà Lạt, mình đi thôi!",
      destination: "Đà Lạt",
      startDate: "2026-10-17",
      endDate: "2026-10-18",
      fee: 1250000,
      category: "Du lịch",
      cover: "dalat",
      createdAt,
    },
    {
      id: "plan-danang",
      userId: demoUserId,
      name: "Một chút vitamin biển",
      destination: "Đà Nẵng",
      startDate: "2026-11-06",
      endDate: "2026-11-09",
      fee: 2400000,
      category: "Du lịch",
      cover: "danang",
      createdAt,
    },
    {
      id: "plan-hanoi",
      userId: demoUserId,
      name: "Hẹn Hà Nội mùa đông",
      destination: "Hà Nội",
      startDate: "2026-12-11",
      endDate: "2026-12-13",
      fee: 0,
      category: "Tham quan",
      cover: "hanoi",
      createdAt,
    },
  ];
  const items: Item[] = [];
  const planItems: PlanItem[] = [];
  const addRows = (planId: string, entries: SeedEntry[]) => {
    entries.forEach((entry, index) => {
      let item = items.find((existing) => existing.name === entry.name);
      if (!item) {
        item = {
          id: `item-${items.length + 1}`,
          userId: demoUserId,
          name: entry.name,
        };
        items.push(item);
      }
      planItems.push({
        id: `${planId}-row-${index + 1}`,
        planId,
        itemId: item.id,
        quantity: entry.quantity,
        isChecked: entry.checked ?? false,
        note: entry.note ?? "",
        sortOrder: index,
        group: entry.group,
      });
    });
  };
  addRows("plan-dalat", dalatEntries);
  addRows(
    "plan-danang",
    templates[1].items.map((item, index) => ({
      ...item,
      checked: index === 0 || index === 11,
    })),
  );
  addRows("plan-hanoi", templates[0].items);
  return { plans, items, planItems };
}

export const seedData: PlannerData = buildSeed();

/** A fresh copy prevents mutations in the UI from changing the fixture. */
export function createSeedData(): PlannerData {
  return {
    plans: seedData.plans.map((plan) => ({ ...plan })),
    items: seedData.items.map((item) => ({ ...item })),
    planItems: seedData.planItems.map((row) => ({ ...row })),
  };
}

export function makeId(prefix = "id"): string {
  return `${prefix}-${globalThis.crypto.randomUUID()}`;
}

/** Reuses catalog item IDs; quantities and notes stay specific to the new plan. */
export function clonePlan(
  plan: Plan,
  rows: PlanItem[],
  newId = makeId("plan"),
): { plan: Plan; planItems: PlanItem[] } {
  return {
    plan: {
      ...plan,
      id: newId,
      name: `${plan.name} (bản sao)`,
      fee: 0,
      createdAt: new Date().toISOString(),
    },
    planItems: rows
      .filter((row) => row.planId === plan.id)
      .map((row) => ({
        ...row,
        id: makeId("row"),
        planId: newId,
        isChecked: false,
      })),
  };
}

export function getPlanProgress(planId: string, rows: PlanItem[]) {
  const planRows = rows.filter((row) => row.planId === planId);
  const total = planRows.length;
  const checked = planRows.filter((row) => row.isChecked).length;
  return {
    total,
    checked,
    remaining: total - checked,
    percent: total ? Math.round((checked / total) * 100) : 0,
  };
}

/** Date-only values are evaluated in UTC to avoid daylight-saving transitions. */
export function getDuration(startDate: string, endDate: string) {
  const start = Date.parse(`${startDate}T00:00:00Z`);
  const end = Date.parse(`${endDate}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start)
    return { days: 0, nights: 0 };
  const nights = Math.round((end - start) / 86400000);
  return { days: nights + 1, nights };
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()))
    return "Chưa chọn ngày";
  const fmt = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  if (startDate === endDate) return fmt.format(start);
  if (
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth()
  ) {
    return `${start.getUTCDate()} – ${end.getUTCDate()} thg ${end.getUTCMonth() + 1}, ${end.getUTCFullYear()}`;
  }
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}
