import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // 從請求中取得資料
    const { from_name, reply_to, message } = await request.json();

    // 建立 nodemailer 傳輸器
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT) || 587, // SMTP port (通常 587 或 465)
      secure: false, // 若使用 465 則設定為 true
      auth: {
        user: process.env.SMTP_USER, // SMTP 帳號
        pass: process.env.SMTP_PASS, // SMTP 密碼
      },
    });

    // 發送郵件
    await transporter.sendMail({
      from: `"${from_name}" <${reply_to}>`, // 寄件者名稱與信箱
      to: process.env.RECEIVER_EMAIL, // 收件者信箱，可設為你的信箱
      subject: "新聯絡表單訊息",
      text: message,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("發送郵件失敗：", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
