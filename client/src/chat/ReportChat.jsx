import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getSocket } from '../socket'
import CTAButton from '../Common/Button/CTAButton'
import TiptapEditor from '../Common/Editor/TiptapEditor'
import '../Common/Editor/TiptapEditor.css'

const ChatRoom = () => {
  const { reportId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const editorRef = useRef(null) // Reference to access the editor instance

  const BASE_URL =
    import.meta.env.VITE_BACKEND_HOST_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/messages/${reportId}`, {
          withCredentials: true,
        })

        if (res.data.success) {
          setMessages(res.data.messages)
        } else {
          toast.error('Failed to load messages')
        }
      } catch (err) {
        console.error('Message fetch error:', err)
        toast.error('Error loading messages')
      }
    }

    if (reportId) {
      fetchMessages()
    }
  }, [reportId])

  useEffect(() => {
    const socket = getSocket()
    if (!socket || !reportId) return

    socket.emit('joinRoom', reportId)

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [reportId])

  const sendMessage = () => {
    const socket = getSocket()
    const user = JSON.parse(localStorage.getItem('user'))
    const userType = JSON.parse(localStorage.getItem('userType'))

    if (socket && input.trim()) {
      socket.emit('sendMessage', {
        reportId,
        senderId: user._id,
        senderModel: userType.charAt(0).toUpperCase() + userType.slice(1),
        message: input,
      })
      setInput('') // Clear the input state
      // Clear the editor content
      if (editorRef.current?.editor) {
        editorRef.current.editor.commands.clearContent(true) // Use clearContent for a complete reset
      }
    }
  }

  const user = JSON.parse(localStorage.getItem('user'))
  const currentUserId = user?._id
  console.log('name ', user.name)

  return (
    <div className="  ">
      {/* <h2 className="text-amber-300 text-xl font-semibold mb-4">
        Chat for Report: {reportId}
      </h2> */}

      <div className=" space-y-4 px-4 py-2  rounded-lg border-2 border-[#042d5b] overflow-y-auto bg-neutral-800 h-[50vh]  top-0 ">
        {messages.map((msg, index) => {
          const isSender = msg.senderInfo._id === currentUserId
          const senderName =
            msg.senderInfo?.name || msg.senderInfo?.username || 'Unknown'
          const avatar =
            msg.senderInfo?.image ||
            'https://img.dicebear.com/6.x/initials/svg?seed=' + senderName

          const time = msg.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''

          return (
            <div
              key={index}
              className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={avatar} alt="avatar" />
                </div>
              </div>
              <div className="chat-header">
                {senderName}
                <time className="text-xs opacity-50 ml-2 ">{time}</time>
              </div>
              <div
                className={`chat-bubble   shadow-2xl${
                  isSender ? 'bg-blue-600 ' : 'bg-amber-500'
                }  `}
                dangerouslySetInnerHTML={{ __html: msg.message }}
              />
              <div className="chat-footer opacity-50">
                {isSender ? 'Delivered' : 'Seen at ' + time}
              </div>
            </div>
          )
        })}
      </div>
      {/* Message Input */}
      <div className="sticky bottom-0  dark:bg-black  z-10 ">
        <div className="flex  mx-auto">
          <TiptapEditor
            onUpdate={(html) => setInput(html)} // Update input state with editor content
            ref={editorRef} // Pass ref to access editor instance
          />
        </div>
        <CTAButton
          onClick={sendMessage}
          text="Send"
          className="flex mx-auto "
        />
      </div>
    </div>
  )
}

export default ChatRoom
