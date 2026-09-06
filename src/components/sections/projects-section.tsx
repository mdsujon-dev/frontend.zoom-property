import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "@/components/property/project-card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function ProjectsSection({ showAction = true }: { showAction?: boolean }) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <Section id="projects" className="border-t border-border bg-background">
      <SectionHeading
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.title}
        description={dict.projects.description}
        action={
          showAction ? (
            <Button variant="outline" size="lg" asChild>
              <Link href={localeHref(locale, "/projects")}>
                {dict.projects.action}
                <Icon name="construction" size="xs" />
              </Link>
            </Button>
          ) : undefined
        }
      />

      <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
