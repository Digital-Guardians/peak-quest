import { useCallback, useRef, SetStateAction } from "react";
// 에디터 라이브러리
import { Editor } from "@toast-ui/react-editor";
// 글자 색 관련 플러그인
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
// 툴바 커스텀
import "./CourseEditor.css";
import { uploadImage } from "../../../service/imageUploader";

interface CourseEditorProp {
  setCourseEditorText: React.Dispatch<React.SetStateAction<string>>;
  editorImage: string;
  setEditorImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function CourseEditor({
  setCourseEditorText,
  editorImage,
  setEditorImage,
}: CourseEditorProp) {
  const editorRef = useRef<Editor | null>(null);

  // 툴바 항목
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ];

  // 사용자가 에디터에 쓴 모든 컨텐츠를 html로 변환한 후, setCourseEditorText에 담기
  const onChange = useCallback(() => {
    const editorIns = editorRef.current?.getInstance();
    if (editorIns) {
      const contentHtml = editorIns.getHTML();
      setCourseEditorText(contentHtml);
    }
  }, [setCourseEditorText]);

  // 이미지를 서버에 업도르
  const uploadImageToServer = useCallback(
    (blob: Blob, callback: (url: string, altText?: string) => void) => {
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditorImage(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } else {
        setEditorImage("");
      }

      // 에디터 이미지 미리보기
      const imageUrl = window.URL.createObjectURL(blob);
      // altText
      const fileName = blob.name;

      callback(imageUrl, fileName);

      // 서버에 이미지 전송하기
      uploadImage(blob);
    },
    []
  );

  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">코스 상세 설명</h1>
      <Editor
        ref={editorRef}
        placeholder="위험한 지역이나 잘못된 정보는 무통보로 삭제 및 비공개 처리 될 수 있습니다."
        initialEditType="wysiwyg" // 편집기 유형
        hideModeSwitch={true} // 탭 표시줄 숨기기
        toolbarItems={toolbarItems} // 툴바
        plugins={[colorSyntax]} // 글자 색
        useCommandShortcut={true} // 키보드 단축키 허용
        onChange={onChange} // 사용자가 에디터에 쓴 컨텐츠 담기
        hooks={{
          addImageBlobHook: uploadImageToServer,
        }} // 이미지 파일을 서버에 업로드
      />
    </div>
  );
}
