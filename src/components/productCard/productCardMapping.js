import React from 'react';
import ProductCard from './productCard'

const products = (props) => {
    return (
        props.products.map(product => <ProductCard
            key={product._id}
            id={product._id}
            isAuth={props.isAuth}
            name={product.name}
            imgURL={product.imgURL}
            price={product.price}
            username={product.username}
            viewHandler={props.viewHandler}
            deleteHandler={props.deleteHandler}
            editHandler={props.editHandler}
        />)
    );
};

export default products;