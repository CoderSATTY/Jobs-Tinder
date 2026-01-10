"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResumeUploader } from "@/components/profile/ResumeUploader";
import { BioEditor } from "@/components/profile/BioEditor";
import { ParsedProfileView } from "@/components/profile/ParsedProfileView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, User, Save, Loader2, Briefcase } from "lucide-react";
import { InfoDict, JobDict, saveProfile, DatabaseJob } from "@/lib/resumeApi";
// import { JobSearchLoader } from "@/components/ui/JobSearchLoader";

export default function ProfilePage() {
  const router = useRouter();
  const [parsedInfo, setParsedInfo] = useState<InfoDict | null>(null);
  const [parsedJobDict, setParsedJobDict] = useState<JobDict | null>(null);
  const [dynamicKeys, setDynamicKeys] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [searchProgress, setSearchProgress] = useState(0);

  // Load persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
        const savedInfo = localStorage.getItem("user-info");
        if (savedInfo) {
            setParsedInfo(JSON.parse(savedInfo));
        }
    }
  }, []);

  const handleProcessProfile = async (jobDict: JobDict) => {
    setIsSaving(true);
    setSaveError(null);
    setSearchProgress(0);

    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 90) return prev;
        return prev + (Math.random() * 5);
      });
    }, 200);

    try {
      const result = await saveProfile(jobDict);

      clearInterval(progressInterval);
      setSearchProgress(100);

      // Store ranked jobs
      localStorage.setItem("ranked-jobs", JSON.stringify(result.ranked_jobs));
      localStorage.setItem("job-dict", JSON.stringify(jobDict)); // Persist job dict too

      setTimeout(() => {
        router.push("/discovery");
      }, 1000);
    } catch (err) {
      clearInterval(progressInterval);
      setIsSaving(false);
      setSaveError(err instanceof Error ? err.message : "Failed to save profile");
    }
  };

  const handleUploadComplete = (
    infoDict: InfoDict,
    jobDict: JobDict,
    newDynamicKeys: { info_dict: string[]; job_dict: string[] }
  ) => {
    // Persist Info
    setParsedInfo(infoDict);
    localStorage.setItem("user-info", JSON.stringify(infoDict));

    setParsedJobDict(jobDict);
    setDynamicKeys(newDynamicKeys.info_dict);
    setSaveError(null);

    // Auto-process for the "Compulsory Upload -> Animation -> Jobs" flow
    handleProcessProfile(jobDict);
  };

  const handleSaveProfile = () => {
    if (parsedJobDict) handleProcessProfile(parsedJobDict);
  };


  // View 1: Mandatory Resume Upload (Full Screen)
  if (!parsedInfo) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Let's build your profile
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your resume to get started. We'll analyze your skills and match you with the perfect jobs.
            </p>
          </div>

          <ResumeUploader onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    );
  }

  // View 2: Parsed Profile & Save (Full Screen / Content)
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background p-4 md:p-8">
      {/* {isSaving && <JobSearchLoader progress={searchProgress} />} */}

      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <p className="text-muted-foreground mt-1">
              Review your details before we find your matches
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => { setParsedInfo(null); setParsedJobDict(null); }}
            className="text-muted-foreground"
          >
            re-upload resume
          </Button>
        </div>

        <div className="grid gap-6">
          <ParsedProfileView infoDict={parsedInfo} dynamicKeys={dynamicKeys} />

          {/* Bio Editor could be added back here if needed, or kept optional */}

          <div className="bg-card rounded-2xl border border-border p-8 text-center space-y-6 shadow-xl shadow-blue-500/5">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Ready to explore?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We've analyzed your profile. Click below to start our AI matching engine and find your dream job.
              </p>
            </div>

            {saveError && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm max-w-md mx-auto">
                {saveError}
              </div>
            )}

            <Button
              size="lg"
              className="w-full max-w-md h-14 text-lg font-semibold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-500"
              onClick={handleSaveProfile}
              disabled={isSaving || !parsedJobDict}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Profile & Find Jobs
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
