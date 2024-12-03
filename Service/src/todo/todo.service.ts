import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import * as todoListAbi from "../contractsABI/TodoList.json";

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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

@Injectable()
export class TodoService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;

  constructor() {
    // 1. 配置本地 Hardhat 网络提供者
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // 连接本地网络
    this.signer = new ethers.Wallet(
      "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd",
      provider
    );

    // 2. 合约地址（从 Hardhat 部署日志获取）
    const contractAddress = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

    // 3. 创建合约实例
    this.contract = new ethers.Contract(
      contractAddress,
      todoListAbi.abi,
      this.signer
    );
  }
  /**
   * 合约中创建
   * @param title
   * @param detail
   * @param date
   */
  async createTodoItem(title: string, detail: string, date: number) {
    try {
      const tx = await this.contract.createTodoItem(title, detail, date);
      await tx.wait(); // 等待交易完成
      console.log(`Transaction hash: ${tx.hash}`);
      return tx.hash;
    } catch (error) {
      console.error("Error creating todo item:", error);
      throw new Error(error.message);
    }
  }

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
