import Style from "./DialogModal.module.css";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";

/**
 * A custom dialog modal for rendering anything inside a dialog. It can render child components inside of it (i.e. it allows component compostion).
 * @param {boolean} open //the open state of the modal
 * @param {string} title //title to show at the top of the UI
 * @param {string} confirmLabel //the value to display on the confirm button
 * @param {object} onConfirm //the function to execute when the confirm button is clicked
 * @param {boolean} disableConfirmBtn //to disable the confirm button
 * @param {string} cancelLabel //the value to display on the cancel button
 * @param {object} onCancel //the function to execute when the cancel button is clicked
 */
export default function DialogModal({open = false, title = "Title", confirmLabel = "Confirm", onConfirm = ()=>{}, disableConfirmBtn = false, cancelLabel = "Cancel", onCancel = ()=>{}, className, children}){

    const classNames = className != undefined? `${Style.dialogModal} ${className}` : Style.dialogModal;

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
            <dialog ref={dialogElement} className={classNames} onClose={onCancel}>
                <h2>{title}</h2>
                <>{open && children}</>
                <div className={Style.buttonsContainer}>
                    <Button type="stroked" onClick={onCancel}>{cancelLabel}</Button>
                    <Button type="filled" onClick={onConfirm} disabled={disableConfirmBtn}>{confirmLabel}</Button>
                </div>
            </dialog>
            , document.getElementById("modal"))
        
    )
}