import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import {Toaster} from "@/components/ui/toaster.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
        <Toaster/>
    </StrictMode>
)