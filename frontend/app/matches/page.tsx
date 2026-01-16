"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Briefcase, X, ExternalLink, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { JobDetailsModal } from "@/components/discovery/JobDetailsModal";
import { DatabaseJob } from "@/lib/resumeApi";

interface MatchedJob {
  id: string;
  title: string;
  company_name: string;
  location: string;
  description: string;
  extensions?: string[];
  job_highlights?: string[];
  apply_options?: any;
  matched_at?: any;
  score?: number;
}

const BACKEND_URL = "http://localhost:8000";

export default function MatchesPage() {
  const { getIdToken } = useAuth();
  const [matches, setMatches] = useState<MatchedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<DatabaseJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch matches from Firebase via backend
  useEffect(() => {
    async function fetchMatches() {
      try {
        const token = await getIdToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${BACKEND_URL}/matches`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMatches(data.matches || []);
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [getIdToken]);

  const handleRemoveMatch = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    // Remove from local state immediately
    setMatches((prev) => prev.filter((job) => job.id !== jobId));

    // TODO: Add API endpoint to delete match from Firebase if needed
  };

  const handleClearAll = () => {
    setMatches([]);
    // TODO: Add API endpoint to clear all matches from Firebase if needed
  };

  const handleJobClick = (job: MatchedJob) => {
    setSelectedJob(job as DatabaseJob);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-indigo-400 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-white/70 font-medium">Loading your matches...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Your Matches</h1>
              <p className="text-white/60 mt-1">
                Jobs you're interested in applying to
              </p>
            </div>
            {matches.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="text-red-400 border-red-400/50 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {matches.map((job, index) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleJobClick(job)}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-colors group cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{job.title}</h3>
                        <p className="text-sm text-white/60">{job.company_name}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-red-400 hover:bg-red-500/20"
                        onClick={(e) => handleRemoveMatch(job.id, e)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(job.extensions || job.job_highlights || []).slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location || "Location not specified"}</span>
                    </div>

                    {/* Description Preview */}
                    <p className="text-sm text-white/40 line-clamp-2 mb-4">
                      {(job.description || "").replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>

                    {/* View Details Button */}
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Briefcase className="w-12 h-12 text-slate-500" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">No matches yet</h2>
              <p className="text-white/50 mb-6">
                Start swiping right on jobs you're interested in!
              </p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/discovery">Discover Jobs</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Job Details Modal */}
        <JobDetailsModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onApply={handleModalClose}
          onPass={handleModalClose}
        />
      </div>
    </ProtectedRoute>
  );
}
