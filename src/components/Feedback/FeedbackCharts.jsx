import React from "react";
import BarChart from "./Barchart";
import PieChart from "./PieChart";

const FeedbackCharts = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5 my-5">
      <div
          style={{ "box-shadow": "0px 1.85px 6.25px 0px #00000030" }}
          className="p-5 bg-white rounded-lg"
        >
          <p className="tertiary-heading2">App discovery</p>
          <p className="primary-para2 mb-5">
            How did you find out about the Think CO App?
          </p>
          <PieChart />
        </div>
        <div
          style={{ "box-shadow": "0px 1.85px 6.25px 0px #00000030" }}
          className="p-5 bg-white rounded-lg"
        >
          <p className="tertiary-heading2">Star rating</p>
          <p className="primary-para2 mb-5">
            How useful have you found the Think CO app?
          </p>
          <BarChart style={{height:"800px"}} />
        </div>
       
      </div>
    </>
  );
};

export default FeedbackCharts;
