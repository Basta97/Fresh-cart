import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import TokenContextProvider from "./contexts/tokenContext.jsx";
import CartContextProvider from "./contexts/cartContext.jsx";
import { WishlistProvider } from "./contexts/WishlistContext .jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <WishlistProvider>
        <App />
        </WishlistProvider>
       
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
