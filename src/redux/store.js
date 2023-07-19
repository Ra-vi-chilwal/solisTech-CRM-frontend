import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userInfoReducer } from "./reducer/user";
import {fetchRoleReducer} from './reducer/role/role';
import {fetchCompanyReducer} from './reducer/company/company';
import {fetchPlanReducer} from './reducer/plan/plan';
const initialState = {};
const reducer = combineReducers({
  userInfo: userInfoReducer,
 RoleData: fetchRoleReducer,
 companyInfo : fetchCompanyReducer,
 planInfo : fetchPlanReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);
export default Store;
