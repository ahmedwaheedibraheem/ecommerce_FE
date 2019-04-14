import React from 'react';

const productCard = (props) => {
    let authBtns = null;
    if (props.isAuth) {
        authBtns = (
            <>
                <button onClick={() => props.editHandler(props.id)}>edit</button>
                <button onClick={() => props.deleteHandler(props.id)}>delete</button>
            </>
        );
    };

    return (
        <div style={{ textAlign: "center", border: "1px solid gray", margin: "1rem" }}>
            <p>{props.name}</p>
            <div>
                <img style={{ width: "20rem", height: "20rem" }} src={props.imgURL} alt="product image" />
            </div>
            <div>
                <p>Price: {props.price}</p>
                <p>Added by: {props.username}</p>
            </div>
            <div>
                <button onClick={() => props.viewHandler(props.id)}>view</button>
                {authBtns}
            </div>
        </div>
    );
};

export default productCard;