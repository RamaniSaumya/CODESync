import React, { useEffect, useRef, useCallback } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Action';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror editor
    editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
      mode: { name: 'javascript', json: true },
      theme: 'hopscotch',
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    const editor = editorRef.current;

    // Listen for editor changes
    editor.on('change', (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code); // Call the provided onCodeChange function

      // Emit code change to socket
      if (origin !== 'setValue' && socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });

    // Cleanup on unmount
    return () => {
      if (editor) {
        editor.toTextArea();
      }
    };
  }, [roomId, onCodeChange, socketRef]);

  useEffect(() => {
    const handleCodeChange = ({ code }) => {
      if (code !== null && editorRef.current) {
        editorRef.current.setValue(code);
      }
    };

    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    }

    // Cleanup event listener on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      }
    };
  }, [socketRef]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
