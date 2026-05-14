export interface Environment {
  name: string;
  color: string;
  depth: string;
  maxDepth?: number;
}

export const ENVIRONMENTS: Environment[] = [
  {
    name: "Classroom (Blender - Ground Truth)",
    color: "/samples/classroom-color-3k.jpg",
    depth: "/samples/classroom-depth-3k.png",
  },
  {
    name: "Studio (DA²)",
    color: "/samples/studio-color-2K.jpg",
    depth: "/samples/studio-da2-2K.png",
  },
  {
    name: "Studio (DA360)",
    color: "/samples/studio-color-2K.jpg",
    depth: "/studio-da360-2k.png",
  },
  {
    name: "Studio (MoGe)",
    color: "/samples/studio-color-2K.jpg",
    depth: "/studio-moge-2k.png",
  },
  {
    name: "Bedroom (DA²)",
    color: "/samples/bedroom-color-3K.png",
    depth: "/samples/bedroom-da2-3K.png",
  },
  {
    name: "Bedroom (DA360)",
    color: "/samples/bedroom-color-3K.png",
    depth: "/bedroom-da360-3K.png",
  },
  {
    name: "Bedroom (MoGe)",
    color: "/samples/bedroom-color-3K.png",
    depth: "/bedroom-moge-3K.png",
  },
  {
    name: "Bathroom 2K",
    color: "/samples/bathroom_2k.png",
    depth: "/samples/bathroom_2k_depth.png",
  },
  // {
  //   name: "Bell Tower 2K",
  //   color: "/samples/bell_tower_2k.png",
  //   depth: "/samples/bell_tower_2k_depth.png",
  // },
  {
    name: "Christmas Photo Studio 04 2K",
    color: "/samples/christmas_photo_studio_04_2k.png",
    depth: "/samples/christmas_photo_studio_04_2k_depth.png",
  },
  {
    name: "Empty Play Room 2K",
    color: "/samples/empty_play_room_2k.png",
    depth: "/samples/empty_play_room_2k_depth.png",
  },
  {
    name: "Lebombo 2K",
    color: "/samples/lebombo_2k.png",
    depth: "/samples/lebombo_2k_depth.png",
  },
  {
    name: "Mirrored Hall 2K",
    color: "/samples/mirrored_hall_2k.png",
    depth: "/samples/mirrored_hall_2k_depth.png",
  },
  {
    name: "Modern Bathroom 2K",
    color: "/samples/modern_bathroom_2k.png",
    depth: "/samples/modern_bathroom_2k_depth.png",
  },
  {
    name: "Reading Room 2K",
    color: "/samples/reading_room_2k.png",
    depth: "/samples/reading_room_2k_depth.png",
  },
  {
    name: "Relax Inn Seaview Suite 2K",
    color: "/samples/relax_inn_seaview_suite_2k.png",
    depth: "/samples/relax_inn_seaview_suite_2k_depth.png",
  },
  // {
  //   name: "Sepulchral Chapel Rotunda 2K",
  //   color: "/samples/sepulchral_chapel_rotunda_2k.png",
  //   depth: "/samples/sepulchral_chapel_rotunda_2k_depth.png",
  // },
  {
    name: "Small Empty Room 1 2K",
    color: "/samples/small_empty_room_1_2k.png",
    depth: "/samples/small_empty_room_1_2k_depth.png",
  },
];
