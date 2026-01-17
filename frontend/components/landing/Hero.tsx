import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from "next/link";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* BACKGROUND */}
      <motion.div
        style={{ y, scale, filter: blur }}
        className="absolute top-0 left-0 h-full w-full will-change-transform"
      >
        <img
          src="https://static.wixstatic.com/media/c837a6_2119733e838e4a2f8813ebde736f99d5~mv2.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/60 to-background/30" />
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Swipe Right on Your{' '}
              <span className="text-primary">Dream Job</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8">
              The content-first job discovery platform.
              Stop searching and start swiping.
            </p>

            <Link href="/login">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground text-lg px-8 py-6 group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;