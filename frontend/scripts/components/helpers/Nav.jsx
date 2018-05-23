import React from 'react'
import NavLink from './NavLink'


const Nav = ({links}) => (
    <ul className="nav">
        {links.map((link, index) => (
            <li className="nav-item" key={index}>
                <NavLink className="nav-link" to={link.href}>{link.text}</NavLink>
            </li>
        ))}
    </ul>
);


export default Nav
