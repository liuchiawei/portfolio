"use client";
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function Contact() {
  
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init(process.env.PUBLIC_KEY || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.SERVICE_ID || "",
        process.env.TEMPLATE_ID || "",
        formData,
        process.env.PUBLIC_KEY || ""
      );
      alert("メッセージが送信されました！");
      setFormData({ from_name: "", reply_to: "", message: "" });
    } catch (error) {
      console.error("メッセージの送信に失敗しました：", error);
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.2 },
    }),
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        お問い合わせ
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <label className="block text-sm font-medium mb-2">お名前</label>
          <input
            title="お名前"
            placeholder="お名前"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background"
            value={formData.from_name}
            onChange={(e) =>
              setFormData({ ...formData, from_name: e.target.value })
            }
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <label className="block text-sm font-medium mb-2">
            メールアドレス
          </label>
          <input
            title="メールアドレス"
            placeholder="メールアドレス"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background"
            value={formData.reply_to}
            onChange={(e) =>
              setFormData({ ...formData, reply_to: e.target.value })
            }
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <label className="block text-sm font-medium mb-2">メッセージ</label>
          <textarea
            title="メッセージ"
            placeholder="メッセージ"
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
            className="w-full md:w-auto px-12 py-6 text-lg font-semibold rounded-full transition-transform hover:scale-105 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Icon
                  icon="line-md:loading-twotone-loop"
                  width="24"
                  height="24"
                />
                送信中...
              </>
            ) : (
              "送信する"
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}