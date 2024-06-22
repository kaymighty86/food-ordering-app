import Style from "./CartDisplay.module.css";

import { useState, useContext, forwardRef, useImperativeHandle } from "react";

import { FaceFrownIcon } from "@heroicons/react/24/solid";

import DialogModal from "./UI/DialogModal.jsx";
import { CartContext } from "../contexts/cartContext.jsx";

const CartDisplay = forwardRef(function CartDisplay({onCheckoutClicked}, ref){
    const {cart, addToCart, removeFromCart} = useContext(CartContext);

    const [cartOpened, openCart] = useState(false);

    useImperativeHandle(ref, ()=>{
        return {
            show(open = true){
                openCart(open);
            }
        }
    })

    function submitOrderHandler(){
        openCart(false);//close the cart first of all
        onCheckoutClicked();
    }

    return(
        <DialogModal open={cartOpened} title="Your Cart" confirmLabel="Go to Checkout" cancelLabel="Close" onCancel={()=>{openCart(false)}} onConfirm={submitOrderHandler} disableConfirmBtn = {cart.length < 1? true : false }>
            {cart.length == 0 && <p className={Style.defaultCartText}>Wow so much empty! <FaceFrownIcon style={{width: "1.2rem", verticalAlign: "bottom"}}/></p>}
            {cart.length > 0 && 
                <div className={Style.cartItemsSection}>
                    {cart.map((foodItem)=>{
                        return <div key={foodItem.id} className={Style.foodItem}>
                                    <p>{`${foodItem.name} - ${foodItem.quantity} x $${foodItem.price}`}</p>
                                    <div className={Style.qtyIncrementSection}>
                                        <button onClick={()=>{removeFromCart(foodItem)}}>-</button>
                                        <p>{foodItem.quantity}</p>
                                        <button onClick={()=>{addToCart(foodItem)}}>+</button>
                                    </div>
                                </div>
                    })}
                    <p><b><u>Total: </u>{`$${cart.reduce((acc,item) => (acc += item.quantity * item.price), 0).toFixed(2)}`}</b></p>
                </div>
            }
        </DialogModal>
    )
});

export default CartDisplay;