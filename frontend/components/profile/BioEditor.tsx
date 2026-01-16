import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Save } from "lucide-react";

export function BioEditor() {
  const [bio, setBio] = useState(() => {
    return localStorage.getItem("swipehire-bio") || "";
  });
  const [isSaved, setIsSaved] = useState(true);
  const maxLength = 500;

  useEffect(() => {
    setIsSaved(bio === localStorage.getItem("swipehire-bio"));
  }, [bio]);

  const handleSave = () => {
    localStorage.setItem("swipehire-bio", bio);
    setIsSaved(true);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Bio</h2>
        {isSaved && bio && (
          <span className="flex items-center gap-1 text-sm text-success">
            <Check className="w-4 h-4" />
            Saved
          </span>
        )}
      </div>

      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell employers about yourself, your goals, and what makes you unique..."
        className="min-h-[120px] bg-background resize-none mb-3"
        maxLength={maxLength}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {bio.length}/{maxLength} characters
        </span>
        <Button
          onClick={handleSave}
          disabled={isSaved}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
