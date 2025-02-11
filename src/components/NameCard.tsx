"use client";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
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
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      containerClassName="w-full max-w-160 md:max-w-200 h-screen md:h-132 mx-auto rounded-none md:rounded-[60px] bg-dot-6-s-2-foreground/50 p-6"
    >
      {/* カードの正面 */}
      <CardContainer
        containerClassName={`w-full h-full transition-all duration-300 ${
          isFlipped ? "opacity-0" : ""
        }`}
        className="w-full h-full"
      >
        <CardBody className="bg-white w-full h-full rounded-3xl shadow-xl border">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center cursor-pointer px-8 py-4 w-full h-full **:data-primary-text:text-stone-950 **:data-secondary-text:text-stone-400 *:text-center *:md:text-left *:w-full hover:**:data-image:drop-shadow-xl"
            onClick={handleFlip}
          >
            <CardItem
              translateZ={50}
              className="row-span-3 flex justify-center items-center"
            >
              <div data-image className="size-60 bg-gray-500 rounded-full">
                motion.div with pop up animation
              </div>
            </CardItem>
            <CardItem translateZ={80} className="row-span-2">
              <h3 data-secondary-text className="text-2xl mb-2">
                リュウチャーウェイ
              </h3>
              <h1 data-primary-text className="text-4xl md:text-6xl font-black">
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
      {/* カードの裏面 */}
      <CardContainer
        containerClassName={`w-full h-full transition-all transition-all duration-300 ${
          isFlipped ? "" : "opacity-0"
        }`}
        className="w-full h-full"
      >
        <CardBody className="bg-stone-50 w-full h-full rounded-3xl shadow-xl border">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center cursor-pointer px-8 py-4 w-full h-full **:data-primary-text:text-stone-950 **:data-secondary-text:text-stone-400 *:text-center *:md:text-left *:w-full hover:**:data-image:drop-shadow-xl"
            onClick={handleFlip}
          >
            <CardItem
              translateZ={70}
              className="w-full *:text-center *:md:text-left *:data-subtitle:text-xl *:data-title:text-4xl *:data-title:font-black"
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
