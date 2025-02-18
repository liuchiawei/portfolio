"use client";

import { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { WorksGrid, WorksGridItem } from "@/components/ui/WorksGrid";
import { WorksProps } from "@/lib/props";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function Works() {
  // 作品データ、ページ数、追加データの有無を管理
  const [items, setItems] = useState<WorksProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const limit = 10; // 1回のロードで10件のデータを取得

  // 初回ロード時にfetchWorksを呼び出して最初のデータを取得
  useEffect(() => {
    setItems([]); // 既存のデータをクリア
    setPage(1); // ページ番号をリセット
    setHasMore(true); // 追加データの有無をリセット
    fetchWorks();
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // axiosを使用してAPIからデータを取得
  const fetchWorks = async () => {
    try {
      const response = await axios.get("/api/works", {
        params: { page, limit },
      });
      const newItems: WorksProps[] = response.data;
      // 新しいデータを既存のデータに追加
      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filteredNewItems = newItems.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...filteredNewItems];
      });
      // 取得したデータ数がlimitより少ない場合、追加データなしと判断
      if (newItems.length < limit) {
        setHasMore(false);
      }
      // 次回のリクエストのためにページ番号を更新
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("データの読み込み中にエラーが発生しました：", error);
    }
  };

  // useMemoを使用して重複項目を除外（idに基づく）
  const uniqueItems = useMemo(() => {
    const seenIds = new Set<number>();
    return items.filter((item) => {
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);
      return true;
    });
  }, [items]);

  // 初回ロード時にLoadingSkeletonを表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin animate-infinite" />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={uniqueItems.length} // 現在のデータ数
      next={fetchWorks} // スクロール時に呼び出される関数
      hasMore={hasMore} // 追加データの有無
      loader={<LoadingSkeleton />}
      endMessage={<p className="text-center my-8">すべて読み込み完了!</p>}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 mt-6 text-center"
      >
        作品一覧
      </motion.h1>
      <WorksGrid className="w-full p-4 mx-auto min-h-screen">
        {uniqueItems.map((item, index) => (
          <WorksGridItem
            key={item.id}
            work={item}
            index={index}
            className={
              // インデックスの1の位が0または7の場合、2x2のサイズを占める
              (index % 10) % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""
            }
          />
        ))}
      </WorksGrid>
    </InfiniteScroll>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mb-4 gap-4 max-w-7xl mx-auto">
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
    </div>
  );
};

const LoadingSkeletonItem = () => {
  return (
    <div className="p-8 gap-4 flex flex-col justify-between rounded-3xl bg-neutral-50 dark:bg-neutral-800">
      <Skeleton className="w-full h-full min-h-48 rounded-2xl flex items-center justify-center">
        <Loader className="animate-spin animate-infinite" />
      </Skeleton>
      <div className="flex flex-col gap-2 h-1/3">
        <Skeleton className="w-1/2 h-4 rounded-full" />
        <Skeleton className="w-1/3 h-4 rounded-full" />
      </div>
    </div>
  );
};
