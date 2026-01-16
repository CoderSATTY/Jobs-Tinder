import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface JobSearchLoaderProps {
  progress: number;
}

export function JobSearchLoader({ progress }: JobSearchLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6 border border-border">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2">Finding your perfect matches...</h3>
            <p className="text-muted-foreground">Analyzing your skills and experience against our database.</p>
        </div>
        <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
