"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { JobCard } from "@/components/discovery/JobCard";
import { SwipeActions } from "@/components/discovery/SwipeActions";
import { JobDetailsModal } from "@/components/discovery/JobDetailsModal";
import { MatchScore } from "@/components/discovery/MatchScore";
import { AnimatedTags } from "@/components/discovery/AnimatedTags";
import { JobFilters, FilterState } from "@/components/discovery/JobFilters";
import { DatabaseJob } from "@/lib/resumeApi";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

type WSMessage =
  | { type: "JOB"; job: DatabaseJob }
  | { type: "END" };

const BACKEND_URL = "http://localhost:8000";

export default function DiscoveryPage() {
  const router = useRouter();
  const { getIdToken } = useAuth();

  /* ======================
      Feed + WS state
  ====================== */
  const [jobs, setJobs] = useState<DatabaseJob[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const isFetchingRef = useRef(false);

  /* ======================
      1️⃣ HTTP: INITIAL LOAD
  ====================== */
  useEffect(() => {
    async function loadInitialJobs() {
      const token = await getIdToken();
      if (!token) return;

      try {
        const res = await fetch(`${BACKEND_URL}/save-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setJobs(data.ranked_jobs || []);
      } catch (error) {
        console.error("Failed to load initial jobs:", error);
      }
    }

    loadInitialJobs();
  }, [getIdToken]);

  /* ======================
      2️⃣ WebSocket: NEXT ONLY
  ====================== */
  useEffect(() => {
    if (jobs.length === 0) return;
    let ws: WebSocket;

    async function connectWS() {
      const token = await getIdToken();
      if (!token) return;

      ws = new WebSocket(`${BACKEND_URL.replace("http", "ws")}/ws/jobs?token=${token}`);
      socketRef.current = ws;

      ws.onmessage = (event) => {
        const msg: WSMessage = JSON.parse(event.data);
        if (msg.type === "JOB") {
          setJobs((prev) => [...prev, msg.job]);
          isFetchingRef.current = false;
        }
      };
    };

    connectWS();
    return () => ws?.close();
  }, [getIdToken, jobs.length > 0]); // Changed dependency to track if we have at least one job

  const requestNextJob = () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    socketRef.current?.send(
      JSON.stringify({ type: "NEXT_JOB" })
    );
  };

  const [matches, setMatches] = useState<DatabaseJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<DatabaseJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    remote: [],
    type: [],
    level: [],
    location: "",
  });

  const currentJob = jobs[0];
  useEffect(() => {
    console.log("Current job:", currentJob?.description);
  }, [currentJob]);


  // Updated Score Logic: Handle string scores and convert to percentage
  const matchScore = useMemo(() => {
    if (!currentJob?.score) return 0;
    const s = typeof currentJob.score === 'string'
      ? parseFloat(currentJob.score)
      : currentJob.score;
    return isNaN(s) ? 0 : Math.round(s * 100);
  }, [currentJob]);

  // Updated Tag Logic: Prefer extensions then highlights
  const currentTags = useMemo(() => {
    if (!currentJob) return [];
    if (Array.isArray(currentJob.extensions)) return currentJob.extensions;
    if (Array.isArray(currentJob.job_highlights)) return currentJob.job_highlights;
    return [];
  }, [currentJob]);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (!currentJob) return;

      setExitDirection(direction);

      if (direction === "right") {
        setMatches((prev) =>
          prev.some((j) => j.id === currentJob.id)
            ? prev
            : [...prev, currentJob]
        );
      }

      setTimeout(() => {
        setJobs((prev) => prev.slice(1));
        requestNextJob();
        setExitDirection(null);
      }, 300);
    },
    [currentJob]
  );

  const handleViewDetails = useCallback(() => {
    if (!currentJob) return;
    setSelectedJob(currentJob);
    setIsModalOpen(true);
  }, [currentJob]);

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">No Jobs Yet</h2>
          <p className="text-muted-foreground mb-6">
            Upload your resume to get personalized job recommendations.
          </p>
          <Button onClick={() => router.push("/profile")}>Upload Resume</Button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Sidebar Stats */}
            <div className="lg:col-span-2 space-y-3 order-2 lg:order-1">
              {currentJob && (
                <>
                  <MatchScore score={matchScore} />
                  <AnimatedTags tags={currentTags} />
                </>
              )}
            </div>

            {/* Main Swipe Area */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative min-h-[620px] flex flex-col items-center">
                <div className="relative w-full max-w-md h-[480px]">
                  <AnimatePresence mode="popLayout">
                    {currentJob && (
                      <JobCard
                        key={currentJob.id}
                        job={currentJob}
                        exitDirection={exitDirection}
                        onSwipe={handleSwipe}
                        onViewDetails={handleViewDetails}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <SwipeActions
                  onSwipeLeft={() => handleSwipe("left")}
                  onSwipeRight={() => handleSwipe("right")}
                  onViewDetails={handleViewDetails}
                />

                <p className="text-xs text-muted-foreground mt-2">
                  {jobs.length} jobs in queue
                </p>
              </div>
            </div>

            {/* Sidebar Filters/Matches */}
            <div className="lg:col-span-3 order-3">
              <div className="mt-4 bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Saved Matches</span>
                  <span className="text-2xl font-bold text-emerald-500">
                    {matches.length}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <JobFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </div>
          </div>
        </div>

        <JobDetailsModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApply={() => handleSwipe("right")}
          onPass={() => handleSwipe("left")}
        />
      </div>
    </ProtectedRoute>
  );
}