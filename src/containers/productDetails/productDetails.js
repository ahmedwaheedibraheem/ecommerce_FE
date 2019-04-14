import React, { Component } from 'react';
import { getProductByID } from '../../API/productAPIs';

class ProductDetails extends Component {
    state = {
        product: null
    }
    //
    // Loading product details
    //
    async componentDidMount() {
        try {
            const productID = this.props.match.params.id;
            const response = await getProductByID(productID);
            this.setState({
                product: response
            });
        } catch (err) {
            console.log(err);
        }
    }
    //
    // render
    //
    render() {
        let productDetails = <h3>Loading ...</h3>
        if (this.state.product) {
            productDetails = (
                <>
                    <h1>{this.state.product.name}</h1>
                    <div>
                        <img style={{ width: "20rem", height: "20rem" }}
                            src={this.state.product.imgURL} alt="product image" />
                    </div>
                    <h3>Price: {this.state.product.price}</h3>
                    <h3>Added by: {this.state.product.username}</h3>
                </>
            );
        }
        return (productDetails);
    };
};

export default ProductDetails;