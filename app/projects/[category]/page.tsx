import { notFound } from "next/navigation";
import { ContactSection } from "@/components/footer";
import { ProjectsView } from "@/components/projects-view";
import { categories, categoryTitle } from "@/data/projects";

export function generateStaticParams() { return categories.map(({ slug }) => ({ category: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return { title: categoryTitle[category] ?? "프로젝트" };
}

export default async function ProjectsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.some((item) => item.slug === category)) notFound();
  return <><ProjectsView category={category}/><ContactSection/></>;
}
