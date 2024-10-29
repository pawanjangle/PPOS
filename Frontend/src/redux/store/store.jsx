import {configureStore} from "@reduxjs/toolkit";
import AlertReducer from "../features/AlertSlice"
import cartReducer from "../features/CartSlice"

export const store = configureStore(
    {reducer:{
        alert: AlertReducer,
        cart: cartReducer
    }}
)