import { configureStore, combineReducers } from '@reduxjs/toolkit';

import mapSlice from './slices/mapSlice';

const rootReducer = combineReducers({
  mapSlice,
});

// Configure middleware used by redux
let middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
