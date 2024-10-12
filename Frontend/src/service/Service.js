const baseUrl = "https://ppos.onrender.com"
import axios from 'axios';
let endPoint = {
    createproduct: "/api/product/create-product",
    getproducts: "/api/product/get-products",
    updateproduct: "/api/product/update-product",
    deleteProduct: "/api/product/delete-product"
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