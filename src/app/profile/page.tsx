import { Timeline } from "@/components/ui/timeline";
import { TimelineEntry, TimelineHeader } from "@/lib/props";
import NameCard from "@/components/NameCard";
import { RadialCluster, Node } from "@/components/RadialCluster";

export default function About() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <NameCard />
      <RadialCluster data={skillSet} />
      <Timeline data={data} header={header} />
    </div>
  );
}

const header: TimelineHeader = {
  title: " キャリアの歩み",
  content: "これまでのキャリアパスを詳しく説明しています。ぜひご覧ください。",
};

const data: TimelineEntry[] = [
  {
    year: 2011,
    title: "創業",
    content:
      "2011年、インフォグラフィックを主要な創作形式とするデザイン会社「Re:lab」を共同設立しました。コアコンセプトは「理性的なデータを楽しく表現し、感性的な内容を客観的に伝える」ことです。主に情報伝達のコンサルティングやデザイン制作を手掛け、設計、戦略、プロモーションといった包括的なサービスを提供しています。",
    emoji: "💼",
  },

  {
    year: 2012,
    title: "卒業",
    content:
      "台湾大学経営学部を卒業し、卒業後も引き続き起業活動に取り組んでいます。",
    emoji: "🎓",
  },
  {
    year: 2017,
    title: "独立",
    content:
      "フリーランスのイラストレーターおよびグラフィックデザイナーとして活動。デジタルアートの可能性を追求しながら、常に新しい表現方法を模索し続けています。",
    emoji: "🧑‍🎨",
  },
  {
    year: 2022,
    title: "来日",
    content: "2022年、コロナ禍が終わった後、東京に移住。",
    emoji: "🗼",
  },
  {
    year: 2023,
    title: "プロボクシング",
    content: "2023年、プロボクサーとしてデビュー。",
    emoji: "🥊",
  },
  {
    year: 2024,
    title: "WEBデザイン",
    content:
      "新しい創作の可能性を探求し、より多くの技術を学ぶために、HAL東京のWEB学科に入学。",
    emoji: "💻",
  },
];

const skillSet: Node = {
  name: "技能",
  children: [
    {
      name: "デザイン",
      children: [
        {
          name: "グラフィック",
          children: [
            { name: "Adobe Illustrator" },
            { name: "Adobe Photoshop" },
            { name: "Adobe Lightroom" },
          ],
        },
        {
          name: "イラスト",
          children: [{ name: "Procreate" }],
        },
        { name: "UI/UX", children: [{ name: "Figma" }] },
        {
          name: "動画",
          children: [{ name: "Adobe Premiere Pro" }],
        },
      ],
    },
    {
      name: "プログラミング",
      children: [
        {
          name: "フレームワーク",
          children: [
            { name: "jQuery", children: [] },
            { name: "Next.js", children: [] },
            { name: "React", children: [] },
          ],
        },
        {
          name: "言語",
          children: [
            { name: "TypeScript", children: [] },
            { name: "JavaScript", children: [] },
            { name: "PHP", children: [] },
            { name: "Python", children: [] },
          ],
        },
        {
          name: "フロントエンド",
          children: [
            {
              name: "UI",
              children: [
                { name: "Tailwind CSS", children: [] },
                { name: "Shadcn/UI", children: [] },
              ],
            },
            {
              name: "アニメーション",
              children: [
                { name: "Motion/Framer Motion", children: [] },
                { name: "Spring", children: [] },
              ],
            },
            {
              name: "チャート",
              children: [
                { name: "Recharts", children: [] },
                { name: "D3.js", children: [] },
              ],
            },
            {
              name: "3D",
              children: [{ name: "Three.js", children: [] }],
            },
          ],
        },
        {
          name: "バックエンド",
          children: [
            { name: "Node.js", children: [] },
            { name: "PHP", children: [] },
          ],
        },
        {
          name: "データベース",
          children: [{ name: "MySQL", children: [] }],
        },
      ],
    },
  ],
};
