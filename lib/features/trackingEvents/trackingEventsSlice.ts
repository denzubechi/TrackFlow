import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface TrackingEvent {
  id: string
  locationDescription: string
  timestamp: string
  productId: string
  product?: {
    id: string
    name: string
    trackingId: string
  }
}

interface TrackingEventsState {
  events: TrackingEvent[]
  loading: boolean
  error: string | null
  selectedEvent: TrackingEvent | null
}

const initialState: TrackingEventsState = {
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
}

// Async thunks
export const fetchTrackingEvents = createAsyncThunk("trackingEvents/fetchTrackingEvents", async () => {
  const response = await fetch("/api/admin/tracking-events")
  if (!response.ok) {
    throw new Error("Failed to fetch tracking events")
  }
  return response.json()
})

export const createTrackingEvent = createAsyncThunk(
  "trackingEvents/createTrackingEvent",
  async (eventData: { locationDescription: string; productId: string }) => {
    const response = await fetch("/api/admin/tracking-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
    if (!response.ok) {
      throw new Error("Failed to create tracking event")
    }
    return response.json()
  },
)

export const updateTrackingEvent = createAsyncThunk(
  "trackingEvents/updateTrackingEvent",
  async ({ id, data }: { id: string; data: { locationDescription: string } }) => {
    const response = await fetch(`/api/admin/tracking-events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update tracking event")
    }
    return response.json()
  },
)

export const deleteTrackingEvent = createAsyncThunk("trackingEvents/deleteTrackingEvent", async (id: string) => {
  const response = await fetch(`/api/admin/tracking-events/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete tracking event")
  }
  return id
})

const trackingEventsSlice = createSlice({
  name: "trackingEvents",
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<TrackingEvent | null>) => {
      state.selectedEvent = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tracking events
      .addCase(fetchTrackingEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrackingEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
      })
      .addCase(fetchTrackingEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch tracking events"
      })
      // Create tracking event
      .addCase(createTrackingEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTrackingEvent.fulfilled, (state, action) => {
        state.loading = false
        state.events.push(action.payload)
      })
      .addCase(createTrackingEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create tracking event"
      })
      // Update tracking event
      .addCase(updateTrackingEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTrackingEvent.fulfilled, (state, action) => {
        state.loading = false
        const index = state.events.findIndex((e) => e.id === action.payload.id)
        if (index !== -1) {
          state.events[index] = action.payload
        }
      })
      .addCase(updateTrackingEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to update tracking event"
      })
      // Delete tracking event
      .addCase(deleteTrackingEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTrackingEvent.fulfilled, (state, action) => {
        state.loading = false
        state.events = state.events.filter((e) => e.id !== action.payload)
      })
      .addCase(deleteTrackingEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to delete tracking event"
      })
  },
})

export const { setSelectedEvent, clearError } = trackingEventsSlice.actions
export default trackingEventsSlice.reducer
