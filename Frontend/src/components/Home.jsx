import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import Modal from "./Modal";
import Tasks from "./Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [tasksState, setTasksState] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8090/api/v1/todo");
    const data = await response.json();
    if (!response.ok) {
      throw Error(data.detail);
    }
    setTasksState(data);
  };

  useEffect(() => {
    try {
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };
  return (
    <div className="flex flex-col justify-start items-center bg-sky-200 p-20 min-h-screen font-sans">
      <h1 className="text-3xl font-bold font-sans">Todos Application</h1>
      {
        // please add your first task
        tasksState.length === 0 && (
          <div className="flex items-center text-center h-60 p-16 border-dashed border-2 border-gray-700 rounded-2xl my-10">
            <h2 className="text-2xl font-bold font-sans">
              Please add your first task
            </h2>
          </div>
        )
      }
      <Tasks tasksState={tasksState} setTasksState={setTasksState} />
      <Modal
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        title="Add Task"
      >
        <AddTask
          tasksState={tasksState}
          setTasksState={setTasksState}
          toggleForm={toggleForm}
        />
      </Modal>
      <button
        onClick={() => toggleForm()}
        className="fixed bottom-10 right-10 hover:scale-110 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Add Task
      </button>
      <ToastContainer />
    </div>
  );
}

export default Home;
