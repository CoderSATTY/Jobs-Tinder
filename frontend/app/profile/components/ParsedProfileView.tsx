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
    <section className="mb-8 rounded-3xl border-none bg-transparent p-0 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary rounded-xl">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Your Profile
            </h2>
            <p className="text-muted-foreground text-sm">Manage your details</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
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
                    className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm"
                  >
                    {renderValue(t)}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">—</span>
              )}
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
    <div className={`group flex items-center justify-between gap-3 p-1.5 rounded-lg transition-colors ${isDynamic ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary/50'}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>}
        <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">{label}</span>
      </div>
      <span className={`font-semibold text-foreground text-right max-w-[60%] break-words ${large ? 'text-base' : 'text-sm'}`}>
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
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-primary hover:text-primary/80 hover:border-primary/30 hover:bg-secondary/80 transition-all font-medium text-sm"
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
        {icon && <div className="p-2 bg-secondary rounded-lg border border-border shadow-sm text-primary">{icon}</div>}
        <h3 className="text-xl font-bold text-foreground">
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
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {title}
          </h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
