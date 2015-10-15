import React from 'react'
import Dashboard from './Dashboard'
import GlobalNav from './GlobalNav'

class App extends React.Component {
  render() {
    return (
      <div>
        <GlobalNav />
        <div className="container">
          {this.props.children || <Dashboard />}
        </div>
      </div>
    )
  }
}

export default App
