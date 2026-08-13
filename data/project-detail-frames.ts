type FrameSize = {
  width: number;
  height: number;
};

type ProjectDetailFrame = {
  light: FrameSize;
  dark: FrameSize;
};

const FRAME_HEIGHT = 32768;
const SECTION_HEIGHT = 4096;
const SECTION_COUNT = FRAME_HEIGHT / SECTION_HEIGHT;

export const projectDetailFrames: Record<string, ProjectDetailFrame> = {
  axion: {
    light: { width: 2933, height: FRAME_HEIGHT },
    dark: { width: 2933, height: FRAME_HEIGHT },
  },
  vazoom: {
    light: { width: 2623, height: FRAME_HEIGHT },
    dark: { width: 2623, height: FRAME_HEIGHT },
  },
  investhive: {
    light: { width: 3246, height: FRAME_HEIGHT },
    dark: { width: 3246, height: FRAME_HEIGHT },
  },
  jcompany: {
    light: { width: 3315, height: FRAME_HEIGHT },
    dark: { width: 3315, height: FRAME_HEIGHT },
  },
  investwith: {
    light: { width: 2711, height: FRAME_HEIGHT },
    dark: { width: 2711, height: FRAME_HEIGHT },
  },
  "korea-search-fund": {
    light: { width: 2628, height: FRAME_HEIGHT },
    dark: { width: 2628, height: FRAME_HEIGHT },
  },
  humblemong: {
    light: { width: 2061, height: FRAME_HEIGHT },
    dark: { width: 2059, height: FRAME_HEIGHT },
  },
  prior: {
    light: { width: 3422, height: FRAME_HEIGHT },
    dark: { width: 3422, height: FRAME_HEIGHT },
  },
  moneyguard: {
    light: { width: 3432, height: FRAME_HEIGHT },
    dark: { width: 3432, height: FRAME_HEIGHT },
  },
};

export function getProjectDetailFrame(slug: string, theme: "light" | "dark") {
  const frame = projectDetailFrames[slug];
  const size = frame[theme];

  return {
    ...size,
    sections: Array.from({ length: SECTION_COUNT }, (_, index) => ({
      src: `/assets/detail/optimized/${slug}/${theme}/section-${String(index + 1).padStart(2, "0")}.webp`,
      width: size.width,
      height: SECTION_HEIGHT,
    })),
  };
}
