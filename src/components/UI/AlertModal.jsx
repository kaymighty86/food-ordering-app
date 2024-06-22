import Style from "./AlertModal.module.css";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";

/**
 * A custom dialog modal for rendering anything inside a dialog. It can render child components inside of it (i.e. it allows component compostion).
 * @param {boolean} open //the open state of the modal
 * @param {string} title //title to show at the top of the UI
 * @param {string} closeLabel //the value to display on the confirm button
 * @param {object} onClose //the function to execute when the confirm button is clicked
 */
export default function AlertModal({open = false, title = "", closeLabel = "Okay", onClose = ()=>{}, className, children}){

    const classNames = className != undefined? `${Style.alertModal} ${className}` : Style.alertModal;

    const dialogElement = useRef();

    useEffect(()=>{
        if(open){
            dialogElement.current.showModal();
        }
        else{
            dialogElement.current.close();
        }
    }, [open])

    return(
        createPortal(
            <dialog ref={dialogElement} className={classNames} onClose={onClose}>
                {title != "" && <h2>{title}</h2>}
                <>{open && children}</>
                <div className={Style.buttonsContainer}>
                    <Button type="filled" onClick={onClose}>{closeLabel}</Button>
                </div>
            </dialog>
            , document.getElementById("modal"))
    )
}