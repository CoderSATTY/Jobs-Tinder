"use client";
import React from "react";
import {
  User,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code,
  Link as LinkIcon,
  FileText,
  Sparkles
} from "lucide-react";

type Props = { parsed: any };

/* ======================
   SAFE VALUE RENDERER
====================== */
function renderValue(value: any): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value
      .map((v) =>
        typeof v === "string" || typeof v === "number"
          ? v
          : JSON.stringify(v)
      )
      .join(", ");
  }
  if (typeof value === "object") {
    // 🔒 CRITICAL: prevents React crash
    if ("description" in value) return String(value.description);
    return JSON.stringify(value);
  }
  return "—";
}

export default function ParsedProfileView({ parsed }: Props) {
  if (!parsed) return null;

  const info = parsed.info_dict ?? {};
  const job = parsed.job_dict ?? {};
  const dynamicKeys = parsed.dynamic_keys ?? { info_dict: [], job_dict: [] };

  const experiences = Array.isArray(job.experiences) ? job.experiences : [];
  const projects = Array.isArray(job.projects) ? job.projects : [];
  const techStack = Array.isArray(job.tech_stack) ? job.tech_stack : [];
  const positions = Array.isArray(job.positions_of_responsibility)
    ? job.positions_of_responsibility
    : [];
  const courses = Array.isArray(job.key_courses_taken)
    ? job.key_courses_taken
    : [];

  return (
    <section className="mb-8 rounded-3xl border-none bg-white p-0 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-blue-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Your Profile
            </h2>
            <p className="text-gray-500 text-sm">Manage your details</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
          <Sparkles className="w-3 h-3" />
          Ready to Match
        </span>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card title="Basic Information" icon={<User className="w-4 h-4" />}>
            <div className="space-y-3">
              <InfoRow icon={<User className="w-3 h-3" />} label="Name" value={info.full_name} large />
              <InfoRow icon={<Mail className="w-3 h-3" />} label="Email" value={info.email} />
              <InfoRow icon={<Phone className="w-3 h-3" />} label="Phone" value={info.phone} />
              <InfoRow icon={<MapPin className="w-3 h-3" />} label="Location" value={info.location} />
              {/* Dynamic Info Keys */}
              {Array.isArray(dynamicKeys.info_dict) && dynamicKeys.info_dict.map((key: string) => (
                <InfoRow key={key} label={formatKey(key)} value={info[key]} isDynamic />
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card title="Education & Scores" icon={<GraduationCap className="w-4 h-4" />}>
            <div className="space-y-3">
              <InfoRow label="College" value={job.college} large />
              <InfoRow label="Branch" value={job.branch} />
              <InfoRow label="Grad Year" value={job.year_of_graduation} />
              <InfoRow label="CGPA" value={job.cgpa} />
              {/* Dynamic Job Keys */}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <Card title="Tech Stack" icon={<Code className="w-4 h-4" />}>
            <div className="flex flex-wrap gap-2">
              {techStack.length > 0 ? (
                techStack.map((t: any, i: number) => (
                  <span
                    key={i}
                    className="rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm"
                  >
                    {renderValue(t)}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">—</span>
              )}
            </div>
          </Card>

          {/* Links */}
          <Card title="Links" icon={<LinkIcon className="w-4 h-4" />}>
            <div className="flex flex-col gap-3">
              <LinkRow label="GitHub" href={job.github || info.github || info.GitHub || job.GitHub} />
              <LinkRow label="LinkedIn" href={job.linkedin || info.linkedin || info.LinkedIn || job.LinkedIn} />
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}

/* ======================
   UI HELPERS
====================== */

function formatKey(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function InfoRow({
  label,
  value,
  icon,
  large = false,
  isDynamic = false
}: {
  label: string;
  value: any;
  icon?: React.ReactNode;
  large?: boolean;
  isDynamic?: boolean;
}) {
  if (!value) return null; // Hide empty fields

  return (
    <div className={`group flex items-center justify-between gap-3 p-1.5 rounded-lg transition-colors ${isDynamic ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-blue-50/30'}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400 group-hover:text-blue-500 transition-colors">{icon}</span>}
        <span className="text-gray-500 font-medium text-xs uppercase tracking-wide">{label}</span>
      </div>
      <span className={`font-semibold text-gray-900 text-right max-w-[60%] break-words ${large ? 'text-base' : 'text-sm'}`}>
        {renderValue(value)}
      </span>
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href?: any }) {
  const safeHref =
    typeof href === "string" && href.startsWith("http") ? href : null;

  if (!safeHref) return null;

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-blue-100 text-blue-600 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50/50 transition-all font-medium text-sm"
    >
      <LinkIcon className="w-3 h-3" />
      {label}
    </a>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="p-2 bg-white rounded-lg border border-blue-100 shadow-sm text-blue-600">{icon}</div>}
        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-50">
          {icon && <div className="text-blue-500">{icon}</div>}
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">
            {title}
          </h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
