import Style from './FoodItem.module.css';

import Button from './UI/Button.jsx';

export default function FoodItem({itemData, onSelect}){

    function selectionHandler(){
        onSelect(itemData);
    }

    return (
        <div className={Style.foodItem}>
            <img src={`http://localhost:3000/${itemData.image}`} width="128px"/>
            <div className={Style.foodDetailsSection}>
                <h2 className={Style.itemName}>{itemData.name}</h2>
                <p className={Style.itemPrice}>{`$${itemData.price}`}</p>
                <p className={Style.itemDescription}>{itemData.description}</p>
            </div>
            <div className={Style.btnContainer}>
                <Button type="filled" onClick={selectionHandler}>Add to Cart</Button>
            </div>
        </div>
    )
}