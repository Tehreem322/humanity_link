import React from "react";

const Upload = () => {
  return (
    <>
      {" "}
      <div className="md:w-[400px]">
        <div className="mt-[-6px] border-b pb-4">
          <h2 className="tertiary-heading2 ">Upload resource</h2>
        </div>
        <div>
          <div className="mt-5">
            <p className="secondary-heading2 mb-1">Name</p>
            <input
              className="border border-[#A7A7A7] w-full py-2 rounded-md px-3 outline-none"
              placeholder="File name"
              type="text"
            />
          </div>
          <div className="mt-5">
            <p className="secondary-heading2 mb-1">File</p>
            <input
              className="border border-[#A7A7A7] w-full py-2 rounded-md px-3 outline-none"
              placeholder="File name"
              type="file"
            />
          </div>
          <div className="flex items-end gap-3 my-5">
            <p>Make available on app</p>
            <input
              className="form-checkbox  h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              type="checkbox"
            />
          </div>
          <div className="flex justify-center mt-12">
            <button className="px-3 w-full md:px-4 primary-para border-2 border-[#006679]  py-2 rounded-md bg-[#006679]  focus:outline-none">
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
