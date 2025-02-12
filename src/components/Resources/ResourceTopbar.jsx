import React, { useState } from "react";
import UploadSvg from "../../assets/images/upload.svg";
import Upload from "./Upload";
import DynamicPopup from "../../utils/DynamicPopup";
const ResourceTopbar = () => {
  // popup
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  return (
    <>
      <DynamicPopup
        data={<Upload />}
        open={open}
        onCloseModal={() => setOpen(false)}
      />

      <div className="flex items-center justify-between my-5">
        <h3 className="tertiary-heading">Resources</h3>
        <button
          onClick={openModal}
          className="px-3 md:px-4 flex items-center gap-2 primary-para border-2 border-[#006679]  py-2 rounded-md bg-[#006679]  focus:outline-none"
        >
          <span>
            <img src={UploadSvg} alt="" />
          </span>
          Upload
        </button>
      </div>
    </>
  );
};

export default ResourceTopbar;
