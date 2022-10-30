import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemService from "./itemService";
const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createItem = createAsyncThunk("items/create", async (itemData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await itemService.createItem(itemData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateItem = createAsyncThunk("items/update", async (itemData, thunkAPI) => {
    const { id, itemName, quantity } = itemData;

    try {
        console.log("update token before ");
        const token = thunkAPI.getState().auth.user.token;
        var reqData = {
            itemName,
            quantity,
        };
        return await itemService.updateItem(id, reqData, token);
    } catch (error) {
        console.log("update item catch error " + JSON.stringify(error));
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteItem = createAsyncThunk("items/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await itemService.deleteItem(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getItems = createAsyncThunk("items/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await itemService.getItems(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items.push(action.payload);
            })
            .addCase(createItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getItems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = state.items.filter((item) => item._id !== action.payload.id);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = state.items.map(function(item) {
                    return item._id === action.payload._id ? action.payload : item;
                });
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
