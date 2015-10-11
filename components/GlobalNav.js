import React from 'react'
import { Link } from 'react-router'

require('./app.less');

class GlobalNav extends React.Component {

  static defaultProps = {
    user: {
      id: 1,
      name: 'Ryan Florence'
    }
  };

  constructor(props, context) {
    super(props, context);
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    alert('log out')
  }

  render() {
    var { user } = this.props;
    return (
      <div className="wrapper">
        <div style={{ float: 'left' }}>
          <Link to="/" className="link">Home</Link>{' '}
          <Link to="/calendar" className="link" activeClassName="activeLink">Calendar</Link>{' '}
          <Link to="/grades" className="link" activeClassName="activeLink">Grades</Link>{' '}
          <Link to="/messages" className="link" activeClassName="activeLink">Messages</Link>{' '}
        </div>
        <div style={{ float: 'right' }}>
          <Link className="link" to="/profile">{user.name}</Link>
            <button onClick={this.logOut}>log out</button>
        </div>
      </div>
    )
  }
}

export default GlobalNav
