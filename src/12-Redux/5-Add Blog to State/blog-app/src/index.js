import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import "./App.css"

import { createStore, combineReducers } from 'redux'
import { v4 as uuid } from 'uuid';


// ACTION CREATOR
const addBlog = ({ title='', description='',dateAdded=0 }) => ({
    type: "ADD_BLOG",
    blog: {
        id: uuid(),
        title: title,
        description: description,
        dateAdded: dateAdded
    }
})

const blogState = []

const blogReducer = (state = blogState, action) => {
    switch (action.type) {
        case "ADD_BLOG":
            return [
                ...state,
                action.blog
            ]
        default:
            return state;
    }
}

const authState = {};

const authReducer = (state = authState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const store = createStore(
    combineReducers({
        blogs: blogReducer,
        auth: authReducer
    })
);

store.subscribe(()=> {
    console.log(store.getState());
})

store.dispatch(addBlog({title: 'blog title 1', description: 'blog description 1'}))
store.dispatch(addBlog({title: 'blog title 2', description: 'blog description 2', dateAdded: Date.now()}))



ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
