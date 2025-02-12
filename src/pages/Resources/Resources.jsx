import React from 'react'
import Layout from "../../components/Layout/Layout";
import ResourceTable from '../../components/Resources/ResourceTable';
import ResourceTopbar from '../../components/Resources/ResourceTopbar';
const Resources = () => {
  return (
    <>
    <Layout>
        <div className="md:ml-[17rem]">
          <div className="container-main">
            {" "}
            <ResourceTopbar/>
           <ResourceTable/>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Resources