import { NextResponse } from "next/server";
import type { WorksProps } from "@/lib/props";
import data from "@/data/works.json";

// TODO: Prisma でデータベースから取得
const works: WorksProps[] = data;
// 重複を削除
const uniqueWorks = Array.from(
  new Map(works.map((item) => [item.id, item])).values()
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // 取得 query 參數，預設 page = 1, limit = 10
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  // 從過濾後的資料中取出對應的分頁資料
  const paginatedData = uniqueWorks.slice(startIndex, endIndex);
  return NextResponse.json(paginatedData);
}