// @/app/page.tsx (or wherever Home.tsx is located)
"use client";

import Approach from "@/components/Approach";
import { AppWrapper } from "@/components/AppWrapper";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import dynamic from "next/dynamic";

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
});

const Home = () => {
  return (
    <AppWrapper>
      <main className="relative bg-black-100 flex justify-center items-center flex-col w-full min-h-screen overflow-hidden">
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 pb-0">
          <FloatingNav navItems={navItems} />
          <section id="hero" className="min-h-[70vh] flex items-center justify-center">
            <Hero />
          </section>
          <section id="grid" className="min-h-[40vh] flex items-center justify-center">
            <Grid />
          </section>
          <section id="expertise" className="min-h-[50vh] flex items-center justify-center">
            <Expertise />
          </section>
          <section id="projects">
            <RecentProjects />
          </section>
          <section id="clients">
            <Clients />
          </section>
          <section id="experience" className="min-h-[40vh] flex items-center justify-center">
            <Experience />
          </section>
          <section id="approach" className="min-h-[40vh] flex items-center justify-center">
            <Approach />
          </section>
          <section id="footer">
            <Footer />
          </section>
        </div>
      </main>
    </AppWrapper>
  );
};

export default Home;