import React from 'react'
import Layout from "../../components/Layout/Layout";
import ContactTopbar from '../../components/Contact/ContactTopbar';
import ContactTable from '../../components/Contact/ContactTable';
const Contact = () => {
  return (
    <> <Layout>
    <div className="md:ml-[17rem]">
      <div className="container-main">
<ContactTopbar/>
<ContactTable/>
      </div>
    </div>
  </Layout></>
  )
}

export default Contact