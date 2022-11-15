import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./Transaction.css"

export default function Transaction(props) {
  const deleteTransaction=()=>{
    props.deleteTransaction(props.transaction.id, props.transaction.amount)
  }
  return (
    <div className={props.transaction.amount>0? "positive-transaction": "negative-transaction"}>
    <span className="font-effect-shadow-multiple">{props.transaction.amount} $</span>
    <span className="font-effect-shadow-multiple">{props.transaction.category} </span>
    <span className="font-effect-shadow-multiple">{props.transaction.vendor} </span>
    <span>
    <button className='deleteButton' onClick={deleteTransaction}>X</button>
    </span>
    </div>
  )
}
