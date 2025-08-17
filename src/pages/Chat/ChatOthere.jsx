import React from 'react'
import Layout from "../../components/Layout/Layout";
import ChatHelpSeeker from '../../components/Chat/ChatHelpSeeker';
const ChatOther = () => {
  return (
    <> <Layout>
    <div className="md:ml-[17rem]">
      <div className="container-main">
        <ChatHelpSeeker/>
      </div>
    </div>
  </Layout></>
  )
}

export default ChatOther