// Planned Features:

// User logs in
  // GET request is sent to server 
  // Server queries database for all the user's new messages
  // messages are displayed in user's inbox
// User enters a friend's username into the search bar
  // POST request is sent to server
  // server queries database to see if a user with that name exists
    // if so, that user is added as a friend of the user
// User posts a message
  // POST request is sent to server 
  // server queries database for all that user's friends
  // message is saved in the inbox of all that user's friends
// User opens a message in their inbox
  // message is displayed
  // countdown is triggered
    // message deletes itself from database after countdown expires
    // inbox is re-rendered