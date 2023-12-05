import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import Header from './components/Header.jsx'
import {RecoilRoot} from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
