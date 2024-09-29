import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as userReducer } from './slices/user.slice';

const persistConfig = {
    key: 'employees',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
