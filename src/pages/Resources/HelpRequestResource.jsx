import React from 'react'
import Layout from "../../components/Layout/Layout";
import ResourceHelpRequestTopbar from '../../components/Resources/ResourceHelpRequestTopbar';
import HelpRequestCard from '../../components/Resources/HelpRequestCard';
const HelpRequestResources = () => {
  return (
    <>
    <Layout>
        <div className="md:ml-[17rem]">
          <div className="container-main">
            {" "}
            <ResourceHelpRequestTopbar/>
           <HelpRequestCard/>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default HelpRequestResources