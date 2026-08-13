import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/footer";
import { ArrowIcon } from "@/components/icons";
import { ProjectDetailFrame } from "@/components/project-detail-frame";
import { ProjectTags } from "@/components/project-tags";
import { Reveal } from "@/components/ui";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  return { title: getProjectBySlug(slug)?.title ?? "프로젝트" };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="detail-hero-shell">
        <div className="detail-hero container">
          <Link className="back-link" href="/projects/all">
            <ArrowIcon direction="left" /> Back
          </Link>
          <Reveal>
            <h2>{project.subtitle}</h2>
            <h1>{project.title}</h1>
            <ProjectTags categoryLabel={project.categoryLabel} tags={project.tags} />
            <p>{project.summary}</p>
          </Reveal>
        </div>
      </section>
      <ProjectDetailFrame project={project} />
      <ContactSection />
    </>
  );
}
