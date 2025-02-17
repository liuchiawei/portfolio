import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import works from "@/data/works.json";
import { WorksProps } from "@/lib/props";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WorkPageProps = {
  params: {
    id: string;
  };
};

// ISR
export const revalidate = 60;
export const dynamicParams = true;
export function generateStaticParams() {
  return works.map((work) => ({
    id: String(work.id),
  }));
}

export default function WorkPage({ params }: WorkPageProps) {
  const work = works.find((item) => item.id === Number(params.id));
  // 404 頁面
  if (!work) return notFound();

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <WorkImage work={work} />
        <WorkInfo work={work} />
      </div>
      <BackButton />
    </div>
  );
}

const WorkImage = ({ work }: { work: WorksProps }) => {
  return (
    <div className="relative w-full h-120 rounded-2xl overflow-hidden">
      <Image src={work.image} alt={work.title} fill className="object-cover" />
    </div>
  );
};

const WorkInfo = ({ work }: { work: WorksProps }) => {
  return (
    <div className="p-6 rounded-2xl border-2 border-foreground bg-background shadow-md flex flex-col gap-6">
      <h1 className="text-3xl font-bold">{work.title}</h1>
      <p className="text-md text-foreground/50">{work.description}</p>
      <hr />
      <div className="flex flex-col gap-1 text-sm [&_h4]:text-foreground/60 [&_h3]:font-bold *:data-info:flex *:data-info:justify-between">
        <div data-info>
          <h3>Year</h3> <h4>{work.year}</h4>
        </div>
        <div data-info>
          <h3>Type</h3> <h4>{work.type}</h4>
        </div>
        <div data-info>
          <h3>Category</h3> <h4>{work.category}</h4>
        </div>
        {work.client && (
          <div data-info>
            <h3>Client</h3> <h4>{work.client}</h4>
          </div>
        )}
        <div data-info>
          <h3>Tools</h3>{" "}
          <div className="flex flex-col">
            {work.tools.map((tool) => (
              <h4 className="text-right" key={tool}>
                {tool}
              </h4>
            ))}
          </div>
        </div>
      </div>
      {work.link && (
        <Button variant="default" asChild className="self-center rounded-full">
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            作品を見る
          </a>
        </Button>
      )}
    </div>
  );
};

const BackButton = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            className="rounded-full w-fit col-span-2"
            asChild
          >
            <Link href="/works" className="mx-auto px-12 py-2">
              <ArrowLeft />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>作品一覧に戻る</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
