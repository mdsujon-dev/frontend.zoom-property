
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "@/components/property/project-card";
import { projects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";

export async function ProjectsSection() {
  const dict = await getDictionary();

  return (
    <Section id="projects" className="border-t border-border bg-background">
      <SectionHeading
        title={dict.projects.title}
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
