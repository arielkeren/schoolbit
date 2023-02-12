import Editor, { OnChange } from "@monaco-editor/react";
import { ChangeEvent, useState } from "react";
import ProgrammingLanguagePicker from "./ProgrammingLanguagePicker";

interface Props {
  code: string;
  language: string;
  changeLanguage: (event: ChangeEvent<HTMLSelectElement>) => void;
  height: string;
  width: string;
  changeCode?: (newCode: string) => void;
  isLanguageLocked?: boolean;
}

const CodeEditor: React.FC<Props> = ({
  code,
  language,
  changeLanguage,
  height,
  width,
  changeCode,
  isLanguageLocked,
}) => {
  const onChangeCode: OnChange | undefined = changeCode
    ? (newCode: string | undefined) => changeCode(newCode ?? "")
    : undefined;

  return (
    <div>
      <ProgrammingLanguagePicker
        languageID={language}
        changeLanguage={isLanguageLocked ? undefined : changeLanguage}
      />

      <Editor
        height={`calc(${height} - 25px)`}
        width={width}
        language={language}
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
