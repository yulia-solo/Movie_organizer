import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';
import thunk from 'redux-thunk';

// export default createStore(reducer, 
//     applyMiddleware(thunk), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export default createStore(
//     reducer, /* preloadedState, */
// //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

