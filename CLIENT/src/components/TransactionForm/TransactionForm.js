import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import "./TransactionForm.css"
import axios from 'axios';

export default function TransactionForm(props) {
  const [transactionInputs,setTransactionsInputs] = useState({amountInput:"",categoryInput:"",vendorInput:""})
  let categories = ["food","salary","clothes"]
  const handleChange = e =>{
    let newTransactionInputs={...transactionInputs}
    newTransactionInputs[e.target.name]=e.target.value
    setTransactionsInputs(newTransactionInputs)
  } 

  const checkValidity=()=>{
    return transactionInputs.amountInput!=""&&transactionInputs.categoryInput!=""&&transactionInputs.vendorInput!=""
  }
  const addDeposit =()=>{
    async function postTransactionToServer(){
      await axios.post(`http://localhost:8003/transactions`,{"amount": transactionInputs.amountInput, "category": transactionInputs.categoryInput,"vendor": transactionInputs.vendorInput});
      props.updateBalance()
    }
    if(!checkValidity()){
      alert("one of the fields is missing")
    }
    else{
      postTransactionToServer()
      
    }
  }

  const canWithdraw=()=>{
    return props.balance-transactionInputs.amountInput>=500
  }

  const addWithdraw =()=>{
    async function postTransactionToServer(){
      await axios.post(`http://localhost:8003/transactions`,{"amount": transactionInputs.amountInput*(-1), "category": transactionInputs.categoryInput,"vendor": transactionInputs.vendorInput});
      props.updateBalance()
    }
    if(!checkValidity()){
      alert("one of the fields is missing")
    }
    else if(!canWithdraw()){
      alert("Insufficient Funds’")
    }
    else{
      postTransactionToServer()
      
    }
  }

  return (
    <div>
      <div className='title-inserting-transaction'>Insert a transaction : </div>
    <div className='transaction-form'>
      <input className="inputform" onChange={handleChange} placeholder='amount' name="amountInput" type="number"  ></input>
      <select placeholder="category" className='inputform' name="categoryInput" onChange={handleChange}>
      <option selected disabled>Choose Category</option>
        {categories.map(category=><option value={category}>{category}</option>)}
        </select>
      <input className="inputform" onChange={handleChange} placeholder='vendor' name="vendorInput" ></input>
      <div className='buttons'>
      <button className='deposit' onClick={addDeposit}>Deposit</button>
      <button className='withdraw' onClick={addWithdraw}>Withdraw</button>
      </div>
  </div>
  </div>
  )
}
