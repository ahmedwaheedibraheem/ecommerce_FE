import React, { Component } from 'react';
import { addProduct } from '../../API/userAPIs';

class AddProduct extends Component {
    state = {
        product: null,
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
    // addProductHandler
    //
    addProductHandler = async () => {
        try {
            if (this.state.product.name && this.state.product.price && this.state.product.imgURL) {
                const response = await addProduct(this.state.product);
                console.log(response);
                if (!response._id) {
                    return alert('Adding failed! Please enter valid information and try again!')
                };
                this.props.history.push('/myproducts');
            } else {
                alert('Missing information! Press "OK" and complete the information!')
            }
        } catch (err) {
            console.log(err);
        }
    }
    //
    // render
    //
    render() {
        return (
            <>
                <h1>Add product!</h1>
                <input type='text' name='name' placeholder='Product name'
                    onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                <input type='text' name='price' placeholder='Product price'
                    onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                <input type='text' name='imgURL' placeholder='Product image URL'
                    onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                <button onClick={this.addProductHandler}>Add product</button>
            </>
        );
    };
};

export default AddProduct;