const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger();

const BUY_CAKES = 'BUY_CAKES'
const BUY_ICECREAMS = 'BUY_ICECREAMS'

function buyCake() {
    return {
        type: BUY_CAKES,
        info: 'buy cake reducer action'
    }
}

function buyIceCreams() {
    return {
        type: BUY_ICECREAMS,
        info: 'buy ice-cream reducer action'
    }
}

const initialStateBuyCakes = {
    numOfCakes: 10
}

const initialStateBuyIceCreams = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialStateBuyCakes, action) => {
    switch (action.type) {
        case BUY_CAKES:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

const icecreamReducer = (state = initialStateBuyIceCreams, action) => {
    switch (action.type) {
        case BUY_ICECREAMS:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 2
            }
        default:
            return state
    }
}

//*Combining Multiple Reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCreams())
store.dispatch(buyCake())
store.dispatch(buyIceCreams())
store.dispatch(buyIceCreams())
store.dispatch(buyCake())
store.dispatch(buyIceCreams())
unsubscribe()
