import { ProjectCard } from "../projects/ProjectCard";
import { MyButton } from "../common/MyButton";
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
    <div className="w-full h-full flex flex-col items-center justify-center py-[100px] text-tx-primary dark:text-dark-tx-primary min-h-screen">
      <h2 className="text-3xl font-bold mb-10 dark:text-dark-tx-primary text-tx-primary">
        Projects
      </h2>
      <span className="text-center mb-10 dark:text-dark-tx-secondary text-tx-secondary">
        A list of programming projects I have worked on.
      </span>
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          description={project.description}
          image={project.image}
          tags={project.tags}
        >
          {project.actions.map((action) => (
            <MyButton
              key={action.label}
              onClick={() => {
                console.log(action.url);
                window.open(action.url, "_blank");
              }}
            >
              {action.label}
            </MyButton>
          ))}
        </ProjectCard>
      ))}
    </div>
  );
}
