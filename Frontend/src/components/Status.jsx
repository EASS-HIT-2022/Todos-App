import React from "react";

function Status(props) {
  return (
    <div className="relative">
      <span
        onClick={() => props.setDropdown(!props.dropdown)}
        className={`${
          props.children === "done" ? "bg-green-200 text-green-700" : ""
        }
    ${props.children === "doing" ? "bg-amber-200 text-amber-700" : ""}
    ${props.children === "todo" ? "bg-gray-200 text-gray-700" : ""}
    px-2 py-1 rounded-full text-xs font-medium cursor-pointer`}
      >
        {" "}
        {props.children === "done" && "Done"}
        {props.children === "doing" && "Doing"}
        {props.children === "todo" && "Todo"}
      </span>
      {props.dropdown && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div className="py-1" role="none">
            <a
              onClick={() => {
                props.handleEdit(props.task.title, {
                  ...props.task,
                  status: "todo",
                });
                props.setDropdown(!props.dropdown);
              }}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Todo
            </a>
            <a
              onClick={() => {
                props.handleEdit(props.task.title, {
                  ...props.task,
                  status: "doing",
                });
                props.setDropdown(!props.dropdown);
              }}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Doing
            </a>
            <a
              onClick={() => {
                props.handleEdit(props.task.title, {
                  ...props.task,
                  status: "done",
                });
                props.setDropdown(!props.dropdown);
              }}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Done
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;
