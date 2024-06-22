import appIcon from "../assets/logo.jpg";
import style from "./HeaderComponent.module.css";

import Button from "./UI/Button.jsx";
import {ShoppingCartIcon, SunIcon, MoonIcon} from '@heroicons/react/24/solid';

import { useContext, useEffect, useState } from "react";

import { AppSettingsContext } from "../contexts/appSettings.jsx";
import { CartContext } from "../contexts/cartContext.jsx";

export default function HeaderComponent({openCart}){
    const AppSettings = useContext(AppSettingsContext);
    const {cart} = useContext(CartContext);

    const [solidHeader, activateSolidHeader] = useState(false);

    useEffect(()=>{
        let isSolid = false;
        //when user is scrolling, the header should be given a solid color because the header is sticky
        document.addEventListener('scroll', ()=>{
            if(!isSolid && window.scrollY > 100){//scroll threshold met to make the header solid background
                isSolid = true;
                activateSolidHeader(true);
            }
            else if(isSolid && window.scrollY <= 100){
                isSolid = false;
                activateSolidHeader(false);
            }
        })
    },[]);

    return (
        <header className={solidHeader? style.solid : ''}>
            <span className={style.appName}>
                <img src={appIcon} alt="app icon" width="128px" height="128px" />
                <h1>Tummy Fillz</h1>
            </span>
            <span>
                <Button type="filled" icon={AppSettings.appTheme === 'light'? MoonIcon : SunIcon} onClick={() => {AppSettings.switchAppTheme()}} aria-label="Change theme"></Button>
                <Button type="filled" icon={ShoppingCartIcon} onClick={()=>{openCart(true)}} aria-label="Cart">{cart.reduce((acc, item)=>(acc + item.quantity),0)} Items</Button>
            </span>
        </header>
    )
}