import { makeId, type PlannerData } from "@/lib/planner-data";
import { normalized } from "./helpers";
export type ItemValues = {
  name: string;
  quantity: number;
  note: string;
  group: string;
};
export function appendItems(
  data: PlannerData,
  planId: string,
  values: { name: string; quantity: number; group: string; note?: string }[],
): PlannerData {
  const items = [...data.items];
  const planItems = [...data.planItems];
  for (const value of values) {
    let item = items.find(
      (item) => normalized(item.name) === normalized(value.name),
    );
    if (!item) {
      item = {
        id: makeId("item"),
        userId: "demo-user",
        name: value.name.trim(),
      };
      items.push(item);
    }
    const index = planItems.findIndex(
      (row) => row.planId === planId && row.itemId === item.id,
    );
    if (index >= 0)
      planItems[index] = {
        ...planItems[index],
        quantity: planItems[index].quantity + value.quantity,
        isChecked: false,
      };
    else
      planItems.push({
        id: makeId("row"),
        planId,
        itemId: item.id,
        quantity: value.quantity,
        note: value.note ?? "",
        group: value.group,
        isChecked: false,
        sortOrder:
          Math.max(
            0,
            ...planItems
              .filter((row) => row.planId === planId)
              .map((row) => row.sortOrder),
          ) + 1,
      });
  }
  return { ...data, items, planItems };
}
