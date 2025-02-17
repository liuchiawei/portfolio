"use client";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function Contact() {
  const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert(
        "申し訳ありません。只今メールサービスが利用できません。"
      );
      setIsSubmitting(false);
      return;
    }
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      alert("メッセージが送信されました！");
      setFormData({ user_name: "", user_email: "", message: "" });
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
    <div className="max-w-4xl mx-auto p-6">
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
            value={formData.user_name}
            onChange={(e) =>
              setFormData({ ...formData, user_name: e.target.value })
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
            value={formData.user_email}
            onChange={(e) =>
              setFormData({ ...formData, user_email: e.target.value })
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
