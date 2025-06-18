import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cashbook from './Cashbook';
import { Provider } from "react-redux";
import "./App.css"

export const cashbookSlice = createSlice({
  name: 'cashbookSlice',
  initialState: { list: [] },
  reducers: {
    'add': (state, action) => { state.list.push({ id: action.payload.id, money: action.payload.money, type: action.payload.type }) },
    'delete': (state, action) => { state.list = state.list.filter(cashbook => cashbook.id !== action.payload.id) }
  }
})

function App() {

  const store = configureStore({
    reducer: {
      cashbook: cashbookSlice.reducer
    }
  })

  return (
    <div className="App">
      <h2>가계부</h2>
      <Provider store={store}>
        <Cashbook></Cashbook>
      </Provider>
    </div>
  );
}

export default App;
