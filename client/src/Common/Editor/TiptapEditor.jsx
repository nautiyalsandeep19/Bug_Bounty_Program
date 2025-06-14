import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import './TiptapEditor.css'
import {
  Bold, Italic, Strikethrough, List, ListOrdered, Quote,
  Minus, Redo2, Undo2, Code2, Upload, ImageDown
} from 'lucide-react'
import { uploadFiles } from '../../Services/uploaderApi'
import Video from '../../extensions/Video'
import ExternalFile from '../../extensions/ExternalFile'

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

  const headingLabel = [1, 2, 3, 4, 5, 6].find((level) =>
    editor.isActive('heading', { level })
  ) || (editor.isActive('paragraph') ? 'Para' : 'Heading')

  const formatButton = (icon, action, isActive, disabled = false) => (
    <button
      onClick={action}
      disabled={disabled}
      type="button"
      className={`p-2 rounded border border-gray-300 flex items-center justify-center
        hover:bg-white/20 hover:text-white transition
        ${isActive ? 'bg-white/20 text-white font-semibold' : 'bg-transparent text-white'}`}
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
      {formatButton(<Bold size={18} />, () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
      {formatButton(<Italic size={18} />, () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
      {formatButton(<Strikethrough size={18} />, () => editor.chain().focus().toggleStrike().run(), editor.isActive('strike'))}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowHeadings(!showHeadings)}
          className={`p-2 rounded border border-gray-300 flex items-center justify-center transition cursor-pointer
            ${headingLabel ? 'bg-white/20 text-white font-semibold' : 'bg-transparent text-white hover:bg-white/20 hover:text-white'}`}
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
      {formatButton(<List size={18} />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
      {formatButton(<ListOrdered size={18} />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
      {formatButton(<Code2 size={18} />, handleToggleCodeBlock, editor.isActive('codeBlock'))}
      {formatButton(<Quote size={18} />, () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'))}
      {formatButton(<Minus size={18} />, () => editor.chain().focus().setHorizontalRule().run(), false)}
      {formatButton(<Undo2 size={18} />, () => editor.chain().focus().undo().run(), false, !editor.can().undo())}
      {formatButton(<Redo2 size={18} />, () => editor.chain().focus().redo().run(), false, !editor.can().redo())}

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
  ExternalFile
]

const TiptapEditor = forwardRef(({ onUpdate, setReportPOC }, ref) => {
  const editor = useEditor({
    extensions,
    content: '',
    editorProps: {
      attributes: {
        class: 'ProseMirror h-[200px] w-[40vw] overflow-y-auto border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black',
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


// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// Earlier code 

// import React, { useState, useEffect, useRef } from 'react'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import TextStyle from '@tiptap/extension-text-style'
// import Color from '@tiptap/extension-color'
// import ListItem from '@tiptap/extension-list-item'
// import Image from '@tiptap/extension-image'
// import './TiptapEditor.css'
// import {
//   Bold,
//   Italic,
//   Strikethrough,
//   List,
//   ListOrdered,
//   Quote,
//   Minus,
//   Redo2,
//   Undo2,
//   Code2,
//   Upload,
// } from 'lucide-react'
// import { uploadFiles } from '../../Services/uploaderApi'

// const MenuBar = ({ editor }) => {
//   const [showHeadings, setShowHeadings] = useState(false)
//   const dropdownRef = useRef(null)
//   const fileInputRef = useRef(null)

//   if (!editor) return null

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowHeadings(false)
//       }
//     }

//     if (showHeadings) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [showHeadings])

//   const activeHeadingLevel = [1, 2, 3, 4, 5, 6].find((level) =>
//     editor.isActive('heading', { level })
//   )
//   const isParagraphActive = editor.isActive('paragraph')
//   const headingLabel = activeHeadingLevel
//     ? `H${activeHeadingLevel}`
//     : isParagraphActive
//     ? 'Para'
//     : 'Heading'

//   const formatButton = (icon, action, isActive, disabled = false) => (
//     <button
//       onClick={action}
//       disabled={disabled}
//       type="button"
//       className={`p-2 rounded border border-gray-300 flex items-center justify-center
//         hover:bg-white/20 hover:text-white transition
//         ${
//           isActive
//             ? 'bg-white/20 text-white font-semibold'
//             : 'bg-transparent text-white'
//         }`}
//     >
//       {icon}
//     </button>
//   )

//   const handleToggleCodeBlock = () => {
//     if (!editor) return
//     const { state, view } = editor
//     const { $from } = state.selection
//     const isInCodeBlock = editor.isActive('codeBlock')

//     if (isInCodeBlock) {
//       editor
//         .chain()
//         .focus()
//         .command(({ tr }) => {
//           const endPos = $from.end($from.depth)
//           tr.insert(endPos, state.schema.nodes.paragraph.create())
//           tr.setSelection(
//             state.selection.constructor.near(tr.doc.resolve(endPos + 1))
//           )
//           view.dispatch(tr)
//           return true
//         })
//         .run()
//     } else {
//       editor.chain().focus().toggleCodeBlock().run()
//     }
//   }

//   const uploadImage = async (file) => {
//     if (!file) return

//     try {
//       const imageUrl = await uploadFiles(file)
//       if (imageUrl) {
//         editor.chain().focus().setImage({ src: imageUrl }).run()
//       }
//     } catch (error) {
//       console.error('Image upload failed:', error)
//       alert('Failed to upload image')
//     }
//   }

//   return (
//     <div className="flex flex-wrap gap-2 p-4 border rounded-md border-gray-300 bg-black w-full mb-4">
//       {formatButton(
//         <Bold size={18} />,
//         () => editor.chain().focus().toggleBold().run(),
//         editor.isActive('bold')
//       )}
//       {formatButton(
//         <Italic size={18} />,
//         () => editor.chain().focus().toggleItalic().run(),
//         editor.isActive('italic')
//       )}
//       {formatButton(
//         <Strikethrough size={18} />,
//         () => editor.chain().focus().toggleStrike().run(),
//         editor.isActive('strike')
//       )}

//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setShowHeadings(!showHeadings)}
//           className={`p-2 rounded border border-gray-300 flex items-center justify-center transition
//             ${
//               activeHeadingLevel || isParagraphActive
//                 ? 'bg-white/20 text-white font-semibold'
//                 : 'bg-transparent text-white hover:bg-white/20 hover:text-white'
//             }`}
//           type="button"
//         >
//           {headingLabel}
//         </button>

//         {showHeadings && (
//           <div className="absolute z-10 bg-black border border-gray-300 rounded shadow-md mt-1 w-40">
//             {[1, 2, 3, 4, 5, 6].map((level) => (
//               <button
//                 key={level}
//                 onClick={() => {
//                   editor.chain().focus().toggleHeading({ level }).run()
//                   setShowHeadings(false)
//                 }}
//                 className={`block w-full px-4 py-2 text-left text-sm transition
//                   hover:bg-white/20 hover:text-white
//                   ${
//                     editor.isActive('heading', { level })
//                       ? 'bg-white/20 font-semibold text-white'
//                       : 'text-gray-200'
//                   }`}
//               >
//                 H{level}
//               </button>
//             ))}
//             <button
//               onClick={() => {
//                 editor.chain().focus().setParagraph().run()
//                 setShowHeadings(false)
//               }}
//               className={`block w-full px-4 py-2 text-left text-sm transition
//                 hover:bg-white/20 hover:text-white
//                 ${
//                   isParagraphActive
//                     ? 'bg-white/20 font-semibold text-white'
//                     : 'text-gray-200'
//                 }`}
//             >
//               Paragraph
//             </button>
//           </div>
//         )}
//       </div>

//       {formatButton(
//         <List size={18} />,
//         () => editor.chain().focus().toggleBulletList().run(),
//         editor.isActive('bulletList')
//       )}
//       {formatButton(
//         <ListOrdered size={18} />,
//         () => editor.chain().focus().toggleOrderedList().run(),
//         editor.isActive('orderedList')
//       )}
//       {formatButton(
//         <Code2 size={18} />,
//         handleToggleCodeBlock,
//         editor.isActive('codeBlock')
//       )}
//       {formatButton(
//         <Quote size={18} />,
//         () => editor.chain().focus().toggleBlockquote().run(),
//         editor.isActive('blockquote')
//       )}
//       {formatButton(
//         <Minus size={18} />,
//         () => editor.chain().focus().setHorizontalRule().run(),
//         false
//       )}
//       {formatButton(
//         <Undo2 size={18} />,
//         () => editor.chain().focus().undo().run(),
//         false,
//         !editor.can().undo()
//       )}
//       {formatButton(
//         <Redo2 size={18} />,
//         () => editor.chain().focus().redo().run(),
//         false,
//         !editor.can().redo()
//       )}
//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         className="p-2 rounded border border-gray-300 flex items-center justify-center text-white"
//       >
//         <Upload size={18} />
//       </button>
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           const file = e.target.files?.[0]
//           uploadImage(file)
//           e.target.value = null
//         }}
//       />
//     </div>
//   )
// }

// const TiptapOutput = ({ html }) => (
//   <div
//     className="ProseMirror prose prose-invert max-w-none bg-gray-900 text-white p-4 rounded mt-6 overflow-y-auto max-h-[500px] border-t-2 border-blue-500"
//     dangerouslySetInnerHTML={{ __html: html }}
//   />
// )

// const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: { keepMarks: true, keepAttributes: false },
//     orderedList: { keepMarks: true, keepAttributes: false },
//   }),
//   Image,
// ]

// const TiptapEditor = ({ setReportPOC }) => {
//   const [output, setOutput] = useState('')
//   const editor = useEditor({
//     extensions,
//     content: '',
//     editorProps: {
//       attributes: {
//         class:
//           'ProseMirror max-h-[400px] overflow-y-auto border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black',
//       },
//     },
//   })

//   useEffect(() => {
//     if (!editor) return

//     const updateOutput = () => {
//       const html = editor.getHTML()
//       setOutput(html)
//       if (setReportPOC) {
//         setReportPOC(html) // <-- updates parent component's state
//       }
//     }

//     editor.on('update', updateOutput)
//     updateOutput()

//     return () => {
//       editor.off('update', updateOutput)
//     }
//   }, [editor])

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow-md">
//       <MenuBar editor={editor} />
//       <EditorContent editor={editor} />
//       {/* {output && <TiptapOutput html={output} />} */}
//     </div>
//   )
// }

// export default TiptapEditor




// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// Date : 14-06-2025



// import React, { useState, useEffect, useRef, forwardRef } from 'react'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import TextStyle from '@tiptap/extension-text-style'
// import Color from '@tiptap/extension-color'
// import ListItem from '@tiptap/extension-list-item'
// import Image from '@tiptap/extension-image'
// import './TiptapEditor.css'
// import {
//   Bold,
//   Italic,
//   Strikethrough,
//   List,
//   ListOrdered,
//   Quote,
//   Minus,
//   Redo2,
//   Undo2,
//   Code2,
//   Upload,
//   ImageDown,
// } from 'lucide-react'
// import { uploadFiles } from '../../Services/uploaderApi'

// const MenuBar = ({ editor }) => {
//   const [showHeadings, setShowHeadings] = useState(false)
//   const dropdownRef = useRef(null)
//   const fileInputRef = useRef(null)

//   if (!editor) return null

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowHeadings(false)
//       }
//     }

//     if (showHeadings) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [showHeadings])

//   const activeHeadingLevel = [1, 2, 3, 4, 5, 6].find((level) =>
//     editor.isActive('heading', { level })
//   )
//   const isParagraphActive = editor.isActive('paragraph')
//   const headingLabel = activeHeadingLevel
//     ? `H${activeHeadingLevel}`
//     : isParagraphActive
//     ? 'Para'
//     : 'Heading'

//   const formatButton = (icon, action, isActive, disabled = false) => (
//     <button
//       onClick={action}
//       disabled={disabled}
//       type="button"
//       className={`p-2 rounded border border-gray-300 flex items-center justify-center
//         hover:bg-white/20 hover:text-white transition
//         ${
//           isActive
//             ? 'bg-white/20 text-white font-semibold'
//             : 'bg-transparent text-white'
//         }`}
//     >
//       {icon}
//     </button>
//   )

//   const handleToggleCodeBlock = () => {
//     if (!editor) return
//     const { state, view } = editor
//     const { $from } = state.selection
//     const isInCodeBlock = editor.isActive('codeBlock')

//     if (isInCodeBlock) {
//       editor
//         .chain()
//         .focus()
//         .command(({ tr }) => {
//           const endPos = $from.end($from.depth)
//           tr.insert(endPos, state.schema.nodes.paragraph.create())
//           tr.setSelection(
//             state.selection.constructor.near(tr.doc.resolve(endPos + 1))
//           )
//           view.dispatch(tr)
//           return true
//         })
//         .run()
//     } else {
//       editor.chain().focus().toggleCodeBlock().run()
//     }
//   }

//   const uploadImage = async (file) => {
//     if (!file) return

//     try {
//       const imageUrl = await uploadFiles(file)
//       if (imageUrl) {
//         editor.chain().focus().setImage({ src: imageUrl }).run()
//       }
//     } catch (error) {
//       console.error('Image upload failed:', error)
//       alert('Failed to upload image')
//     }
//   }

//   const uploadDoc = async (file) => {
//     if (!file) return
//     try {
//       const docUrl = await uploadFiles(file)
//       if (docUrl) {
//         editor.chain().focus().setImage({ src: docUrl }).run()
//       }
//     } catch (error) {
//       console.error('Doc upload failed:', error)
//       toast.error('upload doc failed')
//     }
//   }

//   const handleAttachmentsChange = async (e) => {
//     const files = Array.from(e.target.files)
//     const totalSize = files.reduce((acc, file) => acc + file.size, 0)

//     if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
//       alert(`Total file size must not exceed ${MAX_TOTAL_SIZE_MB} MB.`)
//       return
//     }

//     try {
//       const uploadedFiles = []
//       for (const file of files) {
//         const fileUrl = await uploadFiles(file)

//         if (fileUrl) {
//           uploadedFiles.push({ name: file.name, url: fileUrl })
//           toast.success('file uploaded successfully')
//         }
//       }

//       setAttachments((prev) => [...prev, ...uploadedFiles])
//     } catch (error) {
//       console.error('File upload failed:', error)
//       alert('One or more files failed to upload.')
//     }
//   }

//   return (
//     <div className="flex flex-wrap gap-2 p-2 border rounded-md border-gray-300 bg-black w-full mb-4">
//       {formatButton(
//         <Bold size={18} />,
//         () => editor.chain().focus().toggleBold().run(),
//         editor.isActive('bold')
//       )}
//       {formatButton(
//         <Italic size={18} />,
//         () => editor.chain().focus().toggleItalic().run(),
//         editor.isActive('italic')
//       )}
//       {formatButton(
//         <Strikethrough size={18} />,
//         () => editor.chain().focus().toggleStrike().run(),
//         editor.isActive('strike')
//       )}
//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setShowHeadings(!showHeadings)}
//           className={`p-2 rounded border border-gray-300 flex items-center justify-center transition cursor-pointer
//             ${
//               activeHeadingLevel || isParagraphActive
//                 ? 'bg-white/20 text-white font-semibold'
//                 : 'bg-transparent text-white hover:bg-white/20 hover:text-white'
//             }`}
//           type="button"
//         >
//           {headingLabel}
//         </button>
//         {showHeadings && (
//           <div className="absolute z-10 bg-black border border-gray-300 rounded shadow-md mt-1 w-40 cupo">
//             {[1, 2, 3, 4, 5, 6].map((level) => (
//               <button
//                 key={level}
//                 onClick={() => {
//                   editor.chain().focus().toggleHeading({ level }).run()
//                   setShowHeadings(false)
//                 }}
//                 className={`block w-full px-4 py-2 text-left text-sm transition
//                   hover:bg-white/20 hover:text-white
//                   ${
//                     editor.isActive('heading', { level })
//                       ? 'bg-white/20 font-semibold text-white'
//                       : 'text-gray-200'
//                   }`}
//               >
//                 H{level}
//               </button>
//             ))}
//             <button
//               onClick={() => {
//                 editor.chain().focus().setParagraph().run()
//                 setShowHeadings(false)
//               }}
//               className={`block w-full px-4 py-2 text-left text-sm transition
//                 hover:bg-white/20 hover:text-white
//                 ${
//                   isParagraphActive
//                     ? 'bg-white/20 font-semibold text-white'
//                     : 'text-gray-200'
//                 }`}
//             >
//               Paragraph
//             </button>
//           </div>
//         )}
//       </div>
//       {formatButton(
//         <List size={18} />,
//         () => editor.chain().focus().toggleBulletList().run(),
//         editor.isActive('bulletList')
//       )}
//       {formatButton(
//         <ListOrdered size={18} />,
//         () => editor.chain().focus().toggleOrderedList().run(),
//         editor.isActive('orderedList')
//       )}
//       {formatButton(
//         <Code2 size={18} />,
//         handleToggleCodeBlock,
//         editor.isActive('codeBlock')
//       )}
//       {formatButton(
//         <Quote size={18} />,
//         () => editor.chain().focus().toggleBlockquote().run(),
//         editor.isActive('blockquote')
//       )}
//       {formatButton(
//         <Minus size={18} />,
//         () => editor.chain().focus().setHorizontalRule().run(),
//         false
//       )}
//       {formatButton(
//         <Undo2 size={18} />,
//         () => editor.chain().focus().undo().run(),
//         false,
//         !editor.can().undo()
//       )}
//       {formatButton(
//         <Redo2 size={18} />,
//         () => editor.chain().focus().redo().run(),
//         false,
//         !editor.can().redo()
//       )}
//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         className="p-2 rounded border border-gray-300 flex items-center justify-center text-white"
//       >
//         <ImageDown size={18} />
//       </button>
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           const file = e.target.files?.[0]
//           uploadImage(file)
//           e.target.value = null
//         }}
//       />
//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         className="p-2 rounded border border-gray-300 flex items-center justify-center text-white"
//       >
//         <Upload size={18} />
//       </button>
//       <input
//         type="file"
//         accept="file/*"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           const file = e.target.files?.[0]
//           uploadDoc(file)
//           e.target.value = null
//         }}
//       />
//     </div>
//   )
// }

// const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: { keepMarks: true, keepAttributes: false },
//     orderedList: { keepMarks: true, keepAttributes: false },
//   }),
//   Image,
// ]

// const TiptapEditor = forwardRef(({ onUpdate, setReportPOC }, ref) => {
//   const editor = useEditor({
//     extensions,
//     content: '',
//     editorProps: {
//       attributes: {
//         class:
//           'ProseMirror h-[200px] w-[40vw] overflow-y-auto border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black',
//       },
//     },
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML()
//       if (typeof onUpdate === 'function') {
//         onUpdate(html) // Call onUpdate if it’s a function
//       }
//       if (typeof setReportPOC === 'function') {
//         setReportPOC(html) // Support setReportPOC for backward compatibility
//       }
//     },
//   })

//   // Expose the editor instance via ref
//   useEffect(() => {
//     if (editor && ref) {
//       ref.current = { editor }
//     }
//   }, [editor, ref])

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow-md">
//       <MenuBar editor={editor} />
//       <EditorContent editor={editor} />
//     </div>
//   )
// })

// export default TiptapEditor
