"use client";
import { NFTImage, Address } from "@ant-design/web3";
import { WagmiWeb3ConfigProvider } from "@ant-design/web3-wagmi";
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const App: React.FC = () => {
  return (
    <>
      <div>
        <WagmiWeb3ConfigProvider config={config}>
          <NFTImage
            width={300}
            address="0x79fcdef22feed20eddacbb2587640e45491b757f"
            tokenId={8540}
          />
        </WagmiWeb3ConfigProvider>
      </div>
      <div>
        <Address
          ellipsis
          tooltip
          address="0x48A8a2B10A1439cC4feBa43569dCD624F6428b92"
        />
      </div>
    </>
  );
};

export default App;
