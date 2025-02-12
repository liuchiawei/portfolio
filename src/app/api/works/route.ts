import { NextResponse } from "next/server";
import type { WorksProps } from "@/lib/props";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // 取得 query 參數，預設 page = 1, limit = 10
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = works.slice(startIndex, endIndex);
  return NextResponse.json(paginatedData);
}

// TODO: Prisma でデータベースから取得
const works: WorksProps[] = [
  {
    id: 1,
    title: "作品1",
    image: "/images/works/work1.jpg",
    year: 2024,
    type: "web",
    description: "作品1の説明",
  },
  {
    id: 2,
    title: "作品2",
    image: "/images/works/work2.jpg",
    year: 2024,
    type: "illustration",
    description: "作品1の説明",
  },
  {
    id: 3,
    title: "Archilab",
    image: "/images/works/archilab.png",
    year: 2024,
    type: "illustration",
    description: "作品1の説明",
  },
  {
    id: 4,
    title: "作品4",
    image: "/images/works/work4.jpg",
    year: 2024,
    type: "illustration",
    description: "作品1の説明",
  },
  {
    id: 5,
    title: "作品5",
    image: "/images/works/work5.jpg",
    year: 2024,
    type: "graphic design",
    description: "作品1の説明",
  },
  {
    id: 6,
    title: "作品6",
    image: "/images/works/work6.jpg",
    year: 2024,
    type: "graphic design",
    description: "作品1の説明",
  },
  {
    id: 7,
    title: "作品7",
    image: "/images/works/work7.jpg",
    year: 2024,
    type: "graphic design",
    description: "作品1の説明",
  },
  {
    id: 8,
    title: "データベースとは？",
    image: "/images/works/infographic_db.png",
    year: 2024,
    type: "infographic",
    description: "作品1の説明",
  },
  {
    id: 9,
    title: "ファイティン！",
    image: "/images/works/fighters.png",
    year: 2023,
    type: "illustration",
    description: "作品1の説明",
  },
  {
    id: 10,
    title: "作品10",
    image: "/images/works/work10.jpg",
    year: 2024,
    type: "graphic design",
    description: "作品1の説明",
  },
  {
    id: 11,
    title: "作品11",
    image: "/images/works/work11.jpg",
    year: 2024,
    type: "graphic design",
    description: "作品1の説明",
  },
  {
    id: 12,
    title: "櫛稲",
    image: "/images/works/kushunada.png",
    year: 2022,
    type: "illustration",
    description: "株式会社櫛稲公式サイトのイラスト。",
  },
  {
    id: 13,
    title: "ボクサー忍者",
    image: "/images/works/ninja.png",
    year: 2023,
    type: "logo design",
    description: "作品1の説明",
  },
  {
    id: 14,
    title: "作品14",
    image: "/images/works/work14.jpg",
    year: 2024,
    type: "graphic design",
    description: "作品1の説明",
  },
];