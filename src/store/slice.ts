import { createSlice } from "@reduxjs/toolkit";


const Slice = createSlice({
    name: 'Name',
    initialState:{
        base: [],
    },
    reducers: {
        addBase(state, action) {
            state.base = action.payload.map((item:string) => ({
                text: item,
                like: 0,
                favorites: false,
            }));
        },
        createProduct(state: any, action) {
            state.base.unshift(action.payload)
        },
        addLike(state: any, action) {
            state.base[action.payload].like ++
        },
        disLike(state: any, action) {
            state.base[action.payload].like --
        },
        addFavorite(state: any, action) {
            state.base[action.payload].favorites = !state.base[action.payload].favorites;
        },
        deleteBase (state: any, action) {
            state.base.splice(action.payload, 1)
        },
        changeProduct (state: any, action) {
            state.base[action.payload.id].text = action.payload.text;
        }
    }
});


export const {addBase, addLike, disLike, addFavorite, deleteBase, createProduct, changeProduct} = Slice.actions;

export default Slice.reducer;