import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar';
import Transactions from './components/Transactions/Transactions';
import Balance from './components/Balance/Balance';
import TransactionForm from './components/TransactionForm/TransactionForm';
import Breakdown from './components/Breakdown/Breakdown';
import Operations from './components/Operations/Operations';
import axios from 'axios';
import "./App.css"

export default function App() {

  const [balance,setBalance] = useState(0)
  
  const deleteTransaction= async function(id){
    //deleting in server.
    await axios.delete(`/http://localhost:8000/transactions?id=${id}`)
  }

  const updateBalance=(delta,operation)=>{
    let newBalance;
    if(operation=="plus"){
      newBalance = balance+parseInt(delta)
    }
    else{
      newBalance = balance-parseInt(delta)
    }
    setBalance(newBalance)
  }
  
  return (
    <Router>
      <div className='App'>
      <NavBar/>
      <Balance balance={balance}/> 
      <Route path="/" exact render={() => <Transactions updateBalance={updateBalance}/>} />
      <Route path="/operations" exact render={() => <Operations updateBalance={updateBalance}/>} />
      <Route path="/breakdown" exact render={() => <Breakdown/>} />
      </div>
    </Router>
  )
}
