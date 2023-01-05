import Editor, { OnChange } from "@monaco-editor/react";

interface Props {
  code: string;
  height: string;
  width: string;
  changeCode?: (newCode: string) => void;
}

const CodeEditor: React.FC<Props> = ({ code, height, width, changeCode }) => {
  const onChangeCode: OnChange | undefined = changeCode
    ? (newCode: string | undefined) => changeCode(newCode ?? "")
    : undefined;

  return (
    <div className="flex justify-center">
      <Editor
        height={height}
        width={width}
        language="javascript"
        value={code}
        theme="vs-dark"
        onChange={onChangeCode}
        options={{
          fontSize: "25px",
          minimap: { renderCharacters: false },
          scrollBeyondLastLine: false,
          readOnly: !changeCode,
        }}
      />
    </div>
  );
};

export default CodeEditor;
