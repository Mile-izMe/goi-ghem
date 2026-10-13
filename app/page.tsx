import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { GetStarted } from "@/components/marketing/get-started";
import "./marketing.css";
export default function Home() {
  return (
    <div className="marketing-page">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <GetStarted />
      </main>
    </div>
  );
}
