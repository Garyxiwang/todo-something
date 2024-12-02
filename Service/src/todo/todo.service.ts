import { Injectable } from "@nestjs/common";

let list: Array<Object> = [
  {
    id: 1,
    title: "完成项目文档编写",
    detail:
      "完成项目文档编写完成项目文档编写完成项目文档编写完成项目文档编写详情",
  },
  {
    id: 2,
    title: "参加团队会议",
    detail: "参加团队会议参加团队会议参加团队会议详情",
  },
  {
    id: 3,
    title: "更新代码仓库",
    detail: "更新代码仓库更新代码仓库更新代码仓库详情",
  },
];

@Injectable()
export class TodoService {
  /**
   * 查询
   * @returns
   */
  findAll(): Object {
    console.log("list", list);
    const newList = list.map((item: { id; title; detail }) => {
      const { detail, ...rest } = item;
      return rest;
    });
    return {
      data: newList,
      message: "查询成功",
      code: 200,
    };
  }
  findDetail(id): Object {
    const foundObj = list.find((item: { id; title; detail }) => item.id === id);
    console.log("findDetail", foundObj);
    return {
      data: foundObj,
      message: "查询详情成功",
      code: 200,
    };
  }
  /**
   * 新增
   * @returns
   */
  create(obj): object {
    console.log("create", obj);
    const maxId = Math.max(...list.map((item: any) => item.id));
    obj.id = maxId + 1;
    list.push(obj);
    return {
      data: obj,
      message: "新增成功",
      code: 200,
    };
  }
  /**
   * 编辑
   * @returns
   */
  edit(obj): object {
    console.log("obj", obj);
    const updatedList = list.map((item: { id; title; detail }) => {
      if (item.id === obj.id) {
        // 这里可以根据你的需求修改具体要更新的属性值
        return {
          ...item,
          title: obj.title,
          detail: obj.detail,
        };
      }
      return item;
    });
    list = updatedList;
    return {
      data: obj,
      message: "修改成功",
      code: 200,
    };
  }

  /**
   * 删除
   * @returns
   */
  delete(id: number): object {
    const newList = list.filter(
      (item: { id; title; detail }) => item.id !== id
    );
    list = newList;

    return {
      data: { id: id },
      message: "删除成功",
      code: 200,
    };
  }
}
