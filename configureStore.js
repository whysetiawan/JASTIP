import { createStore, applyMiddleware } from 'redux'
import allReducer from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default configureStore = () => {
  let store = createStore(
  	allReducer,
  	applyMiddleware(thunk,logger)
  	 )
  return store
}