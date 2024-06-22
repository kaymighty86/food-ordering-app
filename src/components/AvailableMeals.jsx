import Styles from './AvailableMeals.module.css';

import { useState, useEffect, useContext } from 'react';
import { fetchAvailableMeals } from '../http.js';

import LoadingUI from './UI/LoadingUI.jsx';
import ErrorUI from './UI/ErrorUI.jsx';
import FoodItem from './FoodItem.jsx';

import { CartContext } from '../contexts/cartContext.jsx';

export default function AvailableMeals(){

    const [menu, setMenu] = useState([]);
    const [isLoading, setLoadingState] = useState(true);
    const [error, setError] = useState();

    const {addToCart} = useContext(CartContext);

    useEffect(()=>{
        //fetch available meals from the backend
        setLoadingState(true);
        setError();

        (async function fetchData(){
            let mealsdata = [];

            try{
                mealsdata = await fetchAvailableMeals();
            }
            catch(error){
                setError("Unable to load available meals.");
            }

            setMenu(mealsdata);
            setLoadingState(false);
        })();
    }, [])

    return (
        <div className={Styles.availableMealsSection}>
            {isLoading && <LoadingUI />}
            {error && <ErrorUI message={error}/>}
            {!isLoading && menu.length > 0 && menu.map(item => 
                <FoodItem key={item.id} itemData={item} onSelect={addToCart} />
                )}
        </div>
    )
}