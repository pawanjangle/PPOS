const baseUrl = "http://localhost:5000"
import axios from 'axios';
let endPoint = {
    createproduct: "/api/product/create-product",
    getproducts: "/api/product/get-products"
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
export const callAllProducts = async () => {
    try {
        const res = await axios.get(baseUrl + endPoint.getproducts)
        console.log(res)
        return res
    }
    catch (err) {
        console.log(err)
        return err.response
    }
}