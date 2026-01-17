import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Velocity = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" className="py-24 relative overflow-visible" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Abstract Circular Animation */}
          <div className={`relative flex items-center justify-center ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
            <div className="relative w-80 h-80 md:w-[400px] md:h-[400px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-border animate-spin" style={{ animationDuration: '30s' }} />

              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-primary/40 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-primary/60 rounded-full" />
              </div>

              {/* Inner ring */}
              <div className="absolute inset-16 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '15s' }}>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary/80 rounded-full" />
              </div>

              {/* Center */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/30 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className={`${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered Matching.{' '}
              <span className="text-primary">Effortless Applications.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Upload your resume once and let our advanced LLM do the heavy lifting.
              We analyze your skills, experience, and preferences to surface opportunities
              that are genuinely right for you.
            </p>
            <p className="text-muted-foreground mb-8">
              No more endless scrolling through irrelevant listings. SwipeHire learns what
              you want and delivers curated job cards that match your career goals.
              It's job hunting, reimagined.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect-hover transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Velocity;
