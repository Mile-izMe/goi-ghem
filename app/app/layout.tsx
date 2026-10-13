import { Suspense, type ReactNode } from "react";
import { connection } from "next/server";
import { AuthGate } from "@/components/auth/auth-gate";
import { WorkspaceProvider } from "@/components/workspace/workspace-provider";
import { AppShell } from "@/components/workspace/app-shell";
import { LoadingScreen } from "@/components/ui/loading-screen";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WorkspaceLayout>{children}</WorkspaceLayout>
    </Suspense>
  );
}
async function WorkspaceLayout({ children }: { children: ReactNode }) {
  await connection();
  const initialDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return (
    <AuthGate>
      <WorkspaceProvider initialDate={initialDate}>
        <AppShell>{children}</AppShell>
      </WorkspaceProvider>
    </AuthGate>
  );
}
