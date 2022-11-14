import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./NavBar.css"

export default function NavBar() {
  return (
    <div className='navbar'>
      <Link className='linkInNavigationBar' to="/">Home </Link>
      <Link className='linkInNavigationBar' to="/breakdown">Breakdown </Link>
      <Link className='linkInNavigationBar' to="/transactionform">Add Transaction </Link>
    </div>
  )
}
