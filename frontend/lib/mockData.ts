export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: "full-time" | "part-time" | "internship" | "contract";
  level: "entry" | "mid" | "senior" | "lead";
  remote: "remote" | "hybrid" | "onsite";
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  coordinates: { lat: number; lng: number };
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechFlow Inc",
    logo: "https://ui-avatars.com/api/?name=TF&background=0d9488&color=fff&size=128",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "full-time",
    level: "mid",
    remote: "hybrid",
    description: "Join our dynamic team to build cutting-edge web applications using React and TypeScript. You'll work on products used by millions of users worldwide.",
    requirements: [
      "3+ years of React experience",
      "Strong TypeScript skills",
      "Experience with modern CSS frameworks",
      "Familiarity with testing frameworks"
    ],
    skills: ["React", "TypeScript", "Tailwind", "Next.js", "Jest"],
    postedDate: "2 days ago",
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataStream",
    logo: "https://ui-avatars.com/api/?name=DS&background=059669&color=fff&size=128",
    location: "Austin, TX",
    salary: "$140k - $180k",
    type: "full-time",
    level: "senior",
    remote: "remote",
    description: "Design and implement scalable microservices architecture. Lead technical decisions and mentor junior developers.",
    requirements: [
      "5+ years backend development",
      "Experience with distributed systems",
      "Strong knowledge of databases",
      "Cloud platform experience (AWS/GCP)"
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "AWS", "Docker"],
    postedDate: "1 week ago",
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: "3",
    title: "Full Stack Developer Intern",
    company: "StartupHub",
    logo: "https://ui-avatars.com/api/?name=SH&background=14b8a6&color=fff&size=128",
    location: "New York, NY",
    salary: "$30/hr",
    type: "internship",
    level: "entry",
    remote: "onsite",
    description: "Learn and grow with our fast-paced startup! Work on real projects that impact thousands of users.",
    requirements: [
      "Currently pursuing CS degree",
      "Basic knowledge of web technologies",
      "Eager to learn and grow",
      "Good communication skills"
    ],
    skills: ["JavaScript", "React", "Node.js", "Git"],
    postedDate: "3 days ago",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudNine",
    logo: "https://ui-avatars.com/api/?name=C9&background=0891b2&color=fff&size=128",
    location: "Seattle, WA",
    salary: "$150k - $190k",
    type: "full-time",
    level: "senior",
    remote: "hybrid",
    description: "Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability at scale.",
    requirements: [
      "5+ years DevOps experience",
      "Strong Kubernetes knowledge",
      "Experience with Terraform",
      "Security best practices"
    ],
    skills: ["Kubernetes", "Terraform", "AWS", "Docker", "Jenkins", "Prometheus"],
    postedDate: "5 days ago",
    coordinates: { lat: 47.6062, lng: -122.3321 }
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "DesignCraft",
    logo: "https://ui-avatars.com/api/?name=DC&background=10b981&color=fff&size=128",
    location: "Los Angeles, CA",
    salary: "$100k - $130k",
    type: "full-time",
    level: "mid",
    remote: "remote",
    description: "Create beautiful, intuitive interfaces that users love. Work closely with product and engineering teams.",
    requirements: [
      "3+ years design experience",
      "Proficiency in Figma",
      "Understanding of design systems",
      "Portfolio required"
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research"],
    postedDate: "1 day ago",
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: "6",
    title: "Machine Learning Engineer",
    company: "AI Labs",
    logo: "https://ui-avatars.com/api/?name=AI&background=06b6d4&color=fff&size=128",
    location: "Boston, MA",
    salary: "$160k - $220k",
    type: "full-time",
    level: "lead",
    remote: "hybrid",
    description: "Lead ML initiatives and deploy production-grade models. Work on cutting-edge AI research.",
    requirements: [
      "PhD or 5+ years ML experience",
      "Published research preferred",
      "Strong Python skills",
      "Experience with deep learning frameworks"
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Computer Vision"],
    postedDate: "4 days ago",
    coordinates: { lat: 42.3601, lng: -71.0589 }
  }
];

// Placeholder function for match score calculation
export function calculateMatchScore(job: Job, userSkills: string[] = []): number {
  // This is a placeholder - replace with actual matching algorithm
  // For now, returns a random score between 60-99
  const baseScore = 60;
  const randomBonus = Math.floor(Math.random() * 40);
  
  // Simple skill matching bonus
  const matchingSkills = job.skills.filter(skill => 
    userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );
  const skillBonus = Math.min(matchingSkills.length * 5, 20);
  
  return Math.min(baseScore + randomBonus + skillBonus, 99);
}

export interface ParsedProfile {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    rollNo: string;
    location: string;
  };
  education: {
    college: string;
    branch: string;
    year: string;
    cgpa: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    duration: string;
    description: string;
  }>;
  techStack: string[];
  achievements: string[];
  links: {
    github: string;
    linkedin: string;
  };
}

export const mockParsedProfile: ParsedProfile = {
  basicInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    rollNo: "CS2024001",
    location: "San Francisco, CA"
  },
  education: {
    college: "Stanford University",
    branch: "Computer Science",
    year: "2024",
    cgpa: "3.85"
  },
  experience: [
    {
      company: "Google",
      position: "Software Engineering Intern",
      duration: "May 2023 - Aug 2023",
      description: "Developed and optimized core search features using distributed systems."
    },
    {
      company: "Meta",
      position: "Frontend Developer Intern",
      duration: "May 2022 - Aug 2022",
      description: "Built interactive UI components for Instagram's web platform."
    }
  ],
  projects: [
    {
      name: "AI Resume Parser",
      duration: "Jan 2024 - Present",
      description: "Built an ML-powered resume parsing system using NLP techniques."
    },
    {
      name: "SwipeHire Platform",
      duration: "Sep 2023 - Dec 2023",
      description: "Developed a Tinder-style job matching platform with React and Node.js."
    }
  ],
  techStack: ["React", "TypeScript", "Python", "Node.js", "PostgreSQL", "AWS", "Docker", "TensorFlow"],
  achievements: [
    "Dean's List - All Semesters",
    "1st Place - Stanford Hackathon 2023",
    "Google STEP Scholarship Recipient"
  ],
  links: {
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson"
  }
};
