export interface Environment {
  name: string;
  urlPrefix: string;
  maxDepth?: number;
}

export const ASSET_BASE_URL =
  "https://cdn.jsdelivr.net/gh/felix-ops/website-assets@main/projects/spacely-demo/";

export const getAssetUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${ASSET_BASE_URL}${cleanPath}`;
};

export const ENVIRONMENTS: Environment[] = [
  {
    name: "Classroom (Blender - Rendered)",
    urlPrefix: "/cubemaps/classroom_3k/",
    maxDepth: 13,
  },
  {
    name: "Spacely Bedroom Demo",
    urlPrefix: "/cubemaps/bedroom_3K/",
    maxDepth: 6,
  },
  {
    name: "Studio",
    urlPrefix: "/cubemaps/studio_2K/",
    maxDepth: 6,
  },

  {
    name: "Bathroom",
    urlPrefix: "/cubemaps/bathroom_2k/",
    maxDepth: 2,
  },
  {
    name: "Christmas Photo Studio 04",
    urlPrefix: "/cubemaps/christmas_photo_studio_04_2k/",
    maxDepth: 6,
  },
  {
    name: "Empty Play Room",
    urlPrefix: "/cubemaps/empty_play_room_2k/",
    maxDepth: 20,
  },
  {
    name: "Lebombo",
    urlPrefix: "/cubemaps/lebombo_2k/",
    maxDepth: 7,
  },
  {
    name: "Mirrored Hall",
    urlPrefix: "/cubemaps/mirrored_hall_2k/",
    maxDepth: 8,
  },
  {
    name: "Modern Bathroom",
    urlPrefix: "/cubemaps/modern_bathroom_2k/",
    maxDepth: 3,
  },
  {
    name: "Reading Room",
    urlPrefix: "/cubemaps/reading_room_2k/",
    maxDepth: 8,
  },
  {
    name: "Relax Inn Seaview Suite",
    urlPrefix: "/cubemaps/relax_inn_seaview_suite_2k/",
    maxDepth: 4,
  },
  {
    name: "Small Empty Room 1",
    urlPrefix: "/cubemaps/small_empty_room_1_2k/",
    maxDepth: 3.5,
  },
];
