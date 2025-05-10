import { useEffect, useState } from "react";
import Like from "./Like";
import Dislike from "./Dislike";

const Feedback = ({msg,handleFeedback}) => {
    const [feedback, setFeedback] = useState("")
    console.log('feeback', feedback);
    
    const onFeedback = (id, content) => {
        handleFeedback(id, content);
        setFeedback(content);
    }

    useEffect (() => {
        setFeedback(msg?.feedback);
    },[])
    return (
        <>
            {msg.role === 'bot' && !feedback && (
                <div className="flex">
                    <Like  onFeedback={onFeedback} id={msg._id} isFeedback={false}/>
                    <Dislike  onFeedback={onFeedback} id={msg._id} isFeedback={false}/>
                </div>
            )}
            {msg.role === 'bot' && feedback ==='good' && (
                <div className='' title="good">
                 <Like isFeedback={true}  />
                </div>
            )}
            {msg.role === 'bot' && feedback ==='bad' && (
                <div className='' title="bad">
                    <Dislike isFeedback={true}/>
                </div>
            )}
        </>
    )
}

export default Feedback;