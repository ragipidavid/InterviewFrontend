import React from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode }) => {
  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="h-[400px] w-full border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
