import Geometry from "@/src/app/geometry/page";
export default function Home() {
  return (
    <div className="flex-grow p-4 bg-gray-800">
      <div className="font-mono md:text-[100px] text-[52px] leading-[42px] tracking-[-1px]  md:tracking-[-5px] md:leading-[120px] text-white flex  flex-row justify-center">
        TODO SOMETHING
      </div>
      <div className="marquee__container text-white overflow-hidden">
        <ul className="marquee ">
          <li className=" mx-8 w-auto ">START</li>
          <li className=" mx-8 w-auto ">干点啥1</li>
          <li className=" mx-8 w-auto ">吃点啥2</li>
          <li className=" mx-8 w-auto ">写点啥3</li>
          <li className=" mx-8 w-auto ">玩点啥4</li>
          <li className=" mx-8 w-auto ">干点啥5</li>
          <li className=" mx-8 w-auto ">吃点啥6</li>
          <li className=" mx-8 w-auto ">写点啥7</li>
          <li className=" mx-8 w-auto ">玩点啥8</li>
          <li className=" mx-8 w-auto ">玩点啥9</li>
          <li className=" mx-8 w-auto ">END</li>
        </ul>
      </div>
      <div>
        <Geometry />
      </div>
    </div>
  );
}
