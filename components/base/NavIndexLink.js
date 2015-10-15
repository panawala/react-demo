import React from 'react'
import { IndexLink, History } from 'react-router'

const NavIndexLink = React.createClass({
    mixins: [ History ],
    render() {
        let isActive = this.history.isActive(this.props.to, this.props.query, true);
        let className = isActive ? 'active': '';
        return <li className={className}><IndexLink {...this.props}/></li>;
    }
});

export default NavIndexLink;
