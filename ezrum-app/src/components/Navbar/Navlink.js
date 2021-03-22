import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navlink.css'

const Navlink = ({ children, path, onClick }) => {
  return (
    <NavLink exact to={path}
      onClick={onClick}
      activeClassName={'nav-link-active'}
    >
      {children}
    </NavLink>
  )
}

export default Navlink