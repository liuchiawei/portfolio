import { NextResponse } from "next/server";
import type { WorksProps } from "@/lib/props";
import data from "@/data/works.json";

// TODO: Prisma でデータベースから取得
const works: WorksProps[] = [...data].reverse();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 分頁參數處理
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return NextResponse.json(works.slice(startIndex, endIndex));
}
