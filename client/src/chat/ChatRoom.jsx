import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { connectSocket, getSocket } from '../socket'
import CTAButton from '../Common/Button/CTAButton'
import TiptapEditor from '../Common/Editor/TiptapEditor'
import '../Common/Editor/TiptapEditor.css'
import ReportData from './ReportData'

const ChatRoom = () => {
  const { reportId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const editorRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [editingMessageId, setEditingMessageId] = useState(null)
  const [activeBubbleId, setActiveBubbleId] = useState(null)

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
    const existingSocket = getSocket()
    if (!existingSocket && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      connectSocket(user._reportId)
    }

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

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
        messageType: 'text',
      })
      setInput('')
      editorRef.current?.editor?.commands.clearContent(true)
    }
  }

  const handleSaveEdit = async (messageId) => {
    if (!input.trim()) return

    try {
      const res = await axios.put(
        `${BASE_URL}/api/messages/update`,
        {
          messageId,
          message: input,
        },
        { withCredentials: true }
      )

      console.log(res)
      if (res.data.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === messageId ? { ...msg, message: input } : msg
          )
        )
        toast.success('Message updated')
      } else {
        toast.error("message not updated")
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message)
    }

    setEditingMessageId(null)
    setInput('')
    editorRef.current?.editor?.commands.clearContent(true)
  }

  const user = JSON.parse(localStorage.getItem('user'))
  const currentUserId = user?._id

  return (
    <div className="">
      <ReportData reportId={reportId} />
      <div className="ProseMirror space-y-4 px-4 max-w-[50%] py-2 rounded-lg border-2 border-[#042d5b] overflow-y-auto bg-neutral-800 max-h-[400px] m-auto min-h-20">
        {messages.map((msg, index) => {
          const isLog = msg.messageType === 'log'
          const isSender = msg.senderInfo?._id === currentUserId
          const senderName =
            msg.senderInfo?.name || msg.senderInfo?.username || 'Unknown'
          const avatar =
            msg.senderInfo?.image ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${senderName}`

          const time = msg.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''

          return (
            <div
              key={index}
              className={`chat text-white ${
                isLog ? '' : isSender ? 'chat-end' : 'chat-start'
              }`}
              onClick={() => setActiveBubbleId(msg._id)}
            >
              {!isLog && (
                <>
                  <div className="!chat-image !avatar text-white">
                    <div className="!w-10 !rounded-full">
                      <img src={avatar} alt="avatar" />
                    </div>
                  </div>
                  <div className="chat-header">
                    {senderName}
                    <time className="text-xs text-white opacity-50 ml-2">
                      {time}
                    </time>
                  </div>
                </>
              )}

              <div
                className={`chat-bubble relative shadow-2xl text-white ${
                  isLog
                    ? 'bg-gray-700 mx-auto text-yellow-300 italic'
                    : 'bg-neutral-700'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.message }}
              />

              {activeBubbleId === msg._id && isSender && !editingMessageId && (
                <button
                  className="text-xs mt-1 underline text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingMessageId(msg._id)
                    setInput(msg.message)
                    editorRef.current?.editor?.commands.setContent(msg.message)
                  }}
                >
                  Edit
                </button>
              )}

              {!isLog && (
                <div className="chat-footer opacity-50">
                  {isSender ? 'Delivered' : 'Seen at ' + time}
                </div>
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Single Input Editor */}
      <div className="sticky bottom-0 z-10 bg-black py-4">
        <div className="flex mx-auto">
          <TiptapEditor
            ref={editorRef}
            onUpdate={(html) => setInput(html)}
          />
        </div>

        {editingMessageId ? (
          <div className="flex gap-2 justify-center mt-2">
            <CTAButton
              text="Save"
              onClick={() => handleSaveEdit(editingMessageId)}
            />
            <CTAButton
              text="Cancel"
              className="bg-red-600"
              onClick={() => {
                setEditingMessageId(null)
                setInput('')
                editorRef.current?.editor?.commands.clearContent(true)
              }}
            />
          </div>
        ) : (
          <CTAButton onClick={sendMessage} text="Send" className="flex mx-auto mt-2" />
        )}
      </div>
    </div>
  )
}

export default ChatRoom
