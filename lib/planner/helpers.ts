import type { Plan } from "@/lib/planner-data";
import type { IconName } from "@/components/icon";
export function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function normalized(value: string) {
  return value.trim().toLocaleLowerCase("vi");
}
export function tripState(plan: Plan, date: string) {
  return plan.endDate < date
    ? "Đã đi"
    : plan.startDate > date
      ? "Sắp đi"
      : "Đang đi";
}
export const groupIcons: Record<string, IconName> = {
  "Trang phục": "shirt",
  "Dạo phố": "shirt",
  "Quần áo": "shirt",
  "Chèo SUP": "wave",
  Tennis: "tennis",
  "Đồ cá nhân": "bag",
  "Giấy tờ & thiết bị": "list",
  "Giấy tờ": "list",
  "Điện tử": "plane",
  "Đồ ngủ & dự phòng": "moon",
};
export const coverLabels: Record<string, string> = {
  dalat: "Một chút bình yên giữa rừng thông",
  danang: "Hẹn nhau nơi biển xanh",
  hanoi: "Chậm lại giữa lòng phố cũ",
  custom: "Một hành trình mới đang chờ",
};
