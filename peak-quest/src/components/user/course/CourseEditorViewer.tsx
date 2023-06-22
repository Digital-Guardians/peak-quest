import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

interface CourseEditorViewer {
  contents: string; // 임시
}

export default function CourseEditorViewer({ contents }: CourseEditorViewer) {
  return <Viewer initialValue={contents || ""} />;
}
