"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePlannerStore } from "@/lib/use-planner-store";
import {
  clonePlan,
  type Plan,
  type PlanItem,
  type ChecklistTemplate,
} from "@/lib/planner-data";
import { Icon } from "@/components/icon";
import { WorkspaceDialogs } from "./workspace-dialogs";

export type Modal =
  | { kind: "plan"; plan?: Plan; template?: ChecklistTemplate }
  | { kind: "item"; row?: PlanItem; group?: string }
  | { kind: "catalog"; id?: string }
  | { kind: "bulk" }
  | { kind: "delete-plan"; plan: Plan }
  | null;
type View = "plans" | "items" | "templates";

function useWorkspaceState(initialDate: string) {
  const store = usePlannerStore();
  const router = useRouter();
  const pathname = usePathname();
  const [modal, setModal] = useState<Modal>(null);
  const [toast, setToast] = useState("");
  const selected = store.data.plans.find(
    (plan) => pathname === `/app/plans/${plan.id}`,
  );
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  function openPlan(id: string) {
    router.push(`/app/plans/${encodeURIComponent(id)}`);
  }
  function navigate(view: View) {
    router.push(`/app/${view}`);
  }
  function duplicate(plan: Plan) {
    const copy = clonePlan(plan, store.data.planItems);
    store.update((previous) => ({
      ...previous,
      plans: [...previous.plans, copy.plan],
      planItems: [...previous.planItems, ...copy.planItems],
    }));
    openPlan(copy.plan.id);
    setToast("Đã nhân bản kế hoạch và bỏ các dấu tick.");
  }
  function toggle(row: PlanItem) {
    store.update((previous) => ({
      ...previous,
      planItems: previous.planItems.map((item) =>
        item.id === row.id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    }));
  }
  function removeRow(row: PlanItem) {
    store.update((previous) => ({
      ...previous,
      planItems: previous.planItems.filter((item) => item.id !== row.id),
    }));
    setToast("Đã bỏ món khỏi chuyến đi. Danh mục vẫn giữ nguyên.");
  }
  return {
    ...store,
    initialDate,
    selected,
    modal,
    setModal,
    toast,
    notify: setToast,
    openPlan,
    navigate,
    duplicate,
    toggle,
    removeRow,
    itemName: (id: string) =>
      store.data.items.find((item) => item.id === id)?.name ?? "Món đồ",
  };
}
const WorkspaceContext = createContext<ReturnType<
  typeof useWorkspaceState
> | null>(null);
export function WorkspaceProvider({
  children,
  initialDate,
}: {
  children: ReactNode;
  initialDate: string;
}) {
  const value = useWorkspaceState(initialDate);
  return (
    <WorkspaceContext.Provider value={value}>
      {children}
      <WorkspaceDialogs />
      {value.toast && (
        <div className="toast" role="status">
          <Icon name="check-circle" size={18} />
          {value.toast}
          <button
            className="icon-button"
            aria-label="Đóng thông báo"
            onClick={() => value.notify("")}
          >
            <Icon name="x" size={15} />
          </button>
        </div>
      )}
    </WorkspaceContext.Provider>
  );
}
export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("useWorkspace requires WorkspaceProvider");
  return value;
}
