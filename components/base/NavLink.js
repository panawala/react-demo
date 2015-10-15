import React from 'react'
import { Link, History } from 'react-router'

const NavLink = React.createClass({
    mixins: [ History ],
    render() {
        let isActive = this.history.isActive(this.props.to, this.props.query);
        let className = isActive ? 'active' : '';
        return <li className={className}><Link {...this.props}/></li>;
    }
});

export default NavLink;
