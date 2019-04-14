//
// requires
//
const axios = require('axios');
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
//
// utilities
//
module.exports = {
    getAllProducts() {
        return axios.get(`${baseURL}/products`)
            .then(res => res.data)
    },
    getProductByID(productID) {
        return axios.get(`${baseURL}/products/${productID}`)
            .then(res => res.data);
    }
};