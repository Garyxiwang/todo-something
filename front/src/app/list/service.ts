import { post, del, put } from "@/utils/request";

const todoService = {
  addTodo: async (obj: object) => {
    return await post("http://localhost:3100/api/todo/create", obj);
  },
  del: async (id: number) => {
    return await del("http://localhost:3100/api/todo/delete", { id: id });
  },
  edit: async (obj: object) => {
    return await put("http://localhost:3100/api/todo/edit", obj);
  },
  queryList: async () => {
    return await post("http://localhost:3100/api/todo/findAll");
  },
  detail: async (id: number) => {
    return await post("http://localhost:3100/api/todo/detail", { id: id });
  },
};

export default todoService;
