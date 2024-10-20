const baseUrl = "http://localhost:5000"
import axios from 'axios';
let endPoint = {
    createproduct: "/api/product/create-product",
    getproducts: "/api/product/get-products",
    updateproduct: "/api/product/update-product",
    deleteProduct: "/api/product/delete-product",
    createOrder: "/api/order/create-order",
    getOrders: "/api/order/get-orders",
    deleteOrder: "/api/order/delete-order"
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