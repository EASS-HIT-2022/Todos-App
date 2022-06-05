import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Status from "./Status";

function Task(props) {
  const [displayForm, setDisplayForm] = React.useState(false);
  const [title, setTitle] = React.useState(props.task.title);
  const [description, setDescription] = React.useState(props.task.description);
  const [dropdown, setDropdown] = React.useState(false);

  useEffect(() => {
    setTitle(props.task.title);
    setDescription(props.task.description);
  }, [props.task]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Modal
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        title="Edit Task"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDisplayForm(false);
            props.handleEdit(props.task.title, {
              ...props.task,
              title,
              description,
            });
          }}
          className="flex flex-col gap-2"
        >
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
            type="text"
            placeholder="Description"
            rows="5"
            value={description}
          />
          <button
            className="bg-sky-700 text-white font-semibold p-2"
            type="submit"
          >
            Edit
          </button>
        </form>
      </Modal>

      <div className="bg-white p-4 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-semibold text-sky-700">
          {props.task.title}
        </h2>
        <p className="py-4">{props.task.description}</p>

        <div className="flex justify-between">
          <p>
            <b>Created at:</b> <span>{formatDate(props.task.created_at)}</span>
          </p>
          <p>
            <b>Status:</b>{" "}
            <Status
              dropdown={dropdown}
              setDropdown={setDropdown}
              handleEdit={props.handleEdit}
              task={props.task}
            >
              {props.task.status}
            </Status>
          </p>
        </div>
        <div className="flex justify-end pt-4 gap-2">
          <button
            onClick={() => setDisplayForm(true)}
            className="bg-amber-500 hover:bg-amber-700 text-white font-bold text-xs py-2 px-4 rounded-full"
          >
            Edit
          </button>
          <button
            onClick={() => props.handleDelete(props.task.title)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Task;
