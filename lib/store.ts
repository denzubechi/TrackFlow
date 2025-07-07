import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./features/products/productsSlice"
import trackingEventsReducer from "./features/trackingEvents/trackingEventsSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    trackingEvents: trackingEventsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
