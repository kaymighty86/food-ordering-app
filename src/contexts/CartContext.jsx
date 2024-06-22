import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: [],
    addToCart: (item)=>{},
    removeFromCart: (item)=>{},
    clearCart: ()=>{}
});

export function CartDataProvider({children}){
    const [cart, setCart] = useState([]);
    const [accItemsLenth, setAccItemsLenth] = useState(0);

    function addToCart(selectedItem){
        //check if the item already exists in the cart
        const existingItemIndex = cart.findIndex((item) => (item.id === selectedItem.id));
        if(existingItemIndex != -1){
            setCart(prevCart => {
                const data = [...prevCart];
                data[existingItemIndex] = {
                    ...data[existingItemIndex],
                    quantity: data[existingItemIndex].quantity + 1
                }
                // data[existingItemIndex].quantity += 1;
                setAccItemsLenth(data.reduce((acc, item)=>(acc + item.quantity),0))

                return data;
            });
        }
        else{//add as new item
            setCart(prevCart => {
                const cartItem = {
                    ...selectedItem,
                    quantity: 1
                }

                return [...prevCart, cartItem];
            });
        }
    }

    function removeFromCart(selectedItem){
        //check if the item already exists in the cart
        const existingItem = cart.find(item => (item.id === selectedItem.id));
        if(existingItem){
            const itemIndex = cart.findIndex(item => (item.id === existingItem.id))

            //check if the selected item has more than 1 quantity in the cart. If so just reduce the quantity
            if(existingItem.quantity > 1){
                setCart(prevCart => {
                    const data = [...prevCart];
                    data[itemIndex] = {
                        ...data[itemIndex],
                        quantity: data[itemIndex].quantity - 1
                    };
                    return data;
                });
            }
            else{//remove item totally from the cart
                setCart(prevCart => {
                    const data = [...prevCart];
                    data.splice(itemIndex, 1);
                    return data;
                });
            }
        }
        else{
            console.log('Item is not in the cart.')
        }
    }

    function clearCart(){
        setCart([]);
    }

    const cartData = {
        cart,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={cartData}>
            {children}
        </CartContext.Provider>
    )
}