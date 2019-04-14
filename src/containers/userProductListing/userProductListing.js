import React, { Component } from 'react';
import { getUserProducts, removeProduct } from '../../API/userAPIs';
import ProductCardMapping from '../../components/productCard/productCardMapping';

class UserProductListing extends Component {
    state = {
        products: null,
        loadingStatus: 'loading'
    };
    //
    // Loading products
    //
    async componentDidMount() {
        try {
            const response = await getUserProducts();

            if (response === 'No products found!') {
                return this.setState({
                    loadingStatus: 'no products found'
                });
            };

            this.setState({
                products: response,
                loadingStatus: 'loaded'
            });
        } catch (err) {
            console.log(err);
        };
    };
    //
    // viewHandler
    //
    viewHandler = (id) => {
        this.props.history.push(`/products/${id}`);
    };
    //
    // deleteHander
    //
    deleteHandler = async (id) => {
        try {
            const response = await removeProduct(id);
            if (!response._id){
                return alert('Error deleting! Press "OK" and try again!')
            };
            const updatedProducts = this.state.products.filter(product => product._id != id);
            this.setState({
                products: updatedProducts
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    //
    // editHandler
    //
    editHanddler = (id) => {
        this.props.history.push(`/edit/${id}`);
    }
    //
    // Render
    //
    render() {
        //
        // Handling display logic 
        //
        let productCardMapping = <h3>Loading ...</h3>;
        if (this.state.loadingStatus === 'loaded') {
            productCardMapping = (
                <ProductCardMapping
                    isAuth={true}
                    products={this.state.products}
                    viewHandler={this.viewHandler}
                    deleteHandler={this.deleteHandler}
                    editHandler={this.editHanddler} />
            );
        };
        if (this.state.loadingStatus === 'no products found') {
            productCardMapping = <h3>No products Found!</h3>
        };
        return (productCardMapping);
    };
};

export default UserProductListing;