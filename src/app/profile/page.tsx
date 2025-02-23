import { Timeline } from "@/components/ui/timeline";
import { TimelineHeader } from "@/lib/props";
import { RadialCluster } from "@/components/RadialCluster";
import NameCard from "@/components/NameCard";
import skillSet from "@/data/skillset.json";
import timeline from "@/data/timeline.json";
export default function About() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <NameCard />
      <h2 className="hidden md:block text-4xl mt-12 text-center leading-[1.5]">
        私の <strong>スキルセット</strong> <br />と{" "}
        <strong>デザインツール</strong>
      </h2>
      <RadialCluster data={skillSet} className="w-full" />
      <Timeline data={timeline} header={header} />
    </div>
  );
}

const header: TimelineHeader = {
  title: " キャリアの歩み",
  content: "これまでのキャリアパスを詳しく説明しています。ぜひご覧ください。",
};
