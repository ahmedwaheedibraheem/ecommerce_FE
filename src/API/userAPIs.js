//
// requires
//
const axios = require('axios');
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
//
// utilities
//
module.exports = {
    register(user) {
        return axios.post(`${baseURL}/users/register`, user)
            .then(res => res.data);
    },
    login(user) {
        return axios.post(`${baseURL}/users/login`, user)
            .then(res => res.data)
    },
    getUserProfile() {
        return axios.get(`${baseURL}/users/profile`, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => res.data);
    },
    getUserProducts() {
        return axios.get(`${baseURL}/users/products`, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => res.data);
    },
    addProduct(product) {
        return axios.post(`${baseURL}/users/products`, product, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => res.data);
    },
    removeProduct(productID) {
        return axios.delete(`${baseURL}/users/products/${productID}`, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => res.data);
    },
    editProduct(productID, updatedProduct) {
        return axios.patch(`${baseURL}/users/products/${productID}`, updatedProduct, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => res.data);
    }
};