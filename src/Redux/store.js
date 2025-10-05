import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { baseApi } from "./baseApi";
import globalReducer from "./Slices/globalSlice";
import reportReducer from "./Slices/reportSlice";

const reportPersistConfig = {
  key: "report",
  storage,
};

const persistedReportReducer = persistReducer(
  reportPersistConfig,
  reportReducer
);

const globalPersistConfig = {
  key: "global",
  storage,
};
const persistedGlobalReducer = persistReducer(
  globalPersistConfig,
  globalReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    report: persistedReportReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
