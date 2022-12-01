import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const myPersistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(myPersistedReducer)

export const persistor = persistStore(store)
export default store