import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './css/style.css';
import './css/satoshi.css';
import 'flatpickr/dist/flatpickr.min.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './redux/store.js'

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
