import React from 'react'

const ChatForm = () => {
  return (
      
      <div className="w-full  mt-2 shadow-lg rounded-lg overflow-hidden">

      <div className="bg-[#006679] text-white p-4 flex items-center justify-between">
      <span class="text-xl font-semibold">Chat</span>
      <button class="text-lg focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M12 4H3m9 16v-4m0-4v4m0-4V8M12 8V4m0 4h4m0-4H8"></path>
        </svg>
      </button>
    </div>
    <div className="p-4 space-y-4 h-96 overflow-y-auto">
      <div className='flex justify-end'>
      <div class="bg-[#006679] text-white rounded-lg p-3 max-w-sm text-sm">
          Hey there!
        </div>
      </div>
      <div class="flex justify-start">
        <div class="bg-gray-300 text-black rounded-lg p-3 max-w-sm text-sm">
          Hello! How can I assist you today?
        </div>
      </div>
      </div>
      <div className='bg-gray-100 p-4 flex gap-6'>
       <input type="text"  className='w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
             <button class="bg-[#006679] text-white px-4 py-2 rounded-lg">Send</button>
      </div>
      </div>    
  )
}

export default ChatForm