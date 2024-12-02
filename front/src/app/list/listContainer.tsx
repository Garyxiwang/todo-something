"use client";

import { useEffect, useState } from "react";
import todoService from "./service";
import Image from "next/image";

interface TodoItem {
  id: number;
  title: string;
  detail: string;
}

interface ListContainerProps {
  onCurrentTodo: (todo: TodoItem) => void;
  refresh: boolean;
}

export default function ListContainer({
  onCurrentTodo,
  refresh = true,
}: ListContainerProps) {
  const [dataSource, setDataSource] = useState<TodoItem[]>([]);

  useEffect(() => {
    queryAll();
  }, [refresh]);

  const queryAll = () => {
    todoService.queryList().then((res) => {
      setDataSource(res.data);
    });
  };
  const headerDetail = async (id: number) => {
    const current = await todoService.detail(id);
    onCurrentTodo(current.data);
  };

  const headerDel = (e: React.MouseEvent<HTMLImageElement>, id: number) => {
    e.stopPropagation(); // 阻止事件冒泡
    todoService.del(id);
    queryAll();
  };

  return (
    <ul className="list-none">
      {dataSource ? (
        dataSource.map((item: TodoItem) => (
          <li
            key={item.id}
            className="group flex items-center mb-2 p-2 border-gray-300 last:border-b-0 hover:cursor-pointer"
            onClick={() => headerDetail(item.id)}
          >
            <input
              type="checkbox"
              className="form-checkbox mr-2 flex-none w-14"
            />
            <span className="flex-1 ">{item.title}</span>
            <Image
              src="/del.svg"
              width={16}
              height={16}
              alt="logo"
              className="flex-none opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                headerDel(e, item.id);
              }}
            />
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}
