import { useState ,useEffect} from "react";
import API from "../utils/API";



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
      const response = await API.post('/tasks/create', { task: tasks });
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
      const response = await API.put(`/tasks/edit/${taskId}`, { task: editedTask });
      setTaskList(taskList.map((task, i) => (i === index ? response.data : task)));
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
    <div>
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        onChange={(e) => setTasks(e.target.value)}
        value={tasks}
      />
      <button onClick={handleAddTask}>Add</button>
      <button onClick={() => setTasks("")}>Clear</button>
      <ul>
        {taskList.map((task, index) => (
          <li key={task._id}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => handleSave(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.task}</span>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
