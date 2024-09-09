import React from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode }) => {
  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-gray-800">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-white">
        <span className="font-semibold">Code Editor</span>
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Run Code
        </button>
      </div>
      <div className="h-[400px] w-full">
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
            padding: { top: 16 }, // This adds padding above the first line
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
