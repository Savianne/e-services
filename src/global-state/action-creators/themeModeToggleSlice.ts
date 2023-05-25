import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: { mode: "light" | 'dark' } = {
    mode: 'dark'
}; 

export const themeModeToggleSlice = createSlice({
  name: 'themeModeToggle',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleLightMode: (state) => {
      state.mode = 'light'
    },
    toggleDarkMode: (state) => {
        state.mode = 'dark'
    },
  },
})

export const { toggleDarkMode, toggleLightMode } = themeModeToggleSlice.actions


export default themeModeToggleSlice
.reducer