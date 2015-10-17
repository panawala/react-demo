import React from 'react'
import NavLink from './base/NavLink.js'
import NavIndexLink from './base/NavIndexLink.js'

require('./../static/css/app.less');

class GlobalNav extends React.Component {

  static defaultProps = {
    user: {
      id: 1,
      name: 'Ryan Florence'
    }
  };

  constructor(props, context) {
    super(props, context);
    this.state = {current: 'mail'};
  }

  render() {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Bootstrap theme</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <NavIndexLink to="/" activeClassName="active">Home</NavIndexLink>
                    <NavLink to="/custom_form" activeClassName="active">Custom Form</NavLink>
                    <NavLink to="/newform" activeClassName="active">NewForm</NavLink>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <NavLink to="/messages" activeClassName="active">Messages</NavLink>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" className="divider"></li>
                            <li className="dropdown-header">Nav header</li>
                            <li><a href="#">Separated Link</a></li>
                            <li><a href="#">One more separated Link</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
       </nav>
    );

  }
}

export default GlobalNav
