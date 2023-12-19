import { configureStore } from '@reduxjs/toolkit';
import storeSliceReducer from './Slice'

export const store = configureStore({
    reducer: {
        store: storeSliceReducer
    },
});
