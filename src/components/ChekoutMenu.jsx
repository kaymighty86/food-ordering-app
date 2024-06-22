import Style from "./ChekoutMenu.module.css";

import { useContext, useRef, useMemo, forwardRef, useImperativeHandle, useState } from "react";

import DialogModal from "./UI/DialogModal.jsx";
import AlertModal from "./UI/AlertModal.jsx";
import Input from "./UI/Input.jsx";
import ErrorUI from "./UI/ErrorUI.jsx";
import LoadingUI from "./UI/LoadingUI.jsx";

import { FaceSmileIcon } from "@heroicons/react/24/solid";

import { CartContext } from "../contexts/cartContext.jsx";

import { submitOrder } from "../http.js";

const CheckoutMenu = forwardRef(function CheckoutMenu(props, ref){
    const [isOpen, openCheckoutMenu] = useState(false);
    const [inputErrors, setInputError] = useState([]);

    const contactFormRef = useRef();
    
    const {cart, clearCart} = useContext(CartContext);
    const totalCost = useMemo(()=>(cart.reduce((acc, item)=>{return acc += item.price * item.quantity},0)).toFixed(2), [cart]);

    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState();
    const [submissionResponse, setSubmissionResponse] = useState();

    useImperativeHandle(ref,()=>{
        return {
            show(state = true){
                openCheckoutMenu(state);

                setSubmissionLoading(false);
                setSubmissionError();
                setSubmissionResponse();
            }
        }
    });

    function inputErrorPostHandler(inputIndex, error){
        setInputError(prevErrors => {
            const newErrors = [...prevErrors];
            newErrors[inputIndex] = error;
            
            return newErrors;
        });
    }

    function formSubmitHandler(event){
        event.preventDefault();
        checkout();
    }

    async function checkout(){
        //if there are no errors
        if(inputErrors.length > 0 && !inputErrors.some(item => (item != undefined))){
            setSubmissionLoading(true);//activate loading UI

            const formData = new FormData(contactFormRef.current)
            const customerData = Object.fromEntries(formData.entries());//extract the form entries in JSON form

            //Combine all information into one payload including the cart data
            const orderData = {
                order: {
                    items: cart,
                    customer: customerData,
                }
            }

            //lets push data to the backend
            try{
                const response = await submitOrder(orderData);
                
                setSubmissionResponse(response.message);
                clearCart();//clear the cart
                setSubmissionLoading(false);//deactivate loading UI
            }
            catch(error){
                setSubmissionError(error.message);
                setSubmissionLoading(false);//deactivate loading UI
            }

        }
    }

    const toDisableSubmissionBtn = cart.length < 1 || inputErrors.some(item => (item != undefined)) ? true : false;//if there is something in the cart and there is no error posted by any input

    return(
        <>
            {!submissionLoading && !submissionResponse & !submissionError &&
                <DialogModal open={isOpen} title="Checkout" confirmLabel="Submit Order" cancelLabel="Close" onConfirm={checkout} onCancel={()=>{openCheckoutMenu(false)}} disableConfirmBtn = { toDisableSubmissionBtn } >
                    <p className={Style.totalCost}>Total Amount: ${totalCost}</p>
                    
                    {/* check the 'errors' array if there is any error posted by any input component then display it */}
                    {inputErrors.length > 0 && inputErrors.some(item => (item != "emptyInput" && item != undefined)) && <ErrorUI message={inputErrors.find(item => item != undefined)}/>}
                    
                    <form ref={contactFormRef} onSubmit={formSubmitHandler}>
                        <div className={Style.inputWrapper_Block}>
                            <Input type="text" id="fullName" name="name" label="Full Name" required = {true} onInputError={(error)=>{inputErrorPostHandler(0, error)}} />
                        </div>
                        <div className={Style.inputWrapper_Block}>
                            <Input type="email" id="email" name="email" label="E-Mail Address" pattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" required = {true} onInputError={(error)=>{inputErrorPostHandler(1, error)}} />
                        </div>
                        <div className={Style.inputWrapper_Block}>
                            <Input type="text" id="street" name="street" label="Street" required = {true} onInputError={(error)=>{inputErrorPostHandler(2, error)}} />
                        </div>
                        <div>
                            <Input type="text" id="postalCode" name="postal-code" label="Postal Code" pattern="^[0-9]+$" required = {true} onInputError={(error)=>{inputErrorPostHandler(3, error)}} />
                            <Input type="text" id="city" name="city" label="City" required = {true} onInputError={(error)=>{inputErrorPostHandler(4, error)}} />
                        </div>
                        {/* <button type="submit" style={{display: "none"}}>Submit</button> */}
                    </form>
                </DialogModal>
            }
            {submissionLoading &&
                <div className={Style.loadingBG}>
                    <LoadingUI />
                </div>
            }
            {(submissionResponse || submissionError) && 
                <AlertModal open={isOpen} closeLabel = "Close" onClose={()=>{openCheckoutMenu(false)}} className={Style.alertMenu}>
                    {!submissionError? 
                        <p>{ submissionResponse } <FaceSmileIcon style={{width: "1.2rem", verticalAlign: "bottom"}} /></p>
                        : <ErrorUI message={submissionError}/> }
                </AlertModal>
            }
        </>
    )
});

export default CheckoutMenu;