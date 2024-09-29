import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './rootReducer';
import { Persistor, persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
            ignoredActionPaths: ['register', 'rehydrate'],
            ignoredPaths: ['some.nested.path']
        }
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const persistor: Persistor = persistStore(store);

export const useDispatch = () => useReduxDispatch<AppDispatch>();
