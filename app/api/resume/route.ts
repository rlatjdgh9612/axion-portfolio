const DOWNLOAD_FILENAME = "2026_서비스기획_UXUI디자이너_이력서_김성호.pdf";

export async function GET() {
  const resumeBlobUrl = process.env.RESUME_BLOB_URL;

  if (!resumeBlobUrl) {
    return new Response("이력서 다운로드 설정이 필요합니다.", { status: 503 });
  }

  const resume = await fetch(resumeBlobUrl, {
    next: { revalidate: 3600 },
  });

  if (!resume.ok || !resume.body) {
    return new Response("이력서 파일을 불러오지 못했습니다.", { status: 502 });
  }

  const headers = new Headers({
    "Cache-Control": "public, max-age=3600, s-maxage=3600",
    "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(DOWNLOAD_FILENAME)}`,
    "Content-Type": "application/pdf",
  });

  const contentLength = resume.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new Response(resume.body, { headers });
}
