"use client";

import { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { WorksGrid, WorksGridItem } from "@/components/ui/WorksGrid";
import { WorksProps } from "@/lib/props";
import { Icon } from "@iconify/react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Works() {
  // 管理目前載入的作品資料、頁數與是否還有更多資料
  const [items, setItems] = useState<WorksProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10; // 每次載入 10 筆資料

  // 初次載入時呼叫 fetchWorks 取得第一批資料
  useEffect(() => {
    setItems([]); // 清空現有資料
    setPage(1); // 重設頁碼
    setHasMore(true); // 重設更多資料的標示
    fetchWorks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 使用 axios 向 API 取得資料
  const fetchWorks = async () => {
    try {
      const response = await axios.get("/api/works", {
        params: { page, limit },
      });
      const newItems: WorksProps[] = response.data;
      // 將新資料加到現有的資料中
      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filteredNewItems = newItems.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...filteredNewItems];
      });
      // 如果新取得的資料筆數小於 limit，表示已無更多資料
      if (newItems.length < limit) {
        setHasMore(false);
      }
      // 更新頁碼，準備下次請求
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("データの読み込み中にエラーが発生しました：", error);
    }
  };

  // 利用 useMemo 去除重複的項目（根據 id）
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

  return (
    <InfiniteScroll
      dataLength={uniqueItems.length} // 目前資料的筆數
      next={fetchWorks} // 捲到底部時呼叫此函式
      hasMore={hasMore} // 是否還有更多資料
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
      <WorksGrid className="w-full p-4 mx-auto">
        {uniqueItems.map((item, index) => (
          <WorksGridItem
            key={item.id}
            work={item}
            index={index}
            className={
              // indexの1の位が0または7の場合、2x2のサイズを占める
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
        <Icon icon="line-md:loading-alt-loop" width="36" height="36" />
      </Skeleton>
      <div className="flex flex-col gap-2 h-1/3">
        <Skeleton className="w-1/2 h-4 rounded-full" />
        <Skeleton className="w-1/3 h-4 rounded-full" />
      </div>
    </div>
  );
};
