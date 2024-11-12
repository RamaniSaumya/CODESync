import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Action';

const Editor = ({ socketRef, roomId ,onCodeChange}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'hopscotch',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code)
        if (origin !== 'setValue' && socketRef.current) {
          console.log("kaam kare chhe ")
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, [roomId, socketRef]);


  useEffect(()=>{

      if (socketRef.current) {
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
          console.log('receiving', code)
          if (code !== null) {
            editorRef.current.setValue(code);
          }
        });
      }
    
   if(socketRef.current) {  return ()=>{
        socketRef.current.off(ACTIONS.CODE_CHANGE)
      }}
  },[socketRef.current]);

  return (
    <textarea id='realtimeEditor'></textarea>
  );
};

export default Editor;
