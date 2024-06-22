import Style from "./Input.module.css";

import { useEffect } from "react";

export default function Input({type = "text", id = "", name = "", label = "", required = false, pattern = "", onInputError, className, ...others}){

    const classes = className != undefined? `${className} ${Style.Input}` : Style.Input;

    useEffect(()=>{
        onInputError("emptyInput");//post an undefined (or empty) error on start to register this component's index on the errors array of the parent or clear any exising error value previosuly posted by this component
    }, []);

    function checkInput(event){
        const value = event.target.value;
        
        //check blank input if this is a required input
        if(required && (value == undefined || value == "")){
            onInputError(`Invalid input. Enter a valid value for '${label}'`);
            return;
        }

        //check pattern adherence if pattern is provided
        if(pattern != undefined){
            var expression;

            //if the regex syntax includes '/' then extract the pattern and the flags seprately. remember Flags are characters (representing scope instructions) that comes after the closing backslash '/' e.g. /mg
            if(pattern.includes("/")){
                let mainPattern = pattern.substring(1, pattern.lastIndexOf("/"));
                let flags = pattern.includes("/") && pattern.substring(pattern.lastIndexOf("/") + 1, pattern.length);
                expression = new RegExp(mainPattern, flags);
            }
            else{
                let mainPattern = pattern;//pass all the characters as pattern
                expression = new RegExp(mainPattern);
            }

            if(expression.test(value) == false){
                onInputError(`Invalid input. Enter a valid value for '${label}'`);
                return;
            }
        }

        onInputError(undefined);//if it gets here then reset this by posting an undefined error 
    }

    return(
        <span className={Style.InputContainer}>
            {(label != undefined && label != "") && 
                <label htmlFor={id} className={`${Style.Label} ${required? Style.required : ""}`}>{label}</label>
                }
            <input id={id} type={type} name={name} className={classes} required = {required} onInput={checkInput} {...others}/>
        </span>
    )
}