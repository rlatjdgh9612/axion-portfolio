import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/footer";
import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/ui";
import { projects } from "@/data/projects";

const detailFrameDimensions: Record<string, { light: { width: number; height: number }; dark: { width: number; height: number } }> = {
  axion: { light: { width: 2933, height: 32768 }, dark: { width: 2933, height: 32768 } },
  vazoom: { light: { width: 2623, height: 32768 }, dark: { width: 2623, height: 32768 } },
  investhive: { light: { width: 3246, height: 32768 }, dark: { width: 3246, height: 32768 } },
  jcompany: { light: { width: 3315, height: 32768 }, dark: { width: 3315, height: 32768 } },
  investwith: { light: { width: 2711, height: 32768 }, dark: { width: 2711, height: 32768 } },
  "korea-search-fund": { light: { width: 2628, height: 32768 }, dark: { width: 2628, height: 32768 } },
  humblemong: { light: { width: 2061, height: 32768 }, dark: { width: 2059, height: 32768 } },
  prior: { light: { width: 3422, height: 32768 }, dark: { width: 3422, height: 32768 } },
  moneyguard: { light: { width: 3432, height: 32768 }, dark: { width: 3432, height: 32768 } },
};

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
  const frameDimensions = detailFrameDimensions[project.slug];

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


        <section className="detail-figma-frame container" aria-label={`${project.title} 프로젝트 상세 사례 연구`}>
          <Image
            className="detail-figma-image detail-figma-image-light"
            src={`/assets/detail/${project.slug}-detail-full.png`}
            alt={`${project.title} 프로젝트 상세 화면`}
            width={frameDimensions.light.width}
            height={frameDimensions.light.height}
            sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
            style={{ width: "100%", height: "auto" }}
            priority
          />
          <Image
            className="detail-figma-image detail-figma-image-dark"
            src={darkFrameSrc}
            alt=""
            aria-hidden="true"
            width={frameDimensions.dark.width}
            height={frameDimensions.dark.height}
            sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="sr-only">
            <h2>{project.title} 프로젝트 개요</h2>
            <p>{project.summary}</p>
            <dl>
              <dt>프로젝트 기간</dt><dd>{project.period}</dd>
              <dt>담당 업무</dt><dd>{project.role}</dd>
              {project.tools && <><dt>사용 도구</dt><dd>{project.tools}</dd></>}
              {project.team && <><dt>팀 구성</dt><dd>{project.team}</dd></>}
            </dl>
          </div>
        </section>
      <ContactSection />
    </>
  );
}
