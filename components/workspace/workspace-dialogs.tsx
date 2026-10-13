"use client";
import { useWorkspace } from "./workspace-provider";
import { PlanDialog } from "@/components/dialogs/plan-dialog";
import { ItemDialog } from "@/components/dialogs/item-dialog";
import { CatalogDialog } from "@/components/dialogs/catalog-dialog";
import { BulkDialog } from "@/components/dialogs/bulk-dialog";
import { DeletePlanDialog } from "@/components/dialogs/delete-plan-dialog";
export function WorkspaceDialogs() {
  const { modal } = useWorkspace();
  if (!modal) return null;
  switch (modal.kind) {
    case "plan":
      return <PlanDialog modal={modal} />;
    case "item":
      return <ItemDialog modal={modal} />;
    case "catalog":
      return <CatalogDialog modal={modal} />;
    case "bulk":
      return <BulkDialog />;
    case "delete-plan":
      return <DeletePlanDialog modal={modal} />;
  }
}
