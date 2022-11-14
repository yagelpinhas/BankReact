import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import "./TransactionForm.css"
import axios from 'axios';


export default function TransactionForm(props) {
  const [amountInput, setAmountInput] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [vendorInput, setVendorInput] = useState("")

  const handleChange = e =>{
    if (e.target.name=="amount"){
      setAmountInput(e.target.value)
    }
    else if (e.target.name=="category"){
      setCategoryInput(e.target.value)
    }
    else{
      setVendorInput(e.target.value)
    }
  } 

  const addTransaction =()=>{
    async function postTransactionToServer(){
      await axios.post(`http://localhost:8003/transactions?amount=${amountInput}&category=${categoryInput}&vendor=${vendorInput}`);
    }
    postTransactionToServer()
    props.updateBalance(amountInput)
  }

  return (
    <div className='transaction-form'>
      <input onChange={handleChange} placeholder='amount' name="amount" type="number"></input>
      <input onChange={handleChange} placeholder='category' name="category"></input>
      <input onChange={handleChange} placeholder='vendor' name="vendor"></input>
      <button className='addTransaction' onClick={addTransaction}>Add Transaction</button>
  </div>
  )
}
