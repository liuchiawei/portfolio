import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { WorksProps } from "@/lib/props";

export const WorksGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const WorksGridItem = ({
  className,
  work,
}: {
  className?: string;
  work: WorksProps;
}) => {
  return (
    <Link
      href={`/works/${work.id}`}
      className={cn(
        "group/grids p-8 gap-4 flex flex-col justify-between rounded-3xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-neutral-800 bg-neutral-50 hover:-translate-y-2 overflow-hidden",
        className
      )}
    >
      {/* 作品画像 */}
      <div className="flex justify-center items-center w-full h-full min-h-48 rounded-2xl border-2 border-foreground relative overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          objectFit="cover"
          objectPosition="center"
          fill
          className="group-hover/grids:scale-120 transition duration-200"
        />
      </div>
      {/* 作品情報 */}
      <div className="group-hover/grids:translate-x-2 transition duration-200 flex flex-col gap-2 h-1/3">
        <div className="font-sans text-xs text-foreground/60">
          {work.year}　|　{work.type}
        </div>
        <div className="font-bold text-lg md:text-xl text-foreground">
          {work.title}
        </div>
        <div className="font-sans font-normal text-foreground/60 text-sm">
          {work.description}
        </div>
      </div>
    </Link>
  );
};
