import React from 'react'

var Inbox = (props) => {
  <div>
    {props.messages.map((message) => {
      <div>
        <h6 onClick={props.view(message)}>Message from {message.author}</h6>
        <p>{message.content}</p>
      </div>
    }, i)}
  </div>
}

export default Inbox