import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = () => {
  const [content, setContent] = useState('')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Rich Text Editor</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ height: '300px', marginBottom: '50px' }}
      />
    </div>
  )
}

export default Editor
