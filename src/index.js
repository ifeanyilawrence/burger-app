import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
// import { OidcProvider, loadUser } from 'redux-oidc';
// import { routerMiddleware } from "react-router-redux";
// import { browserHistory } from "react-router";
import thunk from 'redux-thunk';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
//import userManager from './utils/userManager';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// const loggerMiddleware = store => next => action => {
//     console.log("Action type:", action.type);
//     console.log("Action payload:", action.payload);
//     console.log("State before:", store.getState());
//     next(action);
//     console.log("State after:", store.getState());
// };

// const initialState = {};

// const createStoreWithMiddleware = compose(
//     applyMiddleware(loggerMiddleware, routerMiddleware(browserHistory))
// )(createStore);

// const store = createStoreWithMiddleware(reducer, initialState);
// loadUser(store, userManager);

const app = (
    <Provider store={store}>
        {/* <OidcProvider store={store} userManager={userManager}> */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        {/* </OidcProvider> */}
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
