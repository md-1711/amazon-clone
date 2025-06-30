import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CartProvider } from "./context/CartContext";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { UserProvider } from "./context/UserContext"; // ✅ import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* ✅ Wrap with UserProvider */}
      <CartProvider>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
