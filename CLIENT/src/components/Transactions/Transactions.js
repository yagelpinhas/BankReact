import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Transaction from '../Transaction/Transaction';
import axios from 'axios';

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([])

  const deleteTransaction =(id,amount)=>{
    async function deleteTransactionFromServer(id){
      await axios.delete(`http://localhost:8003/transactions?id=${id}`);
    }
    deleteTransactionFromServer(id)
    props.updateBalance(-1*amount)
    fetchTransactions()
  }

  useEffect(() => {
    fetchTransactions() 
  },[transactions])
  
  async function fetchTransactions(){
    let promise= await axios.get("http://localhost:8003/transactions")
    let new_transactions=promise.data
    setTransactions(new_transactions) 
  }
  
  return (
    <div className='transactions-board'>{transactions.map(transaction => <Transaction transaction={transaction} deleteTransaction={deleteTransaction}/>)}</div>
  )
}
