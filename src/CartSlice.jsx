import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if(existingItem){
        existingItem.quantity++;
      }else{
        state.items.push({ name, image, cost, quantity:1 })
      }
    },
    removeItem: (state, action) => {
      // payload传商品name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if(itemToUpdate){
        itemToUpdate.quantity = quantity;
      }
    }
  }
})

// 导出action，组件中使用
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
// 默认导出reducer，供store.js导入
export default cartSlice.reducer;
