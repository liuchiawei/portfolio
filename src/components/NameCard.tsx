"use client";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function NameCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  /** 
    @function handleFlip
    @description: カードを裏返す関数
  */
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="w-full flex justify-center items-center overflow-x-hidden">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              {/* カードの正面 */}
              <CardContainer>
                <CardBody
                  className={`w-98 h-144 md:w-200 md:h-124 rounded-3xl shadow-xl border transition-all duration-300 ${
                    isFlipped ? "opacity-0" : ""
                  }`}
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center cursor-pointer px-8 py-4 w-full h-full **:data-primary-text:text-foreground **:data-secondary-text:text-foreground/40 *:text-center *:md:text-left *:w-full hover:**:data-image:drop-shadow-xl"
                    onClick={handleFlip}
                  >
                    <CardItem
                      translateZ={50}
                      className="row-span-3 flex justify-center items-center"
                    >
                      <div
                        data-image
                        className="size-60 bg-red-500 rounded-full"
                      >
                        motion.div with pop up animation
                      </div>
                    </CardItem>
                    <CardItem translateZ={80} className="border row-span-2">
                      <h3 data-secondary-text className="text-2xl mb-2">
                        リュウチャーウェイ
                      </h3>
                      <h1
                        data-primary-text
                        className="text-4xl md:text-6xl font-black"
                      >
                        Liu Chiawei
                      </h1>
                    </CardItem>
                    <CardItem translateZ={50}>
                      <h3 data-secondary-text className="text-sm md:text-md">
                        Illustrator / Graphic Designer / Web Designer
                      </h3>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </TooltipTrigger>
            <TooltipContent>
              クリックして、もっと見てみよう！
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* カードの裏面 */}
      <CardContainer className="overflow-x-hidden">
        <CardBody
          className={`w-96 h-132 md:w-200 md:h-124 rounded-3xl shadow-xl border transition-all duration-300 ${
            isFlipped ? "" : "opacity-0"
          }`}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center cursor-pointer px-8 py-4 w-full h-full **:data-primary-text:text-foreground **:data-secondary-text:text-foreground/40 *:text-center *:md:text-left *:w-full hover:**:data-image:drop-shadow-xl"
            onClick={handleFlip}
          >
            <CardItem
              translateZ={70}
              className="border w-full *:text-center *:md:text-left *:data-subtitle:text-xl *:data-title:text-4xl *:data-title:font-black"
            >
              <h3 data-primary-text>リュウ チャーウェイ</h3>
              <h1 data-primary-text>Liu Chiawei</h1>
            </CardItem>
            <CardItem translateZ={70} className="row-span-3">
              <p
                data-primary-text
                className="text-sm md:text-md leading-6 md:leading-8 text-justify"
              >
                クリエイターをマネジメントする事務所やWEB制作会社などを経て、2015年にイラストレーターとして独立。シンプルな線と目を引く色づかいを特徴として、広告キャンペーン、書籍の表紙、商品パッケージなどの「デザインにフィットする」イラストを描く。
              </p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </ReactCardFlip>
  );
}
