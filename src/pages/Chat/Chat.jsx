import React from 'react'
import Layout from "../../components/Layout/Layout";
import ChatForm from '../../components/Chat/Chat';
const Chat = () => {
  return (
    <> <Layout>
    <div className="md:ml-[17rem]">
      <div className="container-main">
        <ChatForm/>
      </div>
    </div>
  </Layout></>
  )
}

export default Chat