import React from 'react'
import "./Signin.css"

function Signin(props) {
    return (props.trigger) ? (
        <div className="signin">
            <div className="signin-inner">
                <button className="close-btn" onClick={() => props.setTrigger(true)}>close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Signin