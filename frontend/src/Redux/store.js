import { createStore, applyMiddleware } from "redux";
import { Reducer } from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

export const Store = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
