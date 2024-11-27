import { post, del, put } from "@/common/utils/request";

const todoService = {
  addTodo: async (obj: object) => {
    return await post("/api/todo/create", obj);
  },
  del: async (id: number) => {
    return await del("/api/todo/del", id);
  },
  edit: async (obj: object) => {
    return await put("/api/todo/edit", obj);
  },
  queryList: async () => {
    return await post("http://localhost:3100/api/todo/findAll");
  },
  detail: async (obj: object) => {
    return await post("/api/todo/detail", obj);
  },
};

export default todoService;
