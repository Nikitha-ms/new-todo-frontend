import { useState, useContext } from "react";
import API from "../utils/API";
import Plus from "../assets/Plus.png";
import DeleteIcon from "../assets/DeleteIcon.png";
import EditIcon from "../assets/EditIcon.png";
import SaveIcon from "../assets/SaveIcon.png";
import EraseIcon from "../assets/EraseIcon.png";
import TaskDone from "../assets/TaskDone.png";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get(`/tasks/${id}`);
        setTaskList(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (id) {
      fetchTasks();
    }
  }, [id]);

  const handleAddTask = async () => {
    if (tasks.trim() === "") {
      alert("Please enter a task");
      return;
    }
    try {
      const response = await API.post("/tasks/create", { task: tasks ,userid: id});
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

  const handleMarkAsDone = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = true;
    setTaskList(updatedTasks);
  };

  return (
    <div className="flex justify-center items-center bg-[#3d1431] h-screen w-screen">
      <div className="flex  flex-col justify-start items-start h-[80%] w-[50%]  bg-gray-700 rounded-xl m-[20px]  ">
        <h1 className="text-2xl  text-white   font-bold ml-[80px] mt-[5%] mb-5">
          Awesome Todo site
        </h1>
        <div className="flex flex-row w-[80%]  justify-center items-center gap-2 mb-5 ml-[80px] ">
          <input
            type="text"
            placeholder="what do you need to do today?"
            onChange={(e) => setTasks(e.target.value)}
            value={tasks}
            className="px-4 py-2 border w-full  font-semibold font-sans rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          {/* <button
            onClick={handleAddTask}
            className=" flex items-center justify-center"
          >
            <img src={Plus} alt="Add" className="w-8 h-7" />
          </button>  */}
          <div className="relative flex items-center justify-center group">
            <button
              onClick={handleAddTask}
              className="flex items-center justify-center"
            >
              <img src={Plus} alt="Add" className="w-8 h-7" />
            </button>
            <span className="absolute bottom-10 bg-gray-700 text-white text-md border border-white  rounded-xl  py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Add
            </span>
          </div>
          <div className="relative flex items-center justify-center group ml-2">
            <button
              onClick={() => setTasks("")}
              className="flex items-center justify-center"
            >
              <img src={EraseIcon} alt="Clear" className="w-8 h-7" />
            </button>
            <span className="absolute bottom-10 bg-gray-700 text-white text-md border border-white  rounded-xl  py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Clear
            </span>
          </div>
        </div>
        <div className="flex flex-row w-[90%] justify-center items-center gap-2 mb-2 ml-[80px]">
          <ul className="list-none  w-full max-h-[calc(80vh-200px)] overflow-y-auto overflow-x-hidden pr-2">
            {taskList.map((task, index) => (
              <li key={task._id} className="flex items-end gap-2 mb-2">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                      className="px-4 py-2 border w-full  font-semibold font-sans  focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="flex items-center justify-center w-10 h-10"
                    >
                      <img src={SaveIcon} alt="Save" className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className={`px-4 py-2 w-[81%]   border border-1  font-semibold font-sans text-white break-words inline-block ${task.completed ? 'line-through' : ''} `}>
                      {task.task}
                    </span>
                    <div className="flex items-end justify-end gap-2 ml-5">
                      {!task.completed && (
                    <div className="relative flex  group">
                      <button
                        onClick={() => handleEdit(index)}
                        className="flex"
                      >
                        <img src={EditIcon} alt="Edit" className="w-8 h-7" />
                      </button>
                      <span className="absolute bottom-10 bg-gray-700 text-white text-md border border-white  rounded-xl  py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Edit
                      </span>
                    </div>
                    )}
                    <div className="relative flex  group">
                      <button
                        onClick={() => handleDelete(index)}
                        className="flex "
                      >
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          className="w-8 h-7"
                        />
                      </button>
                      <span className="absolute bottom-10 bg-gray-700 text-white text-md border border-white  rounded-xl  py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Delete
                      </span>
                    </div>
                    {!task.completed && (
                    <div className="relative flex  group">
                      <button
                        onClick={() => handleMarkAsDone(index)}
                        className="flex "
                      >
                        <img
                          src={TaskDone}
                          alt="taskdone"
                          className="w-8 h-7"
                        />
                      </button>
                      <span className="absolute bottom-10 bg-gray-700 text-white text-md border border-white  rounded-xl  py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        done
                      </span>
                    </div>
                    )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
