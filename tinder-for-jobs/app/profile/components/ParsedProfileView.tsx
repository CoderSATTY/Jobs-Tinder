"use client";
import React from "react";

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
    <section className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Parsed Profile
        </h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          Auto-extracted
        </span>
      </div>

      {/* Basic Info + Education */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic Info */}
        <Card title="Basic Information">
          <InfoRow label="Name" value={info.full_name} />
          <InfoRow label="Email" value={info.email} />
          <InfoRow label="Phone" value={info.phone} />
          <InfoRow label="Location" value={info.location} />
          <InfoRow label="Roll No" value={info.roll_no} />
        </Card>

        {/* Education */}
        <Card title="Education & Scores">
          <InfoRow label="College" value={job.college} />
          <InfoRow label="Branch" value={job.branch} />
          <InfoRow label="Graduation Year" value={job.year_of_graduation} />
          <InfoRow label="CGPA" value={job.cgpa} />
        </Card>
      </div>

      {/* Links */}
      <Section title="Links">
        <LinkRow label="GitHub" href={job.github} />
        <LinkRow label="LinkedIn" href={job.linkedin} />
      </Section>

      {/* Tech Stack */}
      <Section title="Tech Stack">
        <div className="flex flex-wrap gap-2">
          {techStack.length > 0 ? (
            techStack.map((t: any, i: number) => (
              <span
                key={i}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {renderValue(t)}
              </span>
            ))
          ) : (
            <span className="text-slate-400 text-sm">—</span>
          )}
        </div>
      </Section>

      {/* Experiences */}
      <Section title="Experiences">
        {experiences.length > 0 ? (
          experiences.map((e: any, i: number) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-900">
                  {renderValue(e.position)}
                  {e.company && (
                    <span className="text-slate-500">
                      {" "}@ {renderValue(e.company)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {renderValue(e.duration)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {renderValue(e.description)}
              </p>
            </Card>
          ))
        ) : (
          <span className="text-slate-400 text-sm">—</span>
        )}
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {projects.length > 0 ? (
          projects.map((p: any, i: number) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-900">
                  {renderValue(p.name)}
                </div>
                <span className="text-xs text-slate-500">
                  {renderValue(p.duration)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {renderValue(p.description)}
              </p>
            </Card>
          ))
        ) : (
          <span className="text-slate-400 text-sm">—</span>
        )}
      </Section>

      {/* Positions */}
      <Section title="Positions of Responsibility">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {positions.length > 0 ? (
            positions.map((q: any, i: number) => (
              <li key={i}>{renderValue(q)}</li>
            ))
          ) : (
            <li className="text-slate-400">—</li>
          )}
        </ul>
      </Section>

      {/* Courses */}
      <Section title="Key Courses">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {courses.length > 0 ? (
            courses.map((q: any, i: number) => (
              <li key={i}>{renderValue(q)}</li>
            ))
          ) : (
            <li className="text-slate-400">—</li>
          )}
        </ul>
      </Section>

      {/* Raw JSON */}
      <Section title="Raw JSON">
        <pre className="max-h-64 overflow-auto text-xs text-slate-100 bg-slate-900 rounded-lg p-4">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      </Section>
    </section>
  );
}

/* ======================
   SMALL UI HELPERS
====================== */

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900 text-right max-w-[60%] break-words">
        {renderValue(value)}
      </span>
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href?: any }) {
  const safeHref =
    typeof href === "string" && href.startsWith("http") ? href : null;

  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      {safeHref ? (
        <a
          href={safeHref}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-indigo-600 hover:underline break-all"
        >
          {safeHref}
        </a>
      ) : (
        <span className="text-slate-400">—</span>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      {title && (
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h3>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
