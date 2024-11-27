"use client";

import React, { useState } from "react";

export default function AddTodo() {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 在这里执行回车时要做的操作
      console.log("用户按下了回车键，输入的值为：", inputValue);
      setInputValue("");
      // 例如，你可以在这里发送数据到服务器、执行搜索操作等
      
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="添加任务"
      className="bg-[#F3F0EE] mt-1 w-full h-[30px] pl-5"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    ></input>
  );
}
