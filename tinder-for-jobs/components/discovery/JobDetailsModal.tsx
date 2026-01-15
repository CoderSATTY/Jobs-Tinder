import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  ExternalLink,
  Building2,
  Check,
  X,
  Briefcase,
  Globe
} from "lucide-react";
import { DatabaseJob } from "@/lib/resumeApi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplyOption {
  title: string;
  link: string;
}

interface JobDetailsModalProps {
  job: DatabaseJob | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onPass: () => void;
}

export function JobDetailsModal({
  job,
  isOpen,
  onClose,
  onApply,
  onPass
}: JobDetailsModalProps) {
  const [showApplyOptions, setShowApplyOptions] = useState(false);

  if (!job) return null;

  /* ----------------- helpers ----------------- */

  const cleanDescription = (html: string) =>
    html.replace(/<[^>]*>/g, "").replace(/\n/g, "\n\n").trim();

  /* ----------------- NORMALIZATION ----------------- */

  const score =
    job.score && !isNaN(Number(job.score))
      ? Math.round(Number(job.score) * 100)
      : 0;

  const companyLabel = job.company_name ?? "";
  const descriptionContent =
    typeof job.description === "string" ? job.description : "";

  const tags: string[] = Array.isArray(job.extensions)
    ? job.extensions.filter((v) => typeof v === "string")
    : [];

  const highlights: string[] = Array.isArray(job.job_highlights)
    ? job.job_highlights.filter((v) => typeof v === "string")
    : [];

  const applyOptions: ApplyOption[] = Array.isArray(job.apply_options)
    ? job.apply_options.filter(
      (o: any) =>
        o &&
        typeof o === "object" &&
        typeof o.title === "string" &&
        typeof o.link === "string"
    )
    : [];

  /* ----------------- score color ----------------- */

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-500 border-emerald-500 bg-emerald-500/10";
    if (s >= 60) return "text-blue-500 border-blue-500 bg-blue-500/10";
    return "text-amber-500 border-amber-500 bg-amber-500/10";
  };

  /* ----------------- UI ----------------- */

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-[95vh] sm:h-[90vh] bg-background rounded-t-[20px] sm:rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="absolute top-4 right-4 z-50">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* LEFT */}
            <div className="w-full md:w-[400px] bg-slate-50 dark:bg-slate-900/50 border-r flex flex-col">
              <div className="p-8 flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mb-5">
                  <Building2 className="w-10 h-10 text-slate-400" />
                </div>

                <h2 className="text-2xl font-bold mb-2">{job.title}</h2>

                <div className="flex items-center gap-2 text-primary font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  {companyLabel}
                </div>

                <div
                  className={`flex flex-col items-center p-4 rounded-xl border border-dashed mb-6 w-full ${getScoreColor(
                    score
                  )}`}
                >
                  <span className="text-4xl font-extrabold">{score}%</span>
                  <span className="text-xs uppercase opacity-80">
                    Match Score
                  </span>
                </div>

                <div className="grid gap-3 w-full mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>

                <div className="mt-auto w-full space-y-3">
                  {!showApplyOptions && (
                    <Button
                      className="w-full"
                      onClick={() => setShowApplyOptions(true)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  )}

                  {showApplyOptions && (
                    <div className="w-full p-3 rounded-lg border bg-white dark:bg-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">
                          Apply Options
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowApplyOptions(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2">
                        {applyOptions.length === 0 && (
                          <div className="text-sm text-muted-foreground">
                            No apply options available.
                          </div>
                        )}

                        {applyOptions.map((opt, i) => (
                          <a
                            key={i}
                            href={opt.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="truncate">{opt.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={onPass}>
                      <X className="w-4 h-4 mr-2" /> Pass
                    </Button>
                    <Button variant="outline" onClick={onApply}>
                      <Check className="w-4 h-4 mr-2" /> Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 flex flex-col">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Description
                </h3>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-8">
                  {tags.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase mb-3">
                        Skills & Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                          <Badge key={i}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {highlights.length > 0 && (
                    <>
                      <Separator />
                      <ul className="list-disc pl-5">
                        {highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Separator />

                  <div className="whitespace-pre-line text-sm">
                    {cleanDescription(descriptionContent)}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
