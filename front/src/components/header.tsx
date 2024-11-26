import Image from "next/image";
import ConnectWallet from "@/components/connectWallet";
export default function Header() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl flex">
        <Image src="/trump.svg" width={24} height={24} alt="logo" />
        <div className="font-sans text-2xl pl-2">Todo</div>
      </div>
      <ul className="flex space-x-4">
        <li>
          <ConnectWallet />
        </li>
      </ul>
    </nav>
  );
}
