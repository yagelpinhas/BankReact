import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import TransactionForm from '../TransactionForm/TransactionForm';
import axios from 'axios';

export default function operations(props) {
  return (
    <div>
        <TransactionForm updateBalance={props.updateBalance} />
    </div>
  )
}
