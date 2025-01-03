"use client";

import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <section id="hero">
          <Hero />
        </section>
        <section id="grid">
          <Grid />
        </section>
        <section id="projects">
          <RecentProjects />
        </section>
        <section id="clients">
          <Clients />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="approach">
          <Approach />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Home;
