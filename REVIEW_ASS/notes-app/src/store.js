import { configureStore, createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    loading: false,
    items: [
      { id: 1, text: "Learn React", pinned: false },
      { id: 2, text: "Learn Redux", pinned: false },
    ],
  },
  reducers: {
    togglePin: (state, action) => {
      const note = state.items.find(
        (item) => item.id === action.payload
      );

      if (note) {
        note.pinned = !note.pinned;
      }
    },
  },
});

export const { togglePin } = notesSlice.actions;

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
});
export const notesReducer = notesSlice.reducer;