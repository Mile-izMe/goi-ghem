import type { NextRequest } from "next/server";
import { completeAuth } from "@/features/auth/server/complete-auth";

export function GET(request: NextRequest) {
  return completeAuth(request, "code");
}
