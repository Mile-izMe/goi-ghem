import { Icon, type IconName } from "@/components/icon";
export function Empty({
  icon,
  title,
  text,
}: {
  icon: IconName;
  title: string;
  text: string;
}) {
  return (
    <div className="empty">
      <Icon name={icon} size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
