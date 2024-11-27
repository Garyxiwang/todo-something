"use client";

import { useEffect, useState } from "react";
import todoService from "./service";

interface TodoItem {
  id: number;
  title: string;
}

export default function ListContainer() {
  const [dataSource, setDataSource] = useState<TodoItem[]>([]);

  useEffect(() => {
    todoService.queryList().then((res) => {
      console.log("data", res);
      setDataSource(res.data);
    });
  }, []);

  return (
    <ul className="list-none">
      {dataSource ? (
        dataSource.map((item: TodoItem) => (
          <li key={item.id} className="flex items-center mb-2 p-2 border-gray-300 last:border-b-0">
            <input type="checkbox" className="form-checkbox mr-2" />
            <span>{item.title}</span>
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}
