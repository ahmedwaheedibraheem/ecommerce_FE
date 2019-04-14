import React, { Component } from 'react';
import { getAllProducts } from '../../API/productAPIs'
import ProductCardMapping from '../../components/productCard/productCardMapping';

class ProductListing extends Component {
    state = {
        products: null,
        loadingStatus: 'loading'
    }
    //
    // Loading products
    //
    async componentDidMount() {
        try {
            const response = await getAllProducts();
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
    // render
    //
    render() {
        //
        // Handling display logic 
        //
        let productCardMapping = <h3>Loading ...</h3>;
        if (this.state.loadingStatus === 'loaded') {
            productCardMapping = (
                <ProductCardMapping
                    isAuth={false}
                    products={this.state.products}
                    viewHandler={this.viewHandler} />
            );
        };
        if (this.state.loadingStatus === 'no products found') {
            productCardMapping = <h3>No products Found!</h3>
        };
        return (productCardMapping);
    };
};

export default ProductListing;