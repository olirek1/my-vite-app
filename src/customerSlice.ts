import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
}

interface CustomerState {
  customers: Customer[];
}

const initialState: CustomerState = {
  customers: [
    { id: '1', name: 'John Doe'},
    { id: '2', name: 'Jane Smith' },
  ],
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        removeCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
    },
});

export const { addCustomer, removeCustomer } = customerSlice.actions;
export default customerSlice.reducer;