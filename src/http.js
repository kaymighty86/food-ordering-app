export async function fetchAvailableMeals(){
    const availableMeals = await fetch('http://localhost:3000/meals');

    if(!availableMeals.ok){
        throw new Error("Encountered a problem while loading available meals.");
    }

    return await availableMeals.json();
}

export async function submitOrder(orderData){
    const response = await fetch('http://localhost:3000/orders', {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type":"application/json"
        }
    });

    if(!response.ok){
        throw new Error("Encountered a problem while submitting order.");
    }

    return await response.json();
}