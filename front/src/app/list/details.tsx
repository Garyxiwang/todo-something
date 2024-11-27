"use client";

import React, { useState } from "react";
export default function Details() {
  const [title, setTitle] = useState("这是默认title");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div className="pl-5 h-full">
      <div className="header td-header relative flex-none w-full borderBottomBefore py-[9px] px-[20px] mt-[8px]">
        <input type="checkbox" className="form-checkbox mr-2" />
        今天
      </div>
      <div className="body td-body b-h  flex-auto overflow-hidden h-full ">
        <input
          className="text-lg font-bold"
          value={title}
          onChange={handleInputChange}
        ></input>
        <textarea placeholder="输入内容" className="w-full "></textarea>
      </div>
    </div>
  );
}
