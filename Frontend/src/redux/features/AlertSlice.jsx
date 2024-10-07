import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertState: false,
    alertType: "",
    alertMessage: ""
}

export const AlertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state, action)=>{
            state.alertState = action.payload.alertState;
            state.alertType =  action.payload.alertType;
            state.alertMessage = action.payload.alertMessage;
        }
    }
})

export const {showAlert} = AlertSlice.actions;
export default AlertSlice.reducer;
