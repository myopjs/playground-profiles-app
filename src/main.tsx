import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './ui/App.tsx'

createRoot(document.getElementById('root')!).render(
        <BrowserRouter basename="/profiles">
            <App />
        </BrowserRouter>
)
