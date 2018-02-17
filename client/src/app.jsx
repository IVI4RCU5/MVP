import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
      this.setState({messages: response})
    })
    .catch((error) => {
      console.error(error)
    })
  }

  login() {
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
    setTimeout(() => {
      axios.delete('/messages', {
        params: {
          user: this.state.user,
          message: ''
        }
      })
      .then((response) => {
        console.log('Goodbye!')
      })
      .catch((error) => {
        console.error('error')
      }), 
    }, 10000)
  }

  render() {
    if (user === null) {
      return (
        <div>
          <form>
            <input type="text" value={this.state.input} onChange={(event) => this.setState({input: event.target.value})}/>
            <input type="submit" value="Send" onClick={this.login)}/>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <Inbox messages={this.state.inbox} view={this.viewMessage.bind(this)}/>
          <Textbox author={this.state.user}/>
          <Friends user={this.state.user}/>
          <button type="button" onClick={this.setState({user: null})}>Log Out</button>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));