import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  globalParams: [],
  filters: {
    location: "",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [-118.25, 34.05],
    checkIn: null,
    checkOut: null,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    },
    guestCount: 0,
  },
  isFiltersFullOpen: false,
  viewMode: "list",
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalParams: (state, action) => {
      if (!action.payload) {
        state.globalParams = undefined;
      } else {
        const existingParams = state.globalParams || [];
        const newParams = action.payload;
        const filteredExisting = existingParams.filter(
          (existing) =>
            !newParams.some((newParam) => newParam.name === existing.name)
        );
        state.globalParams = [...filteredExisting, ...newParams];
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };

      // Auto-calculate guestCount whenever guests change
      if (action.payload.guests) {
        state.filters.guestCount =
          (action.payload.guests.adults || state.filters.guests.adults) +
          (action.payload.guests.children || state.filters.guests.children);
      }
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setGlobalParams,
  setFilters,
  toggleFiltersFullOpen,
  setViewMode,
} = globalSlice.actions;
export const selectGlobalParams = (state) => state.global.globalParams;
export const selectFilters = (state) => state.global.filters;
export default globalSlice.reducer;
