import React, { useState, useRef } from "react";

const DragDropFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type === "audio/mpeg"
    ) {
      alert("Audio file dropped!");
    } else {
      alert("Error...");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      alert("File dropped!");
    } else {
      alert("Error...");
    }
  };

  const onButtonClick = () => {
    if (inputRef.current.value) {
      alert(`${inputRef.current.value} ready to be handled.`);
    } else {
      alert("No file...");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-center m-2 h-64 w-96 "
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          className="hidden"
          id="file"
          type="file"
          //   accept="mp3"
          onChange={handleChange}
        />

        <label
          className={
            dragActive
              ? "bg-gray-200 w-full h-full border-2 border-dashed rounded-md flex justify-center items-center text-center"
              : " w-full h-full border-2 border-dashed rounded-md flex justify-center items-center text-center"
          }
          htmlFor="file"
        >
          <div>
            <p>Drag and drop your file here</p>
            <p>
              <i>(or simply click to select it...)</i>
            </p>
            <button
              onClick={onButtonClick}
              className="text-grey-500 mr-5 mt-5 py-2 px-6 rounded-lg border-0 text-sm font-medium bg-blue-50 text-blue-700 hover:bg-amber-50 hover:text-amber-700"
            >
              Do something with your file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            className="absolute w-screen h-screen top-0 right-0 bottom-0 left-0 "
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </div>
  );
};

export default DragDropFile;
