import C from './constants';

/*store.dispatch( addDay("Mt Shasta", "2016-12-19") );
expect(store.getState().allSkiDays).toEqual([{"resort":"Mt Shasta","date":"2016-12-19","powder":false,"backcountry":false}])*/

export const addDay = (resort, date, powder = false, backcountry = false) => {
    //Add app logic here, not in reducers
    return {
        type: C.ADD_DAY,
        payload: {
            resort,
            date,
            powder,
            backcountry
        }
    }
}

/*store.dispatch( removeDay("2016-12-19") )
expect(store.getState().allSkiDays).toEqual([])*/

export const removeDay = function (date) {
    //Add app logic here, not in reducers
    return {
        type: C.REMOVE_DAY,
        payload: date
    }
}

/*store.dispatch( setGoal(55) )
expect(store.getState().goal).toEqual(55)*/
//returns object so we can use shortcut

export const setGoal = (goal) =>
    ({
        type: C.SET_GOAL,
        payload: goal
    })

/*store.dispatch( addError("Something went wrong") );
expect(store.getState().errors).toEqual(["Something went wrong"])*/

export const addError = (errorMessage) => {
    //Add app logic here, not in reducers
    return {
        type: C.ADD_ERROR,
        payload: errorMessage
    }
}

/*store.dispatch( clearError(0) );
expect(store.getState().errors).toEqual([])*/

export const clearError = (id) => {
    //Add app logic here, not in reducers
    return {
        type: C.CLEAR_ERROR,
        payload: id
    }
}

/*store.dispatch( changeSuggestions(["one", "two", "three"]) );
expect(store.getState().resortNames.suggestions).toEqual(["one", "two", "three"])*/

export const changeSuggestions = (suggestions) => {
    //Add app logic here, not in reducers
    return {
        type: C.CHANGE_SUGGESTIONS,
        payload: suggestions
    }
}

/*store.dispatch( clearSuggestions(0) );
expect(store.getState().resortNames.suggestions).toEqual([])*/

export const clearSuggestions = () => {
    //Add app logic here, not in reducers
    return {
        type: C.CLEAR_SUGGESTIONS
    }
}

export const suggestResortName = (searchTxt) => {

    return (dispatch, getState=null) =>{

        dispatch({type:C.FETCH_RESORT_NAMES})
        //call url
        fetch('http://localhost:3333/resorts/' + searchTxt) 
        //then return response as response json object
        .then( response => response.json()) 
        //then return array which call suugestions and use this array
        .then( suggestionsArr => {
            //and 
            dispatch({type: C.CHANGE_SUGGESTIONS, payload: suggestionsArr})
        })
        //catch errors
        .catch( errorsMsg => {

            dispatch(addError(errorsMsg))
            dispatch({type:C.CANCEL_FETCHING})
        }) 
    }
}

/*
    Using thunk function (dispatch, getState){}
*/

export const randomGoals = () => {

    return (dispatch, getState) => {

        if (!getState().resortNames.fetching) {
            dispatch({
                type: C.FETCH_RESORT_NAMES
            })

            setTimeout(() => {
                dispatch({type: C.CANCEL_FETCHING})
            }, 1500)
        }
    }
}