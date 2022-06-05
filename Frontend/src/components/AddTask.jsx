import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTask(props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
    };
    try {
      if (!title) {
        throw Error("Title is required");
      }
      const response = await fetch("http://localhost:8090/api/v1/todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTask, created_at: new Date() }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.detail);
      }
      console.log(data);

      props.setTasksState([...props.tasksState, data]);
      setTitle("");
      setDescription("");

      props.toggleForm();

      toast.success("Task Added!", {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="ring-2 ring-sky-400 p-1"
        type="text"
        placeholder="Title"
        value={title}
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        className="ring-2 ring-sky-400 p-1"
        placeholder="Description"
        rows="5"
        value={description}
      />
      <button className="bg-sky-700 text-white font-semibold p-2" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTask;
