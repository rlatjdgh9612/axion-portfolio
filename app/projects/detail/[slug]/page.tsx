import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/footer";
import { ArrowIcon } from "@/components/icons";
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

  const darkFrameOverrides: Record<string, string> = {
    jcompany: "/assets/detail/jcompany-detail-full-dark2.png",
    investwith: "/assets/detail/investwith-detail-full-dark2.png",
    "korea-search-fund": "/assets/detail/korea-search-fund-detail-full-dark2.png",
    humblemong: "/assets/detail/humblemong-detail-full-dark2.png",
  };
  const darkFrameSrc = darkFrameOverrides[project.slug] ?? `/assets/detail/${project.slug}-detail-full-dark.png`;

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
            src={darkFrameSrc}
            alt=""
            aria-hidden="true"
            width={2112}
            height={26818}
            sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
            style={{ width: "100%", height: "auto" }}
          />
        </section>
      <ContactSection />
    </>
  );
}
