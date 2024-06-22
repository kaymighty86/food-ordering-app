import AppSettingsProvider from "./contexts/appSettings.jsx";
import { CartDataProvider } from "./contexts/cartContext.jsx";

import HeaderComponent from "./components/HeaderComponent.jsx";
import AvailableMeals from "./components/AvailableMeals.jsx";
import CartDisplay from "./components/CartDisplay.jsx";
import CheckoutMenu from "./components/ChekoutMenu.jsx";

import {useRef} from "react";

function App() {

  const cartDisplayRef = useRef();
  const checkoutMenuRef = useRef();

  function openCart(state = true){
    cartDisplayRef.current.show(state);
  }

  function openCheckoutMenu(state = true){
    checkoutMenuRef.current.show(state);
  }

  return (
    <AppSettingsProvider>
      <CartDataProvider>
        <HeaderComponent openCart = {openCart} />
        <AvailableMeals />
        <CartDisplay ref={cartDisplayRef} onCheckoutClicked={openCheckoutMenu}/>
        <CheckoutMenu ref={checkoutMenuRef}/>
      </CartDataProvider>
    </AppSettingsProvider>
  );
}

export default App;