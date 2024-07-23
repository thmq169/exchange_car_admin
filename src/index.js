import ReactDOM from 'react-dom/client'

import App from './App'
import { ContextProvider } from './contexts/ContextProvider'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)
