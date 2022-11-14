import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./Balance.css"

export default function Balance(props) {
  return (
    <div className='balance'>Balance: {props.balance} $</div>
  )
}
