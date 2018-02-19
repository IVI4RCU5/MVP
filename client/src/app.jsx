import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Inbox from './components/Inbox.jsx';
import Textbox from './components/Textbox.jsx';
import Friends from './components/Friends.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      messages: [],
      input: 'Type in your username'
    }
  }

  componentDidMount() {
    axios.get('/messages', {
      params: {
        user: this.state.user
      }
    })
    .then((response) => {
      this.setState({
        messages: response
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  login(event) {
    event.preventDefault()
    axios.post('/users', this.state.input)
    .then((response) => {
      this.setState({
        user: this.state.input
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  viewMessage(message) {
    setTimeout((message) => {
      axios.delete('/messages', {
        params: {
          user: this.state.user,
          message: message
        }
      })
      .then((response) => {
        this.setState({
          messages: this.state.messages.filter((item) => {
            return item.content !== message.content
          })
        })
      })
      .catch((error) => {
        console.error('error')
      })
    }, 10000)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <form>
            <input type="text" value={this.state.input} onChange={((event) => this.setState({input: event.target.value}))}/>
            <input type="submit" value="Send" onClick={this.login.bind(this)}/>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <Inbox messages={this.state.inbox} view={this.viewMessage.bind(this)}/>
          <Textbox author={this.state.user}/>
          <Friends user={this.state.user}/>
          <button type="button" onClick={((event) => this.setState({user: null}))}>Log Out</button>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));