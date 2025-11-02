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
            if (localStorage.getItem("base")) {
                const local: any = localStorage.getItem('base');
                const localBase: any = JSON.parse(local);
                const parseBase = state.base.concat(localBase);
                state.base = parseBase;
                localStorage.setItem('base', JSON.stringify(state.base));
            } else {
                localStorage.setItem('base', JSON.stringify(state.base));
            }
        },
        createProduct(state: any, action) {
            state.base.unshift(action.payload)
            localStorage.setItem('base', JSON.stringify(state.base))
        },
        addLike(state: any, action) {
            state.base[action.payload].like ++
            localStorage.setItem('base', JSON.stringify(state.base))
        },
        disLike(state: any, action) {
            state.base[action.payload].like --
            localStorage.setItem('base', JSON.stringify(state.base))
        },
        addFavorite(state: any, action) {
            state.base[action.payload].favorites = !state.base[action.payload].favorites;
            localStorage.setItem('base', JSON.stringify(state.base))
        },
        deleteBase (state: any, action) {
            state.base.splice(action.payload, 1)
            localStorage.setItem('base', JSON.stringify(state.base))
        },
        changeProduct (state: any, action) {
            state.base[action.payload.id].text = action.payload.text;
            localStorage.setItem('base', JSON.stringify(state.base))
        },
        clearBase (state: any) {
            localStorage.clear();
            state.base = [];
        },
    },
});


export const {addBase, addLike, disLike, addFavorite, deleteBase, createProduct, changeProduct, clearBase} = Slice.actions;

export default Slice.reducer;