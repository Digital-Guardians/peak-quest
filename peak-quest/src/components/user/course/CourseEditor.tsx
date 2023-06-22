import { useCallback, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "./CourseEditor.css";

interface CourseEditorProp {
  setCourseEditorText: React.Dispatch<React.SetStateAction<string>>;
}

export default function CourseEditor({
  setCourseEditorText,
}: CourseEditorProp) {
  const editorRef = useRef<Editor | null>(null);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ];

  const onChange = useCallback(() => {
    const editorIns = editorRef.current?.getInstance();
    if (editorIns) {
      const contentHtml = editorIns.getHTML();
      setCourseEditorText(contentHtml);
    }
  }, [setCourseEditorText]);

  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">코스 상세 설명</h1>
      <Editor
        ref={editorRef}
        placeholder="위험한 지역이나 잘못된 정보는 무통보로 삭제 및 비공개 처리 될 수 있습니다."
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        toolbarItems={toolbarItems}
        plugins={[colorSyntax]}
        useCommandShortcut={true}
        onChange={onChange}
      />
    </div>
  );
}
