import React from 'react'
import Layout from "../../components/Layout/Layout";
import FeedbackTopbar from '../../components/Feedback/FeedbackTopbar';
import FeedbackCard from '../../components/Feedback/FeedbackCard';
import FeedbackCharts from '../../components/Feedback/FeedbackCharts';
const Feedback = () => {
  return (
    <>
     <Layout>
        <div className="md:ml-[17rem]">
          <div className="container-main">
            <FeedbackTopbar/>
            <FeedbackCard/>
            <FeedbackCharts/>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Feedback