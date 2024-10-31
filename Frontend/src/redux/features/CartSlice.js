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
    allProducts: []
}

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
    const response = await axios.get(`${baseUrl}${endPoint.getproducts}`);
    return response.data
})
export const updateProduct = createAsyncThunk('cart/updateProduct', async (payload) => {
    const response = await axios.post(`${baseUrl}${endPoint.updateproduct}`, payload);
    response.data.payload = payload;
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.allProducts.push(action.payload.products)
        }).addCase(fetchProducts.pending, (state, action) => {
            state.allProducts = []
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.allProducts = []
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            console.log(state.cartProducts)
            let cartProd = state.cartProducts.map(obj => {
                return state.cartProducts.find(o => o._id === obj._id) || action.payload.payload
            })
            state.cartProducts = cartProd
        }).addCase(updateProduct.pending, (state, action) => {
        }).addCase(updateProduct.rejected, (state, action) => {
        })
    }
})

export const { addProductToCart, setCustomerData, setPaymentStatus } = cartSlice.actions;
export default cartSlice.reducer; 