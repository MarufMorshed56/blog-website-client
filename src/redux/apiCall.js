import { loginFailure,loginStart, loginSuccess,logErrorMsg } from "./userRedux";
import { publicRequest } from "../components/axiosReqMethods";


// import { useDispatch } from "react-redux";
// we can't import dispatch here...  this is why we will import "useDispatch" in "login.js" &                   make "dispatch = useDispatch()" & sent it from there & here we will  get it inside "{ dispatch , user }", "dispatch" will contain "dispatch" i.e." useDispatch" &  "user" will contain the login data i.e. "username" & "password"


export const login = async(dispatch,user)=>{
          dispatch(loginStart()); // first do this 

          try { // then 2nd try doing this
                    const res = await publicRequest.post("/auth/login",user)
                    dispatch(loginSuccess(res.data))
//                     dispatch(logErrorMsg(res.data))

          } catch (error) {// if 2nd fails then do this
                    
                    dispatch(loginFailure())
          }
}