import axios from "axios";

import { useSelector } from "react-redux";

export const BaseUrl = "http://localhost:5000/api"

export const ImageUrl ='http://localhost:5000/assets/'


// const BaseUrl = "https://mmd-e-commerce-demo.herokuapp.com/api/";

const Token =()=>{
   return useSelector((state)=>state.user.token)
}

export const publicRequest = axios.create({ baseURL: BaseUrl });

export const userRequest = axios.create({
  baseURL: BaseUrl,
  header: {
    token: `Bearer ${Token}`,
  },
});