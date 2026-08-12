type FrameSize = {
  width: number;
  height: number;
};

type ProjectDetailFrame = {
  light: FrameSize;
  dark: FrameSize;
  darkImage?: string;
};

const FRAME_HEIGHT = 32768;

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
    darkImage: "/assets/detail/jcompany-detail-full-dark2.png",
  },
  investwith: {
    light: { width: 2711, height: FRAME_HEIGHT },
    dark: { width: 2711, height: FRAME_HEIGHT },
    darkImage: "/assets/detail/investwith-detail-full-dark2.png",
  },
  "korea-search-fund": {
    light: { width: 2628, height: FRAME_HEIGHT },
    dark: { width: 2628, height: FRAME_HEIGHT },
    darkImage: "/assets/detail/korea-search-fund-detail-full-dark2.png",
  },
  humblemong: {
    light: { width: 2061, height: FRAME_HEIGHT },
    dark: { width: 2059, height: FRAME_HEIGHT },
    darkImage: "/assets/detail/humblemong-detail-full-dark2.png",
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

export function getProjectDetailFrame(slug: string) {
  const frame = projectDetailFrames[slug];

  return {
    ...frame,
    lightImage: `/assets/detail/${slug}-detail-full.png`,
    darkImage: frame.darkImage ?? `/assets/detail/${slug}-detail-full-dark.png`,
  };
}
