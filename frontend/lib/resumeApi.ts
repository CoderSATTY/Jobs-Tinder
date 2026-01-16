export interface UploadResumeResponse {
  success: boolean;
  uid: string;
  name: string;
  email: string;
}

export interface DatabaseJob {
  id: string;
  title: string;           // legacy field
  company_name?: string;       // Firestore field
  location?: string;
  apply_options?: any[];
  description?: string;        // Firestore field
  score?: string;
  detected_extensions?: boolean[];   // Firestore field (array or string)
  extensions?: string[];            // Firestore field (object or array)
  job_highlights?: string[];   // Firestore field
}

export type InfoDict = Record<string, any>;
export type JobDict = Record<string, any>;

const BACKEND_URL = "http://localhost:8000";

export async function uploadResume(
  file: File,
  token: string
): Promise<UploadResumeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BACKEND_URL}/parse-resume`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.detail || "Failed to upload resume");
  }
  return data;
}

export async function saveProfile(
  token: string
): Promise<{ ranked_jobs: DatabaseJob[] }> {
  const res = await fetch(`${BACKEND_URL}/save-profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.detail || "Failed to save profile");
  }
  return { ranked_jobs: data.ranked_jobs || [] };
}

export async function fetchUserProfile(
  token: string
): Promise<any> {
  const res = await fetch(`${BACKEND_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.detail || "Failed to fetch user profile");
  }
  return data.data || {};
}