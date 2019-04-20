import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

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
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);