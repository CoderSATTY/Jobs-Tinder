"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import ResumeUploader from "./components/ResumeUploader";
import ParsedProfileView from "./components/ParsedProfileView";
import { UploadResumeResponse, fetchUserProfile } from "@/lib/resumeApi";
import { useState } from "react";
import { Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

function ProfilePageContent() {
  const { user, getIdToken } = useAuth();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [uploadedUser, setUploadedUser] = useState<UploadResumeResponse | null>(null);

  // Fetch user profile from server
  const { data: userProfile, isLoading, refetch } = useQuery({
    queryKey: ["user-profile", user?.uid],
    queryFn: async () => {
      const token = await getIdToken();
      if (!token) throw new Error("Not authenticated");
      return fetchUserProfile(token);
    },
    enabled: !!user,
  });

  const handleUploadComplete = (response: UploadResumeResponse) => {
    setUploadSuccess(true);
    setUploadedUser(response);
    setShowUploader(false);
    refetch(); // Refresh profile data
    console.log("Resume uploaded successfully:", response);
  };

  const handleUploadNew = () => {
    setUploadSuccess(false);
    setUploadedUser(null); // Reset uploaded user
    setShowUploader(true);
  };

  // Removed "All Set!" screen as requested. 
  // The UI will fall through to the main profile view below, 
  // which shows "Welcome back, [Name]" at the top.

  // Show profile data if user already has one and not explicitly asking to upload
  if (userProfile && (userProfile.job_dict || userProfile.info_dict) && !showUploader) {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          <div className="text-center space-y-2 mb-6 shrink-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, <span className="text-primary">{userProfile.info_dict?.full_name || user?.displayName || "User"}</span>
            </h1>
          </div>

          <div className="w-full">
            <ParsedProfileView parsed={userProfile} />

            <div className="flex justify-center py-8">
              <button
                onClick={handleUploadNew}
                className="px-6 py-3 bg-secondary border border-border text-foreground font-medium rounded-xl hover:bg-secondary/80 hover:shadow-md transition-all text-sm"
              >
                Upload New Resume
              </button>
            </div>
            <div className="h-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {userProfile?.info_dict ? "Update Your Resume" : "Upload Your Resume"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {userProfile?.info_dict ? "Upload a new version to refresh your profile." : "Upload your resume to get started."}
          </p>
        </div>

        <ResumeUploader onUploadComplete={handleUploadComplete} />

        {/* Cancel button if we are in 'update' mode (implied by showUploader=true and existing profile) */}
        {userProfile?.info_dict && showUploader && (
          <div className="text-center">
            <button onClick={() => setShowUploader(false)} className="text-sm text-muted-foreground hover:underline">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}