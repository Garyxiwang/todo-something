"use client";

import AddTodo from "./addTodo";
import ListContainer from "./listContainer";
import Details from "./details";
import { useState } from "react";

interface todo {
  id: number;
  title: string;
  detail: string;
}
export default function List() {
  const [currentTodo, setCurrentTodo] = useState<todo>({
    id: 0,
    title: "",
    detail: "",
  });
  const [isAdd, setIsAdd] = useState<boolean>(false);
  return (
    <div className="text-black h-screen flex flex-row">
      <div className="basis-1/4 bg-[#F3F0EE] pl-8 pt-5">
        <AddTodo
          onRefresh={() => {
            setIsAdd(!isAdd);
          }}
        ></AddTodo>
        <ListContainer
          refresh={isAdd}
          onCurrentTodo={(data: todo) => {
            setCurrentTodo(data);
          }}
        ></ListContainer>
      </div>
      <div className="basis-3/4 bg-white">
        <Details
          todo={currentTodo}
          onRefresh={() => {
            setIsAdd(!isAdd);
          }}
        ></Details>
      </div>
    </div>
  );
}
