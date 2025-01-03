"use client";

import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  // Normalize the testimonials data
  const normalizedTestimonials = testimonials.map((testimonial) => ({
    ...testimonial,
    quote: Array.isArray(testimonial.quote) ? testimonial.quote : [testimonial.quote],
  }));

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Driven? Unveil my
        <span className="text-purple"> Progress</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={normalizedTestimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
