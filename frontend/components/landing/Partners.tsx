import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Partners = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const partners = ['QUANTUM', 'VERTEX', 'PRISM', 'MATRIX', 'CIPHER'];

  return (
    <section className="py-16 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Trusted by Industry Leaders
          </span>
          <h3 className="text-2xl font-semibold text-foreground mt-2">Our Partners</h3>
        </div>
        
        <div className={`flex flex-wrap justify-center items-center gap-12 md:gap-20 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
          {partners.map((partner, index) => (
            <div
              key={partner}
              className="text-2xl md:text-3xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
