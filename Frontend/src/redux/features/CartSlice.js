import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAllProducts } from '../../service/Service'
import axios from 'axios'
import { baseUrl, endPoint } from "../../service/Service"


const initialState = {
    loading: false,
    cartProducts: [],
    error: '',
    cartTotal: 0,
    customerName: '',
    paymentStatus: 'UnPaid',
    allProducts: [],
    alertState: false,
    alertType: "",
    alertMessage: ""
}
const calculateTotal = (cartProducts) => {
    let total = 0;
    for (let val of cartProducts) {
        total += (val.quantity * val.price)
    }
    return total;
}

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
    const response = await axios.get(`${baseUrl}${endPoint.getproducts}`);
    return response.data
})
export const updateProduct = createAsyncThunk('cart/updateProduct', async (cartData) => {
    const response = await axios.post(`${baseUrl}${endPoint.updateproduct}`, cartData.editedPrdouct);
    const finalCart = cartData.allCartProducts.map(obj => obj._id === cartData.editedPrdouct._id ? cartData.editedPrdouct : obj
    );
    response.data.finalCart = finalCart;
    response.data.total = calculateTotal(finalCart)
    return response.data
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            state.loading = true;
            state.cartProducts = [...state.cartProducts, action.payload.product];
            state.cartTotal = action.payload.total
        },
        setCustomerData: (state, action) => {
            state.customerName = action.payload.customerName
        },
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload.paymentStatus
        },
        hideAlert: (state) => {
            state.alertState = false
            state.alertType = ""
            state.alertMessage = ""
        },
        setCartProducts: (state, action)=>{
            state.cartProducts = action.payload
            state.cartTotal = calculateTotal(action.payload)
        },
        setCartEmpty: (state)=>{
            state.cartProducts = [];
            state.cartTotal = 0;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.allProducts.push(action.payload.products)
        }).addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
            state.allProducts = []
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.allProducts = []
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.cartProducts = action.payload.finalCart
            state.cartTotal = action.payload.total
            state.alertState = true
            state.alertType = "success"
            state.alertMessage = action.payload.message
        }).addCase(updateProduct.pending, (state, action) => {
            state.error = ""
        }).addCase(updateProduct.rejected, (state, action) => {
            state.error = action.payload.error
        })
    }
})

export const { addProductToCart, setCustomerData, setPaymentStatus, removeProductToCart, hideAlert, setCartProducts, setCartEmpty } = cartSlice.actions;
export default cartSlice.reducer; 