import React, { Component } from 'react';
//import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
//import Button from '../../components/UI/Button/Button';
//import userManager from "../../utils/userManager";

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
        // axios.get('https://react-my-burger.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    // addIngredientHnadler = (type) => {
    //     const updatedCount = this.props.ings[type] + 1;

    //     const updatedIngredients = { ...this.props.ings };
    //     updatedIngredients[type] = updatedCount;

    //     const ingredientPrice = INGREDIENT_PRICES[type];
    //     const updatedPrice = this.state.totalPrice + ingredientPrice;
    //     this.setState({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const updatedCount = this.props.ings[type] - 1;
    //     if (updatedCount < 0) {
    //         return;
    //     }

    //     const updatedIngredients = { ...this.props.ings };
    //     updatedIngredients[type] = updatedCount;

    //     const ingredientPrice = INGREDIENT_PRICES[type];
    //     const updatedPrice = this.state.totalPrice - ingredientPrice;

    //     this.setState({
    //         totalPrice: updatedPrice <= 0 ? 0 : updatedPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => (
        this.setState({ purchasing: true })
    )

    cancelPurchaseHandler = () => (
        this.setState({ purchasing: false })
    )

    continuePurchaseHandler = () => {
        // alert("You continued with checkout")

        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    // onLoginButtonClick(event) {
    //     event.preventDefault();
    //     userManager.signinRedirect();
    // }

    render() {
        let disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler} />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        // const pageToRender = !this.props.user || !this.user.expired 
        //                     ?   <div>
        //                             <h3>Welcome to burger app!</h3>
        //                             <p>Please log in to continue</p>
        //                             <Button clicked={this.onLoginButtonClick} btnType="Success">Login</Button>
        //                         </div>
        //                     :   <Aux>
        //                             <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
        //                                 {orderSummary}
        //                             </Modal>
        //                             <Burger ingredients={this.props.ings} />
        //                             <BuildControls 
        //                             ingredientAdded={this.props.onIngredientAdded} 
        //                             ingredientRemoved={this.props.onIngredientRemoved}
        //                             disabledInfo={disabledInfo}
        //                             price = {this.props.price}
        //                             purchasable = {this.updatePurchaseState(this.props.ings)}
        //                             ordered={this.purchaseHandler} />
        //                         </Aux>;
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        //user: null,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);