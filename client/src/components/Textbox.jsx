import React from 'react';

class Textbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.author,
      input: 'Type a message here!'
    }
  }

  send(message) {
    axios.post('/messages', {
      author: this.state.author, 
      content: message
    })
    .then((response) => {
      console.log('Message Sent')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    return (
      <form>
        <input type="text" value={this.state.input} onChange={(event) => this.setState({input: event.target.value})}/>
        <input type="submit" value="Send" onClick={this.send(this.state.input)}/>
      </form>
    )
  }
}

export default Textbox