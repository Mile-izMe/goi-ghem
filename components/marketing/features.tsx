import { Icon, type IconName } from "@/components/icon";

const features: {
  number: string;
  icon: IconName;
  title: string;
  text: string;
}[] = [
  {
    number: "01",
    icon: "pin",
    title: "Mỗi chuyến đi, một góc riêng.",
    text: "Điểm đến, ngày đi, ngày về và chi phí đã chi. Những thông tin cần nhớ luôn ở ngay trước mắt.",
  },
  {
    number: "02",
    icon: "check-circle",
    title: "Tick một món. Nhẹ một nỗi lo.",
    text: "Chia nhóm đồ, ghi số lượng và thêm vài lời nhắc. Nhìn tiến độ là biết còn gì cần chuẩn bị.",
  },
  {
    number: "03",
    icon: "template",
    title: "Chuyến sau, bắt đầu nhanh hơn.",
    text: "Dùng checklist mẫu, chọn lại đồ quen hoặc nhân bản một kế hoạch cũ. Đỡ phải nghĩ lại từ đầu.",
  },
];
export function Features() {
  return (
    <section className="landing-features" id="features">
      <div className="landing-section-intro">
        <span className="landing-kicker">
          MỘT CHÚT NGĂN NẮP, NHIỀU CHÚT AN TÂM
        </span>
        <h2>
          Nhớ trải nghiệm.
          <br />
          <span>Đồ đạc, để checklist nhớ cùng.</span>
        </h2>
      </div>
      <div className="feature-columns">
        {features.map((feature) => (
          <article key={feature.number}>
            <div className="feature-top">
              <Icon name={feature.icon} size={28} />
              <span>{feature.number}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
