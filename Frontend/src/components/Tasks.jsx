import Task from "./Task";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Tasks(props) {
  const handleDelete = async (title) => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/todo/${title}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      //const newTasks = props.tasksState.filter((task) => task.title !== title);
      const newTasks = props.tasksState.filter((task) => task.title !== title);
      props.setTasksState(newTasks);
      toast.success("Task Deleted!", {
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, {
        position: "bottom-left",
      });
    }
  };

  const handleEdit = async (title, newTask) => {
    try {
      const taskToUpdate = props.tasksState.filter(
        (task) => task.title === title
      );
      const updatedTask = {
        ...taskToUpdate[0],
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      };
      if (
        newTask.title === taskToUpdate[0].title &&
        newTask.description === taskToUpdate[0].description &&
        newTask.status === taskToUpdate[0].status
      ) {
        toast.warn("No changes made", {
          position: "bottom-left",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:8090/api/v1/todo/${title}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.detail);
      }

      const editedTask = props.tasksState.map((task) => {
        if (task.title === title) {
          return {
            ...task,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
          };
        }
        return task;
      });

      props.setTasksState(editedTask);
      toast.success("Task Updated!", {
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {props.tasksState.map((task, index) => (
        <Task
          key={index}
          task={task}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          tasksState={props.tasksState}
        />
      ))}
    </div>
  );
}

export default Tasks;
