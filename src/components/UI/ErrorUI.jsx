import Style from "./ErrorUI.module.css";

export default function ErrorUI({message}){
    return(
        <div className={Style.errorUI}>
            <h2>ERROR</h2>
            <p>{message}</p>
        </div>
    );
}