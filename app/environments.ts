export interface Environment {
  name: string;
  color: string;
  depth: string;
  maxDepth?: number;
}

export const ENVIRONMENTS: Environment[] = [
  {
    name: "Classroom (Blender - Ground Truth)",
    color: "/samples/classroom_3k.jpg",
    depth: "/samples/classroom_3k_depth.png",
    maxDepth: 13,
  },
  {
    name: "Studio",
    color: "/samples/studio_2K.jpg",
    depth: "/samples/studio_2K_depth.png",
    maxDepth: 6,
  },
  // {
  //   name: "Studio (DA360)",
  //   color: "/samples/studio_2K.jpg",
  //   depth: "/studio-da360-2k.png",
  // },
  // {
  //   name: "Studio (MoGe)",
  //   color: "/samples/studio_2K.jpg",
  //   depth: "/studio-moge-2k.png",
  // },
  {
    name: "Bedroom",
    color: "/samples/bedroom_3K.png",
    depth: "/samples/bedroom_3K_depth.png",
    maxDepth: 6,
  },
  // {
  //   name: "Bedroom (DA360)",
  //   color: "/samples/bedroom_3K.png",
  //   depth: "/bedroom-da360-3K.png",
  // },
  // {
  //   name: "Bedroom (MoGe)",
  //   color: "/samples/bedroom_3K.png",
  //   depth: "/bedroom-moge-3K.png",
  // },
  {
    name: "Bathroom",
    color: "/samples/bathroom_2k.png",
    depth: "/samples/bathroom_2k_depth.png",
    maxDepth: 2,
  },
  // {
  //   name: "Bell Tower",
  //   color: "/samples/bell_tower_2k.png",
  //   depth: "/samples/bell_tower_2k_depth.png",
  // },
  {
    name: "Christmas Photo Studio 04",
    color: "/samples/christmas_photo_studio_04_2k.png",
    depth: "/samples/christmas_photo_studio_04_2k_depth.png",
    maxDepth: 6,
  },
  {
    name: "Empty Play Room",
    color: "/samples/empty_play_room_2k.png",
    depth: "/samples/empty_play_room_2k_depth.png",
    maxDepth: 20,
  },
  {
    name: "Lebombo",
    color: "/samples/lebombo_2k.png",
    depth: "/samples/lebombo_2k_depth.png",
    maxDepth: 7,
  },
  {
    name: "Mirrored Hall",
    color: "/samples/mirrored_hall_2k.png",
    depth: "/samples/mirrored_hall_2k_depth.png",
    maxDepth: 8,
  },
  {
    name: "Modern Bathroom",
    color: "/samples/modern_bathroom_2k.png",
    depth: "/samples/modern_bathroom_2k_depth.png",
    maxDepth: 3,
  },
  {
    name: "Reading Room",
    color: "/samples/reading_room_2k.png",
    depth: "/samples/reading_room_2k_depth.png",
    maxDepth: 8,
  },
  {
    name: "Relax Inn Seaview Suite",
    color: "/samples/relax_inn_seaview_suite_2k.png",
    depth: "/samples/relax_inn_seaview_suite_2k_depth.png",
    maxDepth: 4,
  },
  // {
  //   name: "Sepulchral Chapel Rotunda",
  //   color: "/samples/sepulchral_chapel_rotunda_2k.png",
  //   depth: "/samples/sepulchral_chapel_rotunda_2k_depth.png",
  // },
  {
    name: "Small Empty Room 1",
    color: "/samples/small_empty_room_1_2k.png",
    depth: "/samples/small_empty_room_1_2k_depth.png",
    maxDepth: 3.5,
  },
];
