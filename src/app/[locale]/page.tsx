"use client"
import Hero from "./sections/hero";
import Header from "./sections/header";
import Footer from "./sections/footer";
import Close from "./sections/close";
import { Block, Axis } from "./sections/components/common/Block";
import { AppPanels } from "./sections/apps";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("home");

  return (
    <div>
      <Axis />
      <Header />
      <main id="main-content">
        <Hero />
        <Block id="apps" title={t("appsTitle")} intro={t("appsIntro")}>
          <AppPanels />
        </Block>
        <Close />
      </main>
      <Footer />
    </div>
  );
}
