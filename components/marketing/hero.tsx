"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { ChecklistPreview } from "./checklist-preview";
export function Hero() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-copy">
        <div className="landing-kicker">
          <span /> CHO NHỮNG NGÀY MUỐN ĐI ĐÂU ĐÓ
        </div>
        <h1>
          Gói ghém
          <br />
          vừa đủ.
          <br />
          <em>Đi chơi thật vui.</em>
        </h1>
        <p>
          Chuyến đi thì nhiều điều để mong.
          <br />
          Đừng để quên đồ là một trong số đó.
        </p>
        <p className="hero-description">
          Lên kế hoạch, gom những món cần mang và tick từng thứ đã chuẩn bị. Tất
          cả ở một nơi nhỏ xinh.
        </p>
        <div className="hero-cta">
          <Link href="/register" className="button primary">
            Gói ghém chuyến đầu tiên <Icon name="arrow-right" size={18} />
          </Link>
          <a
            href="#features"
            className="hero-secondary"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("features");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            Khám phá một chút <Icon name="chevron-down" size={16} />
          </a>
        </div>
        <div className="hero-footnote">
          <Icon name="check-circle" size={16} /> Từ một buổi dã ngoại đến cả
          tuần rong chơi.
        </div>
      </div>
      <div className="landing-hero-visual">
        <div
          className="landing-forest"
          role="img"
          aria-label="Nắng xuyên qua rừng thông xanh"
        >
          <div className="photo-topline">
            <span>ĐI ĐÂU CŨNG ĐƯỢC</span>
            <Icon name="sun" size={25} />
          </div>
          <div className="photo-bottomline">
            <Icon name="pin" size={16} /> Miễn là mình đã sẵn sàng.
          </div>
        </div>
        <div className="landing-stamp">
          <Icon name="mountain" size={25} />
          <span>
            ít lo một chút
            <br />
            <strong>VUI THÊM NHIỀU</strong>
          </span>
        </div>
        <ChecklistPreview />
      </div>
    </section>
  );
}
