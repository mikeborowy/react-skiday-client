//React
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//App
import routes from './routes'
import C from './constants'
import sampleData from './initialState'
import storeFactory from './store'
import {addError} from './actions'
/*
check if exists any data in local localStorage
if not load sample data from initialState.json file 
*/
const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData

const saveState = () => localStorage["redux-store"] = JSON.stringify(store.getState())

/*
create store and send to it initial data
*/
const store = storeFactory(initialState);

/*
    wire up a listener, is going to save data 
    everytime it is modified
*/
store.subscribe(saveState)
// store.subscribe(() => localStorage["redux-store"] = JSON.stringify(store.getState()))

/*
Handle Errors
*/
const onHandleError = (error) => {
    store.dispatch(addError(error.message))
}

window.React = React
window.store = store
window.addEventListener("error", onHandleError)

/*
This places redux store into context so any child will be able to access it
*/
render(
    <Provider store={store}>
    {routes}
    </Provider>,
    document.getElementById('react-container')
)

// render(
//     routes,
//     document.getElementById('react-container')
// )
