import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
// import Work from "@/components/work/Work";
import Contact from "@/components/contact/Contact";
import Project from "@/components/project/Project";
import Services from "@/components/service/Service";
import Testimonial from "@/components/testimonial/Testimonial";


export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Project />
      <Testimonial />
      <Contact />
    </div>
  );
}
