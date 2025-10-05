import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBillTransfer, IPickUp } from "../../types/report";
import { RootState } from "../store";

interface InitialStateTypes {
  pickupInformation: IPickUp[] | undefined;
  billTransfer?: IBillTransfer[] | undefined;
}

export const initialState: InitialStateTypes = {
  pickupInformation: [],
  // billTransfer: [],
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setPickupInformation: (
      state,
      action: PayloadAction<IPickUp[] | undefined>
    ) => {
      state.pickupInformation = action.payload;
    },
    setBillTransfer: (
      state,
      action: PayloadAction<IBillTransfer[] | undefined>
    ) => {
      state.billTransfer = action.payload;
    },
  },
});

export const { setBillTransfer } = reportSlice.actions;
export const selectBillTransfer = (state: RootState) =>
  state.report.billTransfer;
export const { setPickupInformation } = reportSlice.actions;
export const selectPickupInformation = (state: RootState) =>
  state.report.pickupInformation;
export default reportSlice.reducer;
