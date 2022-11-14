import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Transaction(props) {
  return (
    <div>
    <span className='amount'>{props.transaction.amount} </span>
    <span className='category'>{props.transaction.category} </span>
    <span className='vendor'>{props.transaction.vendor} </span>
    <button className='deleteButton'>Delete </button>
    </div>
  )
}
