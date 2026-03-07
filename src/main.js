import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from '@/components/ui/sonner';
createRoot(document.getElementById('root')).render(_jsxs(StrictMode, { children: [_jsx(App, {}), _jsx(Toaster, { position: "bottom-right", richColors: true })] }));
