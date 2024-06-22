import Style from "./LoadingUI.module.css";
import loadingGif from "../../assets/loadingIcon.gif";

export default function LoadingUI(){
    return (
        <div className={Style.loadingUI}>
            <img src={loadingGif} alt="Loading..." aria-label="Loading"/>
        </div>
    )
}