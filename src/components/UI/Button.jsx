import Style from './Button.module.css';

export default function Button({type, icon, className, children, ...others}){
    
    //set the button style
    let chosenStyle = undefined;
    switch(type){
        case 'filled': chosenStyle = Style.buttonFilled;
        break;
        case 'stroked': chosenStyle = Style.buttonStroked;
        break;
        case 'transparent': chosenStyle = Style.buttonTransparent;
        break;
        default: chosenStyle = Style.buttonFilled;
        break;
    }

    //merge any other addional class names
    const classes = className != undefined? 
        `${chosenStyle} ${className}` : chosenStyle;

    //custom components must start with a capital letter
    const Icon = icon;

    return (
        <button className={classes} {...others}> { icon && <Icon style={{width: "1rem"}}/> } { children } </button>
    )
}