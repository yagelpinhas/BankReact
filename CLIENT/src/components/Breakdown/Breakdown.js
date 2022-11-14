import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Breakdown(props) {
  const [breakdown,setBreakdown] = useState([])
  useEffect(() => {
    async function fetchBreakdown(){
      let promise= await axios.get("http://localhost:8003/breakdown")
      let new_breakdown=promise.data
      setBreakdown(new_breakdown) 
    }
    fetchBreakdown() 
  },[])

  return (
    <div>
      Break down:
      {breakdown.map(expenses =>
         <div>
          <span>{expenses.category} </span>
          <span>{expenses.sum}</span>
         </div>)}
      </div>
  )
}
