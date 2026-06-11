import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { BackgroundChapters } from "@/components/BackgroundChapters";
import { Blobs } from "@/components/Blobs";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { PinnedShowcase } from "@/components/PinnedShowcase";
import { SectionCurve } from "@/components/SectionCurve";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <BackgroundChapters />
      <ReadingProgress />
      <Blobs />
      <Header />
      <main>
        <Hero />
        <Stats />
        <PinnedShowcase />
        <SectionCurve />
        <Testimonials />
        <SectionCurve flip />
        <CtaBanner />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
