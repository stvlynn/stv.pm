import { ProjectCard, type ProjectCardData } from './ProjectCard';
import styles from './ProjectGrid.module.css';

type ProjectGridProps = {
  projects: ProjectCardData[];
  variant?: 'default' | 'featured';
  id?: string;
};

export function ProjectGrid({
  projects,
  variant = 'default',
  id,
}: ProjectGridProps) {
  const gridClass =
    variant === 'featured' ? styles.featuredGrid : styles.grid;

  return (
    <div id={id} className={`grid-system ${gridClass}`}>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} variant={variant} />
      ))}
    </div>
  );
}
