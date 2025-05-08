import React,{useRef, useEffect} from 'react';
// import ReactMarkdown from 'react-markdown'

function Message({ key, sender, text }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);
  return (
    <div key={key} className={`p-4 ${sender=='user' ? 'text-right': 'text-left'}`} >
       <strong>{sender === 'user' ? 
     'Bạn'
    : 
    '🧠'
      }</strong>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      <div ref={bottomRef} />
    </div>
  );
}

export default Message;
