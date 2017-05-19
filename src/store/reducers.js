import C from '../constants';
import { combineReducers } from 'redux';

export const goal = (state = 10, action) =>
    (action.type === C.SET_GOAL) ? parseInt(action.payload) : state

export const skiDay = (state = null, action) =>
    (action.type === C.ADD_DAY) ? action.payload : state

export const allSkiDays = (state = [], action) => {
    switch (action.type) {
        case C.ADD_DAY:

            /*
                'state.some()' checks if some items match specific 
                criteria in array. This is going to prevent to add 
                dupliates
             */
            const hasDay = state.some(skiDay => skiDay.date === action.payload.date)

            return (hasDay) ?
                state : [
                    ...state,
                    skiDay(null, action)
                ]
                .sort((a, b) => new Date(b.date) - new Date(a.date))

            break;
        case C.REMOVE_DAY:
            return state.filter(skiDay => skiDay.date !== action.payload)
            break;
        default:
            return state
    }
}

export const errors = (state = [], action) => {
    switch (action.type) {
        case C.ADD_ERROR:
            /* if there are any values in state array '...state'
               simply add them to new array [...state]
               additionally add a new value 'action.payloads'
             */
            return [
                ...state,
                action.payload
            ]
            break;
        case C.CLEAR_ERROR:
            /*
            predicate function if '=> i !== true' adds element to array, 
            if '=> i !== false' then it removes element from array 
            */
            return state.filter((errorMsg, i) => i !== action.payload)
            break;
        default:
            return state
    }
}

export const fetching = (state = false, action) => {
    switch (action.type) {
        case C.FETCH_RESORT_NAMES:
            return true
            break;
        case C.CANCEL_FETCHING:
            return false
            break;
        case C.CHANGE_SUGGESTIONS:
            return false
            break;
        default:
            return state
    }
}


export const suggestions = (state = [], action) => {

    switch (action.type) {
        case C.CLEAR_SUGGESTIONS:
            return []
            break;
        case C.CHANGE_SUGGESTIONS:
            return action.payload
            break;
        default:
            return state
    }
}

export default combineReducers({
    allSkiDays,
    goal,
    errors,
    resortNames: combineReducers({
        fetching,
        suggestions
    })
})