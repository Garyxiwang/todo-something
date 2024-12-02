"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/hooks";
import todoService from "./service";

interface Todo {
  id: number;
  title: string;
  detail: string;
}
interface DetailsProps {
  todo: Todo;
  onRefresh: () => void;
}

export default function Details({ todo, onRefresh }: DetailsProps) {
  const [title, setTitle] = useState(todo.title);
  const [detail, setDetail] = useState(todo.detail);
  // 使用防抖
  const debouncedValue = useDebounce(title, 500);
  const debouncedDetail = useDebounce(detail, 500);

  useEffect(() => {
    setTitle(todo.title);
    setDetail(todo.detail);
  }, [todo]);

  const saveTodo = () => {
    const newTodo = {
      id: todo.id,
      title: debouncedValue,
      detail: debouncedDetail,
    };
    todoService.edit(newTodo);
    onRefresh();
  };

  useEffect(() => {
    if (debouncedValue || debouncedDetail) {
      console.log("最终值:", debouncedValue);
      console.log("最终值debouncedDetail:", debouncedDetail);
      saveTodo();
    }
  }, [debouncedValue, debouncedDetail]);

  return (
    <div className="pl-5 h-full">
      <div className="header td-header relative flex-none w-full borderBottomBefore py-[9px] px-[20px] mt-[8px]">
        <input type="checkbox" className="form-checkbox mr-2" />
        今天
      </div>
      <div className="body td-body b-h  flex-auto overflow-hidden h-full">
        <input
          className="text-lg font-bold w-full"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <textarea
          placeholder="输入内容"
          className="w-full "
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}
