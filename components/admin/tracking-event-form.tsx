"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { createTrackingEvent, updateTrackingEvent, clearError } from "@/lib/features/trackingEvents/trackingEventsSlice"
import { fetchProducts } from "@/lib/features/products/productsSlice"
import type { TrackingEvent } from "@/lib/features/trackingEvents/trackingEventsSlice"

interface TrackingEventFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: TrackingEvent | null
}

export function TrackingEventForm({ open, onOpenChange, event }: TrackingEventFormProps) {
  const [locationDescription, setLocationDescription] = useState("")
  const [productId, setProductId] = useState("")
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.trackingEvents)
  const { products } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (open) {
      dispatch(fetchProducts())
      dispatch(clearError())
    }
  }, [open, dispatch])

  useEffect(() => {
    if (event) {
      setLocationDescription(event.locationDescription)
      setProductId(event.productId)
    } else {
      setLocationDescription("")
      setProductId("")
    }
  }, [event])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!locationDescription.trim() || (!event && !productId)) {
      return
    }

    try {
      if (event) {
        await dispatch(
          updateTrackingEvent({
            id: event.id,
            data: { locationDescription: locationDescription.trim() },
          }),
        ).unwrap()
      } else {
        await dispatch(
          createTrackingEvent({
            locationDescription: locationDescription.trim(),
            productId,
          }),
        ).unwrap()
      }

      onOpenChange(false)
      setLocationDescription("")
      setProductId("")
    } catch (error) {
      // Error is handled by Redux
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Location Update" : "Add Location Update"}</DialogTitle>
          <DialogDescription>
            {event ? "Update the location information below." : "Add a new location update for tracking."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!event && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Product
                </Label>
                <Select value={productId} onValueChange={setProductId} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.trackingId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={locationDescription}
                onChange={(e) => setLocationDescription(e.target.value)}
                className="col-span-3"
                placeholder="Package location description"
                required
              />
            </div>
            {error && <div className="col-span-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : event ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
