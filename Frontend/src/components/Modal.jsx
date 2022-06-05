function Modal(props) {
  return (
    <div
      className={`fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-60 ${
        props.displayForm ? "" : "hidden"
      }`}
    >
      <div className="relative">
        <button
          onClick={() => props.setDisplayForm(false)}
          type="button"
          className="absolute top-0 left-0 p-4 text-2xl text-red-500 hover:text-red-600 focus:text-red-600 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={`p-8 w-96 rounded-lg bg-white shadow-xl h-fit`}>
          <h2 className="text-2xl font-semibold text-center my-6">
            {props.title}
          </h2>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
