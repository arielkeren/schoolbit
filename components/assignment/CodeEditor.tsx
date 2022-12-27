import { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";

interface Props {
  code: string;
  changeCode: (newCode: string) => void;
}

const CodeEditor: React.FC<Props> = ({ code, changeCode }) => {
  const onChangeCode: OnChange = (newCode: string | undefined) =>
    changeCode(newCode ?? "");

  return (
    <div
      className="flex justify-center"
      style={{ height: "calc(100vh - 136px - 92px)" }}
    >
      <Editor
        height="80%"
        width="80%"
        language="javascript"
        value={code}
        theme="vs-dark"
        onChange={onChangeCode}
        options={{
          fontSize: "25px",
          minimap: { renderCharacters: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
