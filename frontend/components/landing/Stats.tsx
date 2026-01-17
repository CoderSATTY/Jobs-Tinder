import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Stats = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const stats = [
    { value: '10M+', label: 'Data Points Processed' },
    { value: '99.99%', label: 'Uptime Guarantee' },
    { value: '500+', label: 'Enterprise Clients' },
    { value: '10x', label: 'Faster Insights' },
    { value: '24/7', label: 'Expert Support' }
  ];

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center relative ${index < stats.length - 1 ? 'md:border-r md:border-border' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
