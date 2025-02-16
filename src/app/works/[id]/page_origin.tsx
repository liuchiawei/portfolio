import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getWorkById(id: string) {
  try {
    const response = await axios.get(`/api/works/${id}`);
    if (response.status === 404) return null;
    return response.data;
  } catch (error) {
    console.error("作品取得失敗:", error);
    return null;
  }
}

export default async function WorkPage({ params }: { params: { id: string } }) {
  const work = await getWorkById(params.id);
  // 404 頁面
  if (!work) return notFound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-8"
    >
      {/* 作品タイトル */}
      <div className="mb-12 text-center space-y-4">
        <motion.h1
          className="text-4xl md:text-6xl font-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {work.title}
        </motion.h1>
        <div className="flex justify-center items-center gap-4 text-neutral-500">
          <span>{work.year}</span>
          <span>|</span>
          <span>{work.type}</span>
        </div>
      </div>

      {/* 作品画像 */}
      <motion.div
        className="relative w-full h-[70vh] rounded-3xl overflow-hidden border-2 border-foreground mb-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </motion.div>

      {/* 作品說明 */}
      <motion.div
        className="max-w-3xl mx-auto prose prose-lg dark:prose-invert"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">作品說明</h2>
        <p className="leading-relaxed">{work.description}</p>
      </motion.div>
    </motion.div>
  );
}
