import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./NavBar.css"

export default function NavBar() {
  return (
    <ul className='navbar'>
      <li><Link className='linkInNavigationBar' to="/">Home </Link> </li>
      <li><Link className='linkInNavigationBar' to="/breakdown">Breakdown </Link></li>
      <li><Link className='linkInNavigationBar' to="/operations">Operations </Link></li>
    </ul>
  )
}
