import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/material.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import ACTIONS from "../Action";

const Editor = ({ socketRef, roomId, theme, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror editor
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: theme || "3024-night", // Default theme if not provided
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    // Listen for changes in the editor
    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code); // Notify parent component of the code change
      if (origin !== "setValue" && socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Cleanup CodeMirror instance
      }
    };
  }, [roomId, socketRef, onCodeChange]);

  useEffect(() => {
    // Update the theme dynamically when the theme prop changes
    if (editorRef.current) {
      editorRef.current.setOption("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    // Listen for code changes from the server
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null && editorRef.current) {
          editorRef.current.setValue(code);
        }
      });

      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE); // Cleanup the listener
      };
    }
  }, [socketRef]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
