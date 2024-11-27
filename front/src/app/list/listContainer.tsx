export default function ListContainer() {
  return (
    <ul className="list-none">
      <li className="flex items-center mb-2 p-2 border-gray-300 last:border-b-0">
        <input type="checkbox" className="form-checkbox mr-2" />
        <span>完成项目文档编写</span>
      </li>

      <li className="flex items-center mb-2 p-2 border-gray-300 last:border-b-0">
        <input type="checkbox" className="form-checkbox mr-2" />
        <span>参加团队会议</span>
      </li>
      <li className="flex items-center mb-2 p-2 border-gray-300 last:border-b-0">
        <input type="checkbox" className="form-checkbox mr-2" />
        <span>更新代码仓库</span>
      </li>
    </ul>
  );
}
