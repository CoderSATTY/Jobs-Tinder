import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <footer className="bg-background border-t border-border py-10 " ref={ref}>
      <div className={`container mx-auto px-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-bold text-foreground">SwipeHire</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 SwipeHire. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;