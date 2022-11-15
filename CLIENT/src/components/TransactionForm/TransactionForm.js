import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import "./TransactionForm.css"
import axios from 'axios';


export default function TransactionForm(props) {
  const [transactionInputs,setTransactionsInputs] = useState({amountInput:"",categoryInput:"",vendorInput:""})

  const handleChange = e =>{
    console.log(e.target.name)
    console.log(e.target.value)
    let newTransactionInputs={...transactionInputs}
    newTransactionInputs[e.target.name]=e.target.value
    setTransactionsInputs(newTransactionInputs)
    console.log(transactionInputs)
  } 

  const addTransaction =()=>{
    async function postTransactionToServer(){
      await axios.post(`http://localhost:8003/transactions?amount=${transactionInputs.amountInput}&category=${transactionInputs.categoryInput}&vendor=${transactionInputs.vendorInput}`);
    }
    console.log(transactionInputs.amountInput)
    console.log(transactionInputs.categoryInput)
    console.log(transactionInputs.vendorInput)
    postTransactionToServer()
    props.updateBalance(transactionInputs.amountInput)
  }

  return (
    <div className='transaction-form'>
      <input className="inputform" onChange={handleChange} placeholder='amount' name="amountInput" type="number"  ></input>
      <input className="inputform" onChange={handleChange} placeholder='category' name="categoryInput"></input>
      <input className="inputform" onChange={handleChange} placeholder='vendor' name="vendorInput" ></input>
      <button className='addTransaction' onClick={addTransaction}>Add Transaction</button>
  </div>
  )
}
