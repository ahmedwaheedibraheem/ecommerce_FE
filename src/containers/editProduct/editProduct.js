import React, { Component } from 'react';
import { getProductByID } from '../../API/productAPIs';
import { editProduct } from '../../API/userAPIs';

class EditProduct extends Component {
    state = {
        product: null
    };
    //
    // Pre-populating the form with data
    //
    async componentDidMount() {
        try {
            const productID = this.props.match.params.id;
            const productDetails = await getProductByID(productID);
            if (productDetails._id) {
                this.setState({
                    product: productDetails
                });
            } else {
                alert('Error!')
            }
        } catch (err) {
            console.log(err);
        };
    };
    //
    // onChangeHandler
    //
    onChangeHandler = (fieldName, fieldValue) => {
        this.setState({
            product: {
                ...this.state.product,
                [fieldName]: fieldValue
            }
        });
    };
    //
    // editProductHandler
    //
    editHandler = async () => {
        try {
            if (this.state.product.name && this.state.product.price && this.state.product.imgURL) {
                const productID = this.props.match.params.id;
                const response = await editProduct(productID, this.state.product);
                if (!response._id) {
                    return alert('Error editing! Press "OK" and try to enter valid information!')
                }
                this.props.history.push('/myproducts');
            } else {
                alert('missing information! Press "OK" and try again!')
            }
        } catch (err) {
            console.log(err);
        };
    };
    //
    // render
    //
    render() {
        let editProduct = <h3>Loading ...</h3>
        if (this.state.product) {
            editProduct = (
                <>
                    <h1>Edit product!</h1>
                    <input type='text' name='name' placeholder='Product name'
                        value={this.state.product ? this.state.product.name : 'Product name'}
                        onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                    <input type='text' name='price' placeholder='Product price'
                        value={this.state.product ? this.state.product.price : 'Product price'}
                        onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                    <input type='text' name='imgURL' placeholder='Product image URL'
                        value={this.state.product ? this.state.product.imgURL : 'Product imgURL'}
                        onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                    <button onClick={this.editHandler} >Edit product</button>
                </>
            );
        };
        return (editProduct);
    };
};

export default EditProduct;