import { configureStore, combineReducers} from "@reduxjs/toolkit";

import userSliceReducer from "./userRedux"
import querySliceReducer  from "./queryRedux";

import{
          persistStore,
          persistReducer,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistConfig = {
          key: 'root',
          version: 1,
          storage,
}

const rootReducer = combineReducers({ user: userSliceReducer, query: querySliceReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer)


//......................................//

export const store = configureStore({
          reducer: persistedReducer,
})

export const persistor = persistStore(store)

