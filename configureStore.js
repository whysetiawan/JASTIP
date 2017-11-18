import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate, storages } from 'redux-persist';
import allReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [thunk,logger]

const store = createStore(
	allReducer,
	undefined,
	compose(
		applyMiddleware(...middleware),
		autoRehydrate()
	)
)
	persistStore(store, { storage:AsyncStorage })

export default store;