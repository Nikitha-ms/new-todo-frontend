import { useState, useEffect } from "react";
import API from "../utils/API";
import Plus from "../assets/Plus.png";
import DeleteIcon from "../assets/DeleteIcon.png";
import EditIcon from "../assets/EditIcon.png";
import SaveIcon from "../assets/SaveIcon.png";
const Todo = () => {
  const [tasks, setTasks] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = async () => {
    if (tasks.trim() === "") {
      alert("Please enter a task");
      return;
    }
    try {
      const response = await API.post("/tasks/create", { task: tasks });
      setTaskList([...taskList, response.data]);
      setTasks("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(taskList[index].task);
  };

  const handleSave = async (index) => {
    const taskId = taskList[index]._id;
    try {
      const response = await API.put(`/tasks/edit/${taskId}`, {
        task: editedTask,
      });
      setTaskList(
        taskList.map((task, i) => (i === index ? response.data : task))
      );
      setEditedTask("");
      setEditIndex(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDelete = async (index) => {
    const taskId = taskList[index]._id;
    try {
      await API.delete(`/tasks/delete/${taskId}`);
      setTaskList(taskList.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex  flex-col h-screen w-screen justify-center items-center bg-[#302f2f]">
      <h1 className="text-2xl  text-white text-center font-bold mb-4">
        To Do List
      </h1>
      <div className="flex flex-row justify-center items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          onChange={(e) => setTasks(e.target.value)}
          value={tasks}
          className="px-4 py-2 border w-full rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleAddTask}
          className="bg-[#f0f0f0] p-2 rounded-full w-20 h-10 flex items-center justify-center"
        >
          <img src={Plus} alt="Add" className="w-6 h-6" />
        </button>
        <button
          onClick={() => setTasks("")}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 "
        >
          Clear
        </button>
      </div>
      <ul className="list-none">
        {taskList.map((task, index) => (
          <li key={task._id} className="flex items-center gap-2 mb-2">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSave(index)}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
                >
                  <img src={SaveIcon} alt="Save" className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <span className="px-4 py-2 w-full text-white border rounded-2xl flex">
                  {task.task}
                </span>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 w-full h-full flex justify-center items-center"
                >
                  <img src={EditIcon} alt="Edit" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 w-full h-full  p-2 rounded-full hover:bg-red-600 flex items-center justify-center"
                >
                  <img src={DeleteIcon} alt="Delete" className="w-6 h-6" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
