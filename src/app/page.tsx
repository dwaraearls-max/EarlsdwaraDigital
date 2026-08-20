import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Promo } from "@/components/sections/Promo";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Promo />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}
