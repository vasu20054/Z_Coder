import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function EditorPage() {
  const [code, setCode] = useState("print('Hello, ZCoder!')");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Running...");

    const ws = new WebSocket("https://executor-q8ke.onrender.com/ws");

    ws.onopen = () => {
      ws.send(code);
    };

    ws.onmessage = (event) => {
      setOutput(event.data);
      setIsRunning(false);
      ws.close();
    };

    ws.onerror = () => {
      setOutput("WebSocket connection error.");
      setIsRunning(false);
    };
  };

  return (
    <div style={styles.container}>
      <div style={styles.editorCard}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>ZCoder Editor</h2>
          <button
            style={{
              ...styles.runButton,
              backgroundColor: isRunning ? "#555" : "#007acc",
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>

        <Editor
          height="400px"
          defaultLanguage="python"
          defaultValue={code}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: "on",
            wordWrap: "on",
          }}
        />

        <div style={styles.outputCard}>
          <div style={styles.outputHeader}>Output</div>
          <pre style={styles.outputText}>{output}</pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Fira Code', monospace",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  editorCard: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#252526",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  headerText: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#dcdcaa",
  },
  runButton: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "1rem",
  },
  outputCard: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "4px",
    padding: "1rem",
    marginTop: "1.5rem",
  },
  outputHeader: {
    fontSize: "1rem",
    color: "#4ec9b0",
    marginBottom: "0.5rem",
  },
  outputText: {
    whiteSpace: "pre-wrap",
    fontFamily: "'Fira Code', monospace",
    fontSize: "14px",
  },
};
