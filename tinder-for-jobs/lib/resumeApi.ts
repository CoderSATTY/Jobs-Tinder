import { Job, mockJobs } from "./mockData";

export interface DatabaseJob extends Job {
    score: number;
    tags: string[];
}

export type InfoDict = Record<string, any>;
export type JobDict = Record<string, any>;

export async function parseResume(file: File): Promise<{
    info_dict: InfoDict;
    job_dict: JobDict;
    dynamic_keys: { info_dict: string[]; job_dict: string[] };
}> {
    // Mock response
    console.log("Mock parsing resume:", file.name);
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        info_dict: {
            full_name: "John Doe",
            email: "john@example.com",
            phone: "555-0123",
            location: "New York, NY",
            experience: "5 years",
            skills: "React, Node.js"
        },
        job_dict: {
            preferred_role: "Frontend Developer",
            skills: ["React", "TypeScript"],
            location: "Remote"
        },
        dynamic_keys: {
            info_dict: ["experience", "skills"],
            job_dict: []
        }
    };
}

export async function saveProfile(jobDict: JobDict): Promise<{ ranked_jobs: DatabaseJob[] }> {
    console.log("Mock saving profile:", jobDict);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return mock jobs with scores
    const rankedJobs: DatabaseJob[] = mockJobs.map(job => ({
        ...job,
        score: 0.85 + Math.random() * 0.14,
        tags: job.skills // Utilize skills as tags
    }));

    return { ranked_jobs: rankedJobs };
}
