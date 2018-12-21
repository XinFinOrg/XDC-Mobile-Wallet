import React, {Component} from 'react';
import Router from './Router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import signUpReducer from './Store/reducers/signUpReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    signUpReducer: signUpReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = <Provider store={store}>
                <Router />
            </Provider>;

class App extends Component {
    render() {
        return (
            <Router />
        );
    }
}

export default App;