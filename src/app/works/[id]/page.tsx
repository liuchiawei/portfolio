import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import works from "@/data/works.json";
import { WorksProps } from "@/lib/props";

type WorkPageProps = {
  params: {
    id: string;
  };
};

export default function WorkPage({ params }: WorkPageProps) {
  const work = works.find((item) => item.id === Number(params.id));
  // 404 頁面
  if (!work) return notFound();

  return (
    <div>
      <WorkImage work={work} />
      <WorkInfo work={work} />
    </div>
  );
}

const WorkImage = ({ work }: { work: WorksProps }) => {
  return (
    <div className="relative w-full h-120">
      <Image src={work.image} alt={work.title} fill className="object-cover" />
    </div>
  );
};

const WorkInfo = ({ work }: { work: WorksProps }) => {
  return (
    <div>
      <h1>{work.title}</h1>
      <p>{work.description}</p>
      <p>{work.year}</p>
      <p>{work.type}</p>
    </div>
  );
};

