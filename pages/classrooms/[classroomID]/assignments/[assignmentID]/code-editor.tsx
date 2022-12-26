import { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";

const CodeEditorPage: React.FC = () => {
  const [code, setCode] = useState("");

  const changeCode: OnChange = (newCode: string | undefined) =>
    setCode(newCode ?? "");

  return (
    <div style={{ height: "calc(100vh - 136px)" }}>
      <Editor
        height="100%"
        width="100vw"
        language="javascript"
        value={code}
        theme="vs-dark"
        onChange={changeCode}
        options={{
          fontSize: "25px",
          minimap: { renderCharacters: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditorPage;
