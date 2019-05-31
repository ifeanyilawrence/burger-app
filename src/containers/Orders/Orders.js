import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    

        // fetch('http://97.74.6.243/portal_dev/api/undergraduate/applicant', {
        //         method: "POST", // *GET, POST, PUT, DELETE, etc.
        //         body: JSON.stringify(data), // body data type must match "Content-Type" header
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json; charset=utf-8'
        //             // "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //         //redirect: "follow", // manual, *follow, error
        //         //referrer: "no-referrer", // no-referrer, *client
        //         mode: "no-cors", // no-cors, cors, *same-origin
        //         //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //         //credentials: "same-origin", // include, *same-origin, omit
        //     })
        //     .then(response => {
        //         console.log(response);
        //     }); // parses response to JSON
    }

    render () {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders)
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));