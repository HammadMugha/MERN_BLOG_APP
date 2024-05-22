import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = { loading: false} 

const counterSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader:(state,action)=> {
      state.loading = action.payload 
    }
  },
})

export const { setLoader } = counterSlice.actions
export default counterSlice.reducer