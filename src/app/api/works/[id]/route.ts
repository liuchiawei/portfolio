import { NextResponse } from "next/server";
import type { WorksProps } from "@/lib/props";
import data from "@/data/works.json";

// 共用資料處理邏輯
const works: WorksProps[] = data;

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const work = works.find((item) => item.id === Number(params.id));

    if (!work) {
      return NextResponse.json(
        { error: "作品が見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(work);
  } catch (error) {
    console.error("作品取得エラー:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
