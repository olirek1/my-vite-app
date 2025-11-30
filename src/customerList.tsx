import { useState } from 'react';
import { useAppSelector, useAppDispatch } from './hooks'; // Import our typed hooks
import { addCustomer, removeCustomer } from './customerSlice';
import type { Customer } from './customerSlice';

export default function CustomerList() {
  const [nameInput, setNameInput] = useState<string>('');
  
  // TS knows 'state' is RootState automatically!
  const customers = useAppSelector((state) => state.custom.customers);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (!nameInput) return;
    
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: nameInput
    };

    dispatch(addCustomer(newCustomer));
    setNameInput('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee List ({customers.length})</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="New Customer Name"
        />
        <button onClick={handleAdd}>Add Customer</button>
      </div>

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} 
            <button 
              onClick={() => dispatch(removeCustomer(customer.id))}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}