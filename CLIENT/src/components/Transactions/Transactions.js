import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Transaction from '../Transaction/Transaction';
import axios from 'axios';

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    /*
    let new_transactions = [
      {
          "id": 1,
          "amount": 2000,
          "category": "salary",
          "vendor": "Cyber"
      },
      {
          "id": 2,
          "amount": 3000,
          "category": "salary",
          "vendor": "Menora"
      },
      {
          "id": 5,
          "amount": -1000,
          "category": "food",
          "vendor": "Kampai"
      }
  ]
  */
    async function fetchTransactions(){
      let promise= await axios.get("http://localhost:8003/transactions")
      let new_transactions=promise.data
      setTransactions(new_transactions) 
    }
    fetchTransactions() 
  },[])
  
  return (
    <div className='transactions-board'>{transactions.map(transaction => <Transaction transaction={transaction}/>)}</div>
  )
}
