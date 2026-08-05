import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/footer";
import { ArrowIcon } from "@/components/icons";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { Reveal } from "@/components/ui";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: projects.find((item) => item.slug === slug)?.title ?? "프로젝트" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const isAxion = project.slug === "axion";
  const figmaFrameSlugs = ["axion", "vazoom", "investhive", "jcompany", "investwith", "korea-search-fund"];
  const useFigmaFrame = figmaFrameSlugs.includes(project.slug);

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
            <div className="tag-list">
              <span>{project.categoryLabel}</span>
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <p>{project.summary}</p>
          </Reveal>
        </div>
      </section>

      {useFigmaFrame ? null : (
        <>
      <section className="detail-main-image container">
        <Image
          src={`/assets/detail/${project.slug}-hero.png`}
          alt={`${project.title} 프로젝트 대표 화면`}
          width={1056}
          height={640}
          sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
          style={{ width: "100%", height: "100%" }}
          priority
        />
        {isAxion && <span className="detail-image-label">AI 포트폴리오</span>}
      </section>

      <section className="project-meta-section">
        <div className="project-meta container">
          <div><span>프로젝트 기간</span><strong>{project.period}</strong></div>
          <div><span>담당 업무</span><strong>{project.role}</strong></div>
          <div><span>사용 툴</span><strong>{project.tools}</strong></div>
          <div><span>팀</span><strong>{project.team}</strong></div>
        </div>
      </section>
        </>
      )}

      {useFigmaFrame ? (
        <section className="detail-figma-frame container">
          <Image
            className="detail-figma-image detail-figma-image-light"
            src={`/assets/detail/${project.slug}-detail-full.png`}
            alt={`${project.title} 프로젝트 상세 화면`}
            width={2112}
            height={26818}
            sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
            style={{ width: "100%", height: "auto" }}
            priority
          />
          <Image
            className="detail-figma-image detail-figma-image-dark"
            src={`/assets/detail/${project.slug}-detail-full-dark.png`}
            alt=""
            aria-hidden="true"
            width={2112}
            height={26818}
            sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
            style={{ width: "100%", height: "auto" }}
          />
        </section>
      ) : (
        <ProjectCaseStudy slug={project.slug} title={project.title} />
      )}
      <ContactSection />
    </>
  );
}
