import React from 'react'

var Inbox = (props) => {
  <div>
    {props.messages.map((message) => {
      <div>
        <h6 onClick={props.view}>Message from {message.author}</h6>
        <p class="message" display="none">{message.content}</p>
      </div>
    })}
  </div>
}

export default Inbox