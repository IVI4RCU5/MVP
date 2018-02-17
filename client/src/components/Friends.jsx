import React from ('react')

class Friends extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      friends: [],
      input: 'Type a friend\'s name here!'
    }
  }

  componentDidMount() {
    axios.get('/friends', {
      params: {
        user: this.state.user
      }
    }).then((response) => {
      this.setState({friends: response})
    }).catch((error) => {
      console.error(error)
    })
  }

  add(friend) {
    axios.post('/friends', {
      user: this.state.user, 
      friend: this.state.input
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.friends.map((friend) => {
            <li>{friend.username}</li>
          })}
        </ul>
        <form>
          <input type="text" value={this.state.userInput} onChange={(event) => this.setState({userInput: event.target.value})}/>
          <input type="submit" value="Add as Friend" onClick={this.add(this.state.input)}/>
        </form>
      </div>
    )
  }
}

export default Friends