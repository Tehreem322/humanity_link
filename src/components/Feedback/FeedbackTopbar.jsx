import React from "react";
import DownloadIcon from "../../assets/images/Download.svg";
const FeedbackTopbar = () => {
  return (
    <>
      {" "}
      <div className="flex items-center justify-between my-5">
        <h3 className="tertiary-heading">Resources</h3>
        <div className="">
            <img
              className="bg-[#006679] w-9 rounded-md px-2 py-2 cursor-pointer"
              src={DownloadIcon}
              alt=""
            />
          </div>
      </div>
    </>
  );
};

export default FeedbackTopbar;
