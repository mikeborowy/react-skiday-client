import C from '../constants';
import thunk from 'redux-thunk';
import appReducers from './reducers';
import {
    createStore,
    applyMiddleware
} from 'redux';

// const consoleMessages = function(store) {
//     return function(next){
//         return function (action) {
//         }
//     }
// }

const consoleMessages = (store) => (next) => (action) => {
    let result;

    console.group()
    console.log(`dispatching action => ${ action.type }`);
    console.log(`skiDays:`, store.getState().allSkiDays.length);

    result = next(action);
    let {
        allSkiDays,
        goal,
        errors,
        resortNames
    } = store.getState();

    // ski days: ${JSON.stringify(allSkiDays)}
    console.log(`
        
        ski days num: ${allSkiDays.length}
        goal: ${goal}
        errors: ${errors}
        fetching: ${resortNames.fetching}
        suggestions: ${resortNames.suggestions}
    `)

    console.groupEnd();

    return result;
}

export default (initialState = {}) => {
    // return createStore(appReducers, initialState);
    return applyMiddleware(thunk, consoleMessages)(createStore)(appReducers, initialState)
}