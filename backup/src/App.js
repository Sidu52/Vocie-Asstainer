import React from 'react'
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import MainScreen from './Screen/MainScreen';
export default function App() {
  return (
    <div>
      <Router>
        <div>
          <MainScreen />
        </div>
      </Router>
    </div>
  )
}
