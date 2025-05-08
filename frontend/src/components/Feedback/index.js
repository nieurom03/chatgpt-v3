import { useEffect, useState } from "react";
import Like from "./Like";
import Dislike from "./Dislike";

const Feedback = ({msg,handleFeedback}) => {
    const [feedback, setFeedback] = useState("")
    
    const onFeedback = (id, feedback) => {
        handleFeedback(id, feedback);
        setFeedback(feedback);
    }

    useEffect (() => {
        setFeedback(msg?.feedback);
    },[])
    return (
        <>
        {msg.role === 'bot' && !feedback && (
            <div className="flex">
                
                 <Like  onFeedback={onFeedback} id={msg._id} />
                 <Dislike  onFeedback={onFeedback} id={msg._id} />
                 
            </div>
            )}
            {feedback ==='good' && (
                <div className='' title="good">
                 <Like  />
                </div>
            )}
            {feedback ==='bad' && (
                <div className='' title="bad">
                    <Dislike />
            </div>
        )}
        </>
    )
}

export default Feedback;