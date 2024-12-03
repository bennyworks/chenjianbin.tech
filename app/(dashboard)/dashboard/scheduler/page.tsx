import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { FamilyCalendar } from "@/components/family-calendar";

export default async function SchedulerPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader className="" heading="家庭日程表" text="管理您的日程" />
      <FamilyCalendar />
    </DashboardShell>
  );
}
