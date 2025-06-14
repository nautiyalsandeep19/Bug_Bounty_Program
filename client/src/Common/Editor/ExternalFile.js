import { Node } from "@tiptap/core";

const ExternalFile = Node.create({
  name: "externalFile",
  group: "block",
  atom: true,
  selectable: true,
  inline: false,

  addAttributes() {
    return {
      href: {
        default: null,
      },
      filename: {
        default: "Download",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "a[data-file]",
        getAttrs: (el) => {
          return {
            href: el.getAttribute("href"),
            filename: el.getAttribute("data-file") || "Download",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { href, filename } = HTMLAttributes;

    return [
      "a",
      {
        href: href || "#",
        target: "_blank", 
        rel: "noopener noreferrer",
      },
      ["span", { class: "text-lg" }, "📎"],
      ["span", {}, filename || "Download"],
    ];
  },
});

export default ExternalFile;
