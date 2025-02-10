import { Timeline } from "@/components/ui/timeline";
import { TimelineEntry } from "@/lib/props";
import NameCard from "@/components/NameCard";
export default function About() {
  return (
    <div>
      <NameCard />
      <Timeline data={data} />
    </div>
  );
}

const data: TimelineEntry[] = [
  {
    title: "2011",
    content:
      "私は2011年に、デジタルアートとイラストレーションの分野でキャリアをスタートさせました。当初は独学で技術を磨き、徐々にクライアントワークを受注するようになりました。デジタルツールとトラディショナルな手法を組み合わせた独自のスタイルを確立し、様々なプロジェクトに携わってきました。特に、キャラクターデザインやコンセプトアート、編集イラストなどの分野で実績を重ねています。また、個人制作では日本の伝統文化やポップカルチャーからインスピレーションを得た作品を制作し、国内外の展示会やアートフェアに参加してきました。デジタルアートの可能性を追求しながら、常に新しい表現方法を模索し続けています。技術の進歩とともに変化するクリエイティブの世界で、革新的なアプローチと確かな技術力を武器に、クライアントの要望に応えながら自身の作風も大切にしています。これまでの経験を活かしながら、より多くの人々に感動を届けられるようなアート作品を生み出していきたいと考えています。",
  },

  {
    title: "2012",
    content:
      "卒業Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "2017",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "2018",
    content:
      "独立Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "2022",
    content:
      "來日Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "2024",
    content:
      "WEBデザインに転向。Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];
