import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const [showfinsihed, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLs();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLs();
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savetoLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLs();
  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh]">
        <div className="addTodo ">
          <h1 className="text-2xl font-bold">Add Todo</h1>
          <input
            name={todo.id}
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-3/4 border-blue-50"
            id=""
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-green-800 hover:bg-green-950 px-2 py-1 text-sm text-white rounded-md mx-6 font-bold"
          >
            Save
          </button>
          {/* <input type="checkbox" value={ShowFinished} /> Show Finished */}
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex my-3 w-1/4 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    onChange={(e) => handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}{" "}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-green-800 hover:bg-green-950 px-2 py-1 text-sm text-white rounded-md mx-2 font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-green-800 hover:bg-green-950 px-2 py-1 text-sm text-white rounded-md mx-2 font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
