import {createSlice} from '@reduxjs/toolkit'

export const querySlice = createSlice({
          name:"query",
          initialState:{
                    posts:[],
          },
          reducers:{
                    addPost:(state,action)=>{
                              state.posts=(action.payload);
                    },
                    
          }
})

export const {addPost} = querySlice.actions

export  default querySlice.reducer