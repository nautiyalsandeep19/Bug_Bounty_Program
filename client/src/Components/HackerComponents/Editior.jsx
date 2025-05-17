import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = () => {
  const [content, setContent] = useState('')

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write Your Blog Post</h1>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="bg-white rounded shadow"
      />
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-2">Live Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export default RichTextEditor
