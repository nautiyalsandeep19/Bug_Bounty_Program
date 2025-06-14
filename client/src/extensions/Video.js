import { Node, mergeAttributes } from '@tiptap/core'

const Video = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      class: { default: 'w-full max-h-64' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes), ['source', { src: HTMLAttributes.src, type: 'video/mp4' }]]
  },
})
export default Video
