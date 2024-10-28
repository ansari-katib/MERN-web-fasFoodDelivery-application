import React, { createContext, useContext, useReducer } from "react";

// Create context for state and dispatch
const cartStateContext = createContext();
const cartDispatchContext = createContext();

// Reducer function to manage cart state
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, 
                { 
                    id: action.id, 
                    name: action.name, 
                    qty: action.qty, 
                    size: action.size, 
                    price: action.price, 
                    img: action.img 
                }
            ]
        
        case "REMOVE" :
            let newArr = [...state]
            newArr.splice(action.index ,1)
            return newArr ;

        case "UPDATE" :
            let arr = [...state]
            arr.find((food ,index) => {
                if(food.id === action.id){
                    console.log(food.qty ,parseInt(action.aty) , action.price + food.price)
                    arr[index] = {...food , qty:parseInt(action.qty) + food.qty , price: action.price + food.price}
                }
                return arr
            })
            return arr

        case "DROP" :
            let empArray = []
            return empArray
            

        default:
            console.log("Error in Reducer");
    }
};

// Provider component to wrap the application
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    );
};

// Custom hooks for accessing context
export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
