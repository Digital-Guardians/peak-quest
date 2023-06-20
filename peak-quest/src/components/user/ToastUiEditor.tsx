import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";

const WysiwygEditor = () => {
  const editorRef = useRef<Editor | null>(null);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ];

  const showContent = () => {
    const editorIns = editorRef.current?.getInstance();
    if (editorIns) {
      const contentHtml = editorIns.getHTML();
      const contentMark = editorIns.getMarkdown();
      console.log(contentHtml);
      console.log(contentMark);
    }
  };

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue="위험한 지역이나 잘못된 정보는
        무통보로 삭제 및 비공개 처리 될 수 있습니다." // 글 수정 시 사용
        initialEditType="wysiwyg" // wysiwyg & markdown
        // hideModeSwitch={true}
        // height="500px"
        // theme="" // '' & 'dark'
        // usageStatistics={false}
        toolbarItems={toolbarItems}
        plugins={[colorSyntax]}
      />
      <button
        onClick={showContent}
        className="w-full rounded-md bg-green my-2 py-2 text-white"
      >
        코스 등록하기
      </button>
    </>
  );
};

export default WysiwygEditor;
