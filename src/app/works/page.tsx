"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { WorksGrid, WorksGridItem } from "@/components/ui/WorksGrid";
import { WorksProps } from "@/lib/props";

export default function Works() {
  // 管理目前載入的作品資料、頁數與是否還有更多資料
  const [items, setItems] = useState<WorksProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10; // 每次載入 10 筆資料

  // 初次載入時呼叫 fetchWorks 取得第一批資料
  useEffect(() => {
    fetchWorks();
  }, []);

  // 使用 axios 向 API 取得資料
  const fetchWorks = async () => {
    try {
      const response = await axios.get("/api/works", {
        params: { page, limit },
      });
      const newItems: WorksProps[] = response.data;
      // 將新資料加到現有的資料中
      setItems((prev) => [...prev, ...newItems]);

      // 如果新取得的資料筆數小於 limit，表示已無更多資料
      if (newItems.length < limit) {
        setHasMore(false);
      }
      // 更新頁碼，準備下次請求
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("載入資料時發生錯誤：", error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length} // 目前資料的筆數
      next={fetchWorks} // 捲到底部時呼叫此函式
      hasMore={hasMore} // 是否還有更多資料
      loader={<h4>載入中...</h4>}
      endMessage={<p className="text-center my-4">すべて読み込み完了!</p>}
    >
      <WorksGrid className="w-full p-4 mx-auto">
        {items.map((item, i) => (
          <WorksGridItem
            key={item.id}
            work={item}
            className={i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
          />
        ))}
      </WorksGrid>
    </InfiniteScroll>
  );
}
