// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct TodoItem {
        string title;
        string detail;
        uint256 date;
        bool completed;
    }

    TodoItem[] private todoItems;

    address private _owner;

    event TodoItemCreated(
        uint256 indexed id,
        string title,
        string detail,
        uint256 date
    );
    event TodoItemUpdated(
        uint256 indexed id,
        string title,
        string detail,
        uint256 date,
        bool completed
    );
    event TodoItemCompleted(uint256 indexed id);

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    modifier validTodoItem(uint256 id) {
        require(id < todoItems.length, "Todo item does not exist");
        _;
    }

    // Constructor to set the deployer as the owner
    constructor() {
        _owner = msg.sender;
    }

    // Function to get the owner address
    function owner() external view returns (address) {
        return _owner;
    }

    // Function to create a new todo item
    function createTodoItem(
        string memory title,
        string memory detail,
        uint256 date
    ) external onlyOwner {
        todoItems.push(
            TodoItem({
                title: title,
                detail: detail,
                date: date,
                completed: false
            })
        );
        emit TodoItemCreated(todoItems.length - 1, title, detail, date);
    }

    // Function to update an existing todo item
    function updateTodoItem(
        uint256 id,
        string memory title,
        string memory detail,
        uint256 date
    ) external onlyOwner validTodoItem(id) {
        TodoItem storage item = todoItems[id];
        item.title = title;
        item.detail = detail;
        item.date = date;
        emit TodoItemUpdated(id, title, detail, date, item.completed);
    }

    // Function to mark a todo item as completed
    function completeTodoItem(uint256 id) external onlyOwner validTodoItem(id) {
        TodoItem storage item = todoItems[id];
        item.completed = true;
        emit TodoItemCompleted(id);
    }

    // Function to get details of a specific todo item
    function getTodoItem(uint256 id)
        external
        view
        validTodoItem(id)
        returns (
            string memory title,
            string memory detail,
            uint256 date,
            bool completed
        )
    {
        TodoItem storage item = todoItems[id];
        return (item.title, item.detail, item.date, item.completed);
    }

    // Function to get the total number of todo items
    function getTodoItemCount() external view returns (uint256) {
        return todoItems.length;
    }
}
