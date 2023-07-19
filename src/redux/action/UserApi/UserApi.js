import axios from "axios";
import {
    USERAPI_FAIL,
    USERAPI_REQUEST,
    USERAPI_SUCCESS,
  } from "../../constant/UserApi/UserApi";
  import config from '../../../config'
const fetchPlan = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: USERAPI_REQUEST });
        const data = await axios.get(`${config.API_URL}/plan/get`);
        const companyData = data.data;
        dispatch({ type: USERAPI_SUCCESS, payload: companyData });
      } catch (err) {
          dispatch({ type: USERAPI_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetchPlan}