const { expect } = require("chai");

describe("TodoList Contract", function () {
  it("Should create a new todo item", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.waitForDeployment();

    const title = "Test Title";
    const detail = "Test Detail";
    const date = Math.floor(Date.now() / 1000);

    await todoList.createTodoItem(title, detail, date);

    const todo = await todoList.getTodoItem(0);
    expect(todo.title).to.equal(title);
    expect(todo.detail).to.equal(detail);
    expect(todo.date).to.equal(date);
    expect(todo.completed).to.equal(false);
  });
});