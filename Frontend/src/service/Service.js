const baseUrl = "https://ppos.onrender.com"
import axios from 'axios';
let endPoint = {
    createproduct: "/api/product/create-product",
    getproducts: "/api/product/get-products",
    updateproduct: "/api/product/update-product",
    deleteProduct: "/api/product/delete-product",
    createOrder: "/api/order/create-order",
    getOrders: "/api/order/get-orders",
    deleteOrder: "/api/order/delete-order",
    signup: "/api/auth/signup",
    signin: "/api/auth/signin"
}
export const createProductfunction = async (product) => {
    try {
        const res = await axios.post(baseUrl + endPoint.createproduct, product)
        console.log(res)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}
export const callAllProducts = async (paylaod) => {
    try {
        const res = await axios.get(baseUrl + endPoint.getproducts)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}
export const updateProduct = async (payload) => {
    try {
        const res = await axios.post(baseUrl + endPoint.updateproduct, payload )
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}
export const callDeleteProduct = async (payload) => {
    try {
        const res = await axios.delete(`${baseUrl}${endPoint.deleteProduct}/${payload}`)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}
export const callcreateOrder = async (order) => {
    try {
        const res = await axios.post(baseUrl + endPoint.createOrder, order)
        console.log(res)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}
export const getOrders = async () => {
    try {
        const res = await axios.get(baseUrl + endPoint.getOrders)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const callDeleteOrder = async (payload) => {
    try {
        const res = await axios.delete(`${baseUrl}${endPoint.deleteOrder}/${payload}`)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const signupFunction = async (payload) => {
    try {
        const res = await axios.post(baseUrl + endPoint.signup, payload)
        console.log(res)
        return res
    }  
    catch (err) {
        console.log(err)
        return err
    }
}
export const signinFunction = async (payload) => {
    try {
        const res = await axios.post(baseUrl + endPoint.signin, payload)
        console.log(res)
        return res
    }  
    catch (err) {
        console.log(err) 
        return err
    }
}
