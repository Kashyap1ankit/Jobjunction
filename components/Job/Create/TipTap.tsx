"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import HorizonatlRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import {
  Highlighter,
  LucideHeading1,
  LucideRuler,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatUnderlined,
} from "react-icons/md";

import { IoCodeSlash } from "react-icons/io5";
import { useEffect } from "react";

const limit = 5000;

const Tiptap = ({ className, name, setValue, edit, content }: any) => {
  const editor = useEditor({
    editable: edit,
    editorProps: {
      attributes: {
        class: "outline-none mt-4 min-h-44",
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: "list-disc p-2",
        },
      }),
      ListItem,
      Heading.configure({
        levels: [1, 2, 3, 4],
        HTMLAttributes: {
          class: "text-2xl",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-black text-gray-500",
        },
      }),
      HorizonatlRule.configure({
        HTMLAttributes: {
          class: "border-t-2 border-slate-300",
        },
      }),
      Bold,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-lime-300",
        },
      }),
      Italic,
      Underline,
      Strike,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      CharacterCount.configure({
        limit,
      }),
      History,
    ],
    autofocus: true,
    onUpdate: ({ editor }) => {
      if (editor) {
        const value = editor.getHTML();
        setValue(name, value, { shouldValidate: true });
      }
    },
    content: content,
  });

  //setting the default color to white

  useEffect(() => {
    editor?.commands.setColor("#ffffff");
  }, [editor]);

  if (!editor) return null;

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  function handleColor(e: any) {
    editor?.commands.setColor(e.target.value);
  }

  return (
    <div className={className}>
      {edit ? (
        <div className="flex gap-8 mt-2  pb-2 overflow-x-scroll no-scrollbar items-center relative sticky top-0 left-0 px-4 z-50 bg-inputBg">
          <div
            onClick={() =>
              editor.commands.toggleHeading({
                level: 2,
              })
            }
          >
            <LucideHeading1
              className={`text-gray-500 cursor-pointer  ${
                editor.isActive("heading") ? "text-white font-bold" : ""
              }`}
            />
          </div>
          <div onClick={() => editor.commands.toggleBulletList()}>
            <MdFormatListBulleted
              className={`text-gray-500 cursor-pointer  ${
                editor.isActive("bulletList") ? "text-white font-bold" : ""
              }`}
            />
          </div>

          <div onClick={() => editor.commands.toggleCodeBlock()}>
            <IoCodeSlash
              className={`text-gray-500 cursor-pointer  ${
                editor.isActive("codeBlock") ? "text-white font-bold" : ""
              }`}
            />
          </div>

          <div onClick={() => editor.commands.setHorizontalRule()}>
            <LucideRuler
              className={`size-4 text-gray-500 cursor-pointer  ${
                editor.isActive("horizontalRule") ? "text-white font-bold" : ""
              }`}
            />
          </div>

          <div onClick={() => editor.commands.toggleBold()}>
            <MdFormatBold
              className={`text-gray-500 cursor-pointer  ${
                editor.isActive("bold") ? "text-white font-bold" : ""
              }`}
            />
          </div>
          <div onClick={() => editor.commands.toggleItalic()}>
            <MdFormatItalic
              className={`text-gray-500 cursor-pointer  ${
                editor.isActive("italic") ? "text-white font-bold" : ""
              }`}
            />
          </div>
          <div onClick={() => editor.commands.toggleUnderline()}>
            <MdFormatUnderlined
              className={`text-gray-500 cursor-pointer  ${
                editor.isActive("underline") ? "text-white font-bold" : ""
              }`}
            />
          </div>
          <div onClick={() => editor.commands.toggleHighlight()}>
            <Highlighter
              className={`size-4 text-gray-500 cursor-pointer  ${
                editor.isActive("highlight") ? "text-white font-bold" : ""
              }`}
            />
          </div>

          <div onClick={() => editor.commands.toggleStrike()}>
            <Strikethrough
              className={`size-4 text-gray-500 cursor-pointer  ${
                editor.isActive("strike") ? "text-white font-bold" : ""
              }`}
            />
          </div>

          <div>
            <input
              type="color"
              className="w-6 h-6 bg-transparent rounded-full border-none outline-none cursor-pointer"
              defaultValue={"#ffffff"}
              onChange={(e) => handleColor(e)}
            />
          </div>
          <div onClick={() => editor.commands.undo()}>
            <Undo
              className={`size-4 text-gray-500 cursor-pointer  ${
                editor.isActive("undo") ? "text-white font-bold" : ""
              }`}
            />
          </div>
          <div onClick={() => editor.commands.redo()}>
            <Redo
              className={`size-4 text-gray-500 cursor-pointer  ${
                editor.isActive("redo") ? "text-white font-bold" : ""
              }`}
            />
          </div>
        </div>
      ) : null}

      <EditorContent editor={editor} />

      {edit ? (
        <div
          className={`character-count mt-8 text-white flex gap-2 items-center ${
            editor.storage.characterCount.characters() === limit
              ? "character-count--warning"
              : ""
          }`}
        >
          <svg height="20" width="20" viewBox="0 0 20 20">
            <circle r="10" cx="10" cy="10" fill="gray" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="red"
              stroke="red"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>
          {editor.storage.characterCount.characters()} / {limit} characters
        </div>
      ) : null}
    </div>
  );
};

export default Tiptap;
