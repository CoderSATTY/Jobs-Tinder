import { X, Check, Undo2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SwipeActionsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onViewDetails: () => void;
}

export function SwipeActions({ 
  onSwipeLeft, 
  onSwipeRight, 
  onViewDetails
}: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
          onClick={onSwipeLeft}
        >
          <X className="w-6 h-6" />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-primary/30 text-primary"
          onClick={onViewDetails}
        >
          <Info className="w-4 h-4" />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-2 border-success text-success hover:bg-success hover:text-success-foreground transition-colors"
          onClick={onSwipeRight}
        >
          <Check className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
}
