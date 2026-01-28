import { ProjectCard } from "../projects/ProjectCard";
import { MyButton } from "../common/MyButton";
import { FadeIn, StaggerContainer, StaggerItem } from "../effects/FadeIn";
import projectsData from "../../data/project.json";

interface ProjectAction {
  label: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  actions: ProjectAction[];
}

export function ProjectsPage() {
  const projects: Project[] = projectsData.projects;

  return (
    <div className="w-full flex flex-col items-center py-24 px-6 min-h-screen">
      <FadeIn direction="up">
        <p className="text-ink-muted dark:text-dark-ink-muted text-sm uppercase tracking-[0.2em] mb-4 font-mono text-center">
          Portfolio
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink dark:text-dark-ink mb-4 text-center">
          Selected Works
        </h1>
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <div className="vintage-divider mb-8 w-48">
          <span className="flourish">✦</span>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <p className="text-center mb-12 text-ink-faded dark:text-dark-ink-faded max-w-xl font-body">
          A curated collection of programming projects I have crafted over the years.
        </p>
      </FadeIn>

      <StaggerContainer className="w-full flex flex-col items-center gap-8" staggerDelay={0.15}>
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
            >
              {project.actions.map((action) => (
                <MyButton
                  key={action.label}
                  onClick={() => {
                    window.open(action.url, "_blank");
                  }}
                >
                  {action.label}
                </MyButton>
              ))}
            </ProjectCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
