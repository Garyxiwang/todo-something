import AddTodo from "./addTodo";
import ListContainer from "./listContainer";
import Details from "./details";
export default function List() {
  return (
    <div className="text-black h-screen flex flex-row">
      <div className="basis-1/4 bg-[#F3F0EE] pl-8 pt-5">
        <AddTodo></AddTodo>
        <ListContainer></ListContainer>
      </div>
      <div className="basis-3/4 bg-white">
        <Details></Details>
      </div>
    </div>
  );
}
