const baseUrl = "http://65.1.88.110:5000"
import axios from 'axios';
let endPoint = {
    createproduct: "/api/product/create-product",
    getproducts: "/api/product/get-products",
    updateproduct: "/api/product/update-product"
}
export const createProductfunction = async (product) => {
    try {
        const res = await axios.post(baseUrl + endPoint.createproduct, product)
        console.log(res)
        return res
    }
    catch (err) {
        console.log(err)
        return err.response
    }
}
export const callAllProducts = async (paylaod) => {
    try {
        const res = await axios.get(baseUrl + endPoint.getproducts)
        return res
    }
    catch (err) {
        console.log(err)
        return err.response
    }
}
export const updateProduct = async (payload) => {
    try {
        const res = await axios.post(baseUrl + endPoint.updateproduct, payload )
        return res
    }
    catch (err) {
        console.log(err)
        return err.response
    }
}