import { motion } from "framer-motion";

interface MatchScoreProps {
  score: number;
}

export function MatchScore({ score }: MatchScoreProps) {
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-card rounded-xl p-3 border border-border">
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              className="fill-none stroke-muted"
              strokeWidth="4"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              className="fill-none stroke-primary"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-sm font-bold text-primary"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {score}%
            </motion.span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-muted-foreground">Match Score</h3>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">Based on profile</p>
        </div>
      </div>
    </div>
  );
}
