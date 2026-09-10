import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "./project-card";
import { getHomeProjects, getProjects } from "@/server/features/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function ProjectsSection({
  variant = "home",
  limit,
}: {
  variant?: "home" | "full";
  limit?: number;
} = {}) {
  const isFull = variant === "full";
  const [dict, locale, projects] = await Promise.all([
    getDictionary(),
    getLocale(),
    isFull ? getProjects(limit ?? 100) : getHomeProjects(limit ?? 6),
  ]);

  return (
    <Section id="projects" className="bg-background">
      {!isFull && (
        <SectionHeading
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          description={dict.projects.description}
          action={
            <Link
              href={localeHref(locale, dict.projects.actionLink || "/projects")}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground shadow-xs transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <span>
                {dict.projects.allProjects ||
                  (locale === "bn" ? "সবগুলো প্রজেক্ট দেখুন" : "View All Projects")}
              </span>
              <Icon
                name="arrowRight"
                size="xs"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          }
        />
      )}

      <Stagger className={isFull ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} locale={locale} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
