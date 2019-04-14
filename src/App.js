import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Register from './containers/register/register';
import ProductListing from './containers/productListing/productListing';
import ProductDetails from './containers/productDetails/productDetails';
import UserProductListing from './containers/userProductListing/userProductListing';
import AddProduct from './containers/addProduct/addProduct';
import EditProduct from './containers/editProduct/editProduct';
import { login } from './API/userAPIs';
import './App-module.css';
//
// App
//
class App extends Component {
  state = {
    loginData: {
      username: null,
      password: null,
    },
    LoggedInUser: null,
    loggingStatus: null
  };
  //
  // Login-form onChangeHandler
  //
  onChangeHandler = (fieldName, fieldValue) => {
    this.setState({
      loginData: {
        ...this.state.loginData,
        [fieldName]: fieldValue
      }
    });
  };
  //
  // Login Handler
  //
  loginHandler = async () => {
    try {
      if (this.state.loginData.username && this.state.loginData.password) {
        this.setState({
          loggingStatus: 'loading'
        });
        const response = await login(this.state.loginData);
        if (!response.user) {
          alert('Error login! Please try again!');
          return this.setState({
            loggingStatus: 'failed'
          });
        };
        if (response.token && response.user) {
          localStorage.setItem('token', response.token)
          return this.setState({
            LoggedInUser: response.user,
            loggingStatus: 'done'
          });
        }
      } else {
        alert('Missing information! Please click"OK" and try again!');
      }
    }
    catch (err) {
      console.log(err);
    }
  };
  //
  // logOutHandler
  //
  logOutHandler = () => {
    localStorage.removeItem('token');
    this.setState({
      LoggedInUser: null,
      loggingStatus: null
    });
  };
  //
  // render
  //
  render() {
    //
    // handling login div
    //
    let signInComponent = (
      <div style={{ border: "1px solid gray", textAlign: "center" }}>
        <h4>Sign in or register to be able to add new products and manage your originally-existing ones!</h4>
        <input name="username" type="text" placeholder="username"
          onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
        <input name="password" type="password" placeholder="password"
          onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
        <button onClick={this.loginHandler}>sign-in</button>
      </div>
    );

    if (this.state.loggingStatus === 'loading') {
      signInComponent = <h4>Signing in ...</h4>;
    };

    if (this.state.loggingStatus === 'done') {
      signInComponent = (
        <div style={{ border: "1px solid gray", textAlign: "center" }}>
          <span>Signed-in as</span>&nbsp;<span>{this.state.LoggedInUser.username}</span>&nbsp;
          <button onClick={this.logOutHandler}>Log-out</button>
        </div>
      );
    };

    return (
      <div className='App'>
        <BrowserRouter>
          <>
            {/* Sign-in */}
            <div>{signInComponent}</div>

            {/* Navigation */}
            <div>
              <ul>
                <li><Link to="/">Products</Link></li>
                {this.state.LoggedInUser ? <li><Link to="/myproducts">My Products</Link></li> : null}
                {this.state.LoggedInUser ? <li><Link to="/addproduct">Add Product</Link></li> : null}
                {this.state.LoggedInUser == null ? <li><Link to="/register">Register</Link></li> : null}
              </ul>
            </div>

            {/* Content */}
            <div style={{ textAlign: "center" }}>
              <Switch>
                {this.state.LoggedInUser == null ? <Route path='/register' component={Register} /> : null}
                {this.state.LoggedInUser ? <Route path='/myproducts' component={UserProductListing} /> : null}
                {this.state.LoggedInUser ? <Route path='/addproduct' component={AddProduct} /> : null}
                {this.state.LoggedInUser ? <Route path='/edit/:id' component={EditProduct} /> : null}
                <Route path='/products/:id' component={ProductDetails} />
                <Route path='/' exact component={ProductListing} />
                <Route path='*' component={ProductListing} />
              </Switch>
            </div>
          </>
        </BrowserRouter>
      </div>
    );
  };
};

export default App;