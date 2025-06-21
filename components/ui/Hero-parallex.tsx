// @/components/ui/HeroParallax.tsx
"use client";
import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const ref = React.useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Parallax transforms (only for non-mobile)
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  // Split products into rows for desktop
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <div
      ref={ref}
      className="relative h-[200vh] overflow-hidden bg-black-100 py-20 md:py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      {isMobile ? (
        // Mobile: Single column with fade-in
        <div className="flex flex-col items-center">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-8"
            >
              <ProductCard product={product} translate={0} />
            </motion.div>
          ))}
        </div>
      ) : (
        // Desktop: Original parallax rows
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <motion.div className="mb-12 flex flex-row-reverse space-x-reverse space-x-6 md:mb-20 md:space-x-12">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="mb-12 flex flex-row space-x-6 md:mb-20 md:space-x-12">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-12">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12 md:py-20">
      <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
        My <span className="text-purple">Expertise</span>
      </h1>
      <p className="mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
        Discover the projects and skills that define my craft, built with
        cutting-edge technologies and a passion for innovation.
      </p>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  translate: MotionValue<number> | number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-64 w-[20rem] sm:h-80 sm:w-[24rem] md:h-96 md:w-[28rem] max-w-[90vw] mx-auto"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl rounded-lg"
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          loading="lazy" // Parallax images load later
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 24rem, (max-width: 1024px) 28rem, 28rem"
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-center"
          alt={product.title}
          onError={() => console.error(`Failed to load image: ${product.thumbnail}`)}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full rounded-lg bg-black/50 opacity-0 transition-opacity group-hover/product:opacity-80 pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 text-lg font-medium text-white opacity-0 transition-opacity group-hover/product:opacity-100 md:text-xl">
        {product.title}
      </h2>
    </motion.div>
  );
};