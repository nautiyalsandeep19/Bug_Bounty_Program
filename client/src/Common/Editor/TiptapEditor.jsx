import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import './TiptapEditor.css'
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  Redo2,
  Undo2,
  Code2,
  Upload,
  ImageDown,
} from 'lucide-react'
import { uploadFiles } from '../../Services/uploaderApi'
import Video from './Video'
import ExternalFile from './ExternalFile'

const MAX_TOTAL_SIZE_MB = 10

const MenuBar = ({ editor }) => {
  const [showHeadings, setShowHeadings] = useState(false)
  const dropdownRef = useRef(null)
  const imageInputRef = useRef(null)
  const fileInputRef = useRef(null)

  if (!editor) return null

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowHeadings(false)
      }
    }
    if (showHeadings) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showHeadings])

  const headingLabel =
    [1, 2, 3, 4, 5, 6].find((level) => editor.isActive('heading', { level })) ||
    (editor.isActive('paragraph') ? 'Para' : 'Heading')

  const formatButton = (icon, action, isActive, disabled = false) => (
    <button
      onClick={action}
      disabled={disabled}
      type="button"
      className={`p-2 rounded border border-gray-300 flex items-center justify-center
        hover:bg-white/20 hover:text-white transition
        ${
          isActive
            ? 'bg-white/20 text-white font-semibold'
            : 'bg-transparent text-white'
        }`}
    >
      {icon}
    </button>
  )

  const handleToggleCodeBlock = () => {
    if (!editor) return
    const isInCodeBlock = editor.isActive('codeBlock')
    if (isInCodeBlock) {
      editor.chain().focus().toggleCodeBlock().run()
    } else {
      editor.chain().focus().toggleCodeBlock().run()
    }
  }

  const uploadImage = async (file) => {
    const imageUrl = await uploadFiles(file)
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
    }
  }

  const uploadDoc = async (file) => {
    const fileUrl = await uploadFiles(file)

    if (fileUrl) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'externalFile',
          attrs: {
            href: fileUrl,
            filename: file.name,
          },
        })
        .run()
    }
  }

  const uploadVideo = async (file) => {
    const videoUrl = await uploadFiles(file)
    if (videoUrl) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'video',
          attrs: {
            src: videoUrl,
            controls: true,
            class: 'w-full max-h-64',
          },
        })
        .run()
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    const isDoc = !isImage && !isVideo

    if (isImage) return uploadImage(file)
    if (isVideo) return uploadVideo(file)
    if (isDoc) return uploadDoc(file)
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md border-gray-300 bg-black w-full mb-4">
      {formatButton(
        <Bold size={18} />,
        () => editor.chain().focus().toggleBold().run(),
        editor.isActive('bold')
      )}
      {formatButton(
        <Italic size={18} />,
        () => editor.chain().focus().toggleItalic().run(),
        editor.isActive('italic')
      )}
      {formatButton(
        <Strikethrough size={18} />,
        () => editor.chain().focus().toggleStrike().run(),
        editor.isActive('strike')
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowHeadings(!showHeadings)}
          className={`p-2 rounded border border-gray-300 flex items-center justify-center transition cursor-pointer
            ${
              headingLabel
                ? 'bg-white/20 text-white font-semibold'
                : 'bg-transparent text-white hover:bg-white/20 hover:text-white'
            }`}
          type="button"
        >
          {headingLabel}
        </button>
        {showHeadings && (
          <div className="absolute z-10 bg-black border border-gray-300 rounded shadow-md mt-1 w-40">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level }).run()
                  setShowHeadings(false)
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-white/20 hover:text-white text-gray-200"
              >
                H{level}
              </button>
            ))}
            <button
              onClick={() => {
                editor.chain().focus().setParagraph().run()
                setShowHeadings(false)
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-white/20 hover:text-white text-gray-200"
            >
              Paragraph
            </button>
          </div>
        )}
      </div>
      {formatButton(
        <List size={18} />,
        () => editor.chain().focus().toggleBulletList().run(),
        editor.isActive('bulletList')
      )}
      {formatButton(
        <ListOrdered size={18} />,
        () => editor.chain().focus().toggleOrderedList().run(),
        editor.isActive('orderedList')
      )}
      {formatButton(
        <Code2 size={18} />,
        handleToggleCodeBlock,
        editor.isActive('codeBlock')
      )}
      {formatButton(
        <Quote size={18} />,
        () => editor.chain().focus().toggleBlockquote().run(),
        editor.isActive('blockquote')
      )}
      {formatButton(
        <Minus size={18} />,
        () => editor.chain().focus().setHorizontalRule().run(),
        false
      )}
      {formatButton(
        <Undo2 size={18} />,
        () => editor.chain().focus().undo().run(),
        false,
        !editor.can().undo()
      )}
      {formatButton(
        <Redo2 size={18} />,
        () => editor.chain().focus().redo().run(),
        false,
        !editor.can().redo()
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded border border-gray-300 flex items-center justify-center text-white"
      >
        <Upload size={18} />
      </button>

      <input
        type="file"
        accept="image/*,video/*,.pdf,.doc,.docx"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
  Image,
  Video,
  ExternalFile,
]

const TiptapEditor = forwardRef(({ onUpdate, setReportPOC }, ref) => {
  const editor = useEditor({
    extensions,
    content: '',
    editorProps: {
      attributes: {
        class:
          'ProseMirror h-[200px] w-[40vw] overflow-y-auto border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (typeof onUpdate === 'function') onUpdate(html)
      if (typeof setReportPOC === 'function') setReportPOC(html)
    },
  })

  useEffect(() => {
    if (editor && ref) {
      ref.current = { editor }
    }
  }, [editor, ref])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
})

export default TiptapEditor
