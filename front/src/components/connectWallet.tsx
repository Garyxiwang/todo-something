"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}
const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWalletConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      setConnectionStatus("正在连接钱包，请稍候...");
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log("provider", provider);
        // 使用正确的获取账户方法
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          setConnectionStatus("已成功连接钱包");
          setIsLoading(true);
          // 可以在此处扩展其他业务逻辑，例如将地址发送到后端
          // await sendWalletAddressToBackend(accounts[0]);
        }
      } catch (error) {
        console.error("连接钱包失败", error);
        setConnectionStatus("连接钱包失败，请检查钱包设置或网络连接");
      }
    } else {
      setConnectionStatus("请安装MetaMask或其他兼容的加密钱包");
    }
  };

  const handleWalletDisconnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress("");
        setIsWalletConnected(false);
        setConnectionStatus("已成功断开钱包连接");
      } catch (error) {
        console.error("断开钱包连接失败", error);
        setConnectionStatus("断开钱包连接失败，请检查钱包设置或网络连接");
      }
    } else {
      setConnectionStatus("请安装MetaMask或其他兼容的加密钱包");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
      setIsWalletConnected(false);
      return;
    }
    if (typeof window.ethereum !== "undefined") {
      console.log("walletAddress", walletAddress);
      handleWalletConnect();
    } else {
      setConnectionStatus("请安装MetaMask或其他兼容的加密钱包");
    }
  }, []);

  const getAbbreviatedAddress = (address: string) => {
    if (!address) return "";
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };
  return (
    <>
      {!isLoading && (
        <button className="hover:text-gray-300" onClick={handleWalletConnect}>
          Connect Wallet
        </button>
      )}
      {!isWalletConnected ? (
        <div className="flex flex-col items-center">
          {connectionStatus && (
            <p className="text-red-500 text-center mt-2">{connectionStatus}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p
            className="text-green-500 text-center mt-4 hover:cursor-pointer"
            title={walletAddress}
          >
            {getAbbreviatedAddress(walletAddress)}
          </p>
          <button
            className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 mt-2"
            onClick={handleWalletDisconnect}
          >
            断开钱包连接
          </button>
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
