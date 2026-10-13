import Link from "next/link";
import { Icon } from "@/components/icon";
export function GetStarted() {
  return (
    <>
      <section className="landing-steps" id="how-it-works">
        <div
          className="steps-photo"
          role="img"
          aria-label="Bờ biển xanh trong nắng chiều"
        >
          <span>
            <Icon name="wave" size={23} /> Một chiếc vali gọn.
            <br />
            Một khoảng trời rộng.
          </span>
        </div>
        <div className="steps-copy">
          <span className="landing-kicker">
            KHÔNG CẦN CHUẨN BỊ CHO VIỆC CHUẨN BỊ
          </span>
          <h2>
            Ba bước nhỏ.
            <br />
            Một chuyến đi sẵn sàng.
          </h2>
          <ol>
            {[
              [
                "Chọn nơi mình muốn đến",
                "Đặt tên kế hoạch, thêm điểm đến và ngày đi.",
              ],
              [
                "Gom những món cần mang",
                "Tự thêm đồ hoặc bắt đầu từ một checklist mẫu.",
              ],
              [
                "Tick xong, rồi lên đường",
                "Chuẩn bị đến đâu, đánh dấu đến đó.",
              ],
            ].map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="landing-final">
        <Icon name="logo" size={38} />
        <span className="landing-kicker">CHUYẾN ĐI TIẾP THEO ĐANG CHỜ</span>
        <h2>
          Mình đi đâu
          <br />
          <em>cuối tuần này?</em>
        </h2>
        <Link href="/register" className="button">
          Bắt đầu gói ghém <Icon name="arrow-right" size={18} />
        </Link>
        <p>
          Đã có tài khoản? <Link href="/login">Vào không gian của bạn</Link>
        </p>
      </section>
      <footer className="site-footer">
        <Link href="/" className="site-brand">
          <Icon name="logo" size={24} />
          <span>
            gói ghém<span>.</span>
          </span>
        </Link>
        <p>Gói ghém vừa đủ. Tận hưởng thật nhiều.</p>
        <span>Làm cho những người thích đi.</span>
      </footer>
    </>
  );
}
