import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import "./TransactionForm.css"
import axios from 'axios';


export default function TransactionForm(props) {
  const [transactionInputs,setTransactionsInputs] = useState({amountInput:"",categoryInput:"",vendorInput:""})

  const handleChange = e =>{
    let newTransactionInputs={...transactionInputs}
    newTransactionInputs[e.target.name]=e.target.value
    setTransactionsInputs(newTransactionInputs)
  } 

  const addDeposit =()=>{
    async function postTransactionToServer(){
      await axios.post(`http://localhost:8003/transactions?amount=${transactionInputs.amountInput}&category=${transactionInputs.categoryInput}&vendor=${transactionInputs.vendorInput}`);
    }
    postTransactionToServer()
    props.updateBalance(transactionInputs.amountInput,"plus")
  }

  const addWithdraw =()=>{
    async function postTransactionToServer(){
      await axios.post(`http://localhost:8003/transactions?amount=${transactionInputs.amountInput*(-1)}&category=${transactionInputs.categoryInput}&vendor=${transactionInputs.vendorInput}`);
    }
    postTransactionToServer()
    props.updateBalance(transactionInputs.amountInput,"minus")
  }

  return (
    <div>
      <div className='title-inserting-transaction'>Insert a transaction : </div>
    <div className='transaction-form'>
      <input className="inputform" onChange={handleChange} placeholder='amount' name="amountInput" type="number"  ></input>
      <input className="inputform" onChange={handleChange} placeholder='category' name="categoryInput"></input>
      <input className="inputform" onChange={handleChange} placeholder='vendor' name="vendorInput" ></input>
      <div className='buttons'>
      <button className='deposit' onClick={addDeposit}>Deposit</button>
      <button className='withdraw' onClick={addWithdraw}>Withdraw</button>
      </div>
  </div>
  </div>
  )
}
