import {configureStore} from "@reduxjs/toolkit";
import AlertReducer from "../features/AlertSlice"

export const store = configureStore(
    {reducer:{
        alert: AlertReducer
    }}
)