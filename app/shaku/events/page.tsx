"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { TrackingEventForm } from "@/components/admin/tracking-event-form"
import Navbar from "../../../navbar"
import Footer from "../../../footer"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchTrackingEvents, deleteTrackingEvent } from "@/lib/features/trackingEvents/trackingEventsSlice"
import type { TrackingEvent } from "@/lib/features/trackingEvents/trackingEventsSlice"

export default function TrackingEventsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<TrackingEvent | null>(null)
  const [deletingEvent, setDeletingEvent] = useState<TrackingEvent | null>(null)
  const dispatch = useAppDispatch()
  const { events, loading, error } = useAppSelector((state) => state.trackingEvents)

  useEffect(() => {
    dispatch(fetchTrackingEvents())
  }, [dispatch])

  const handleEdit = (event: TrackingEvent) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleDelete = async (event: TrackingEvent) => {
    try {
      await dispatch(deleteTrackingEvent(event.id)).unwrap()
      setDeletingEvent(null)
    } catch (error) {
      // Error is handled by Redux
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEvent(null)
  }

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isAdmin />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading tracking events...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Location Updates</h1>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location Update
            </Button>
          </div>

          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

          <Card>
            <CardHeader>
              <CardTitle>All Location Updates</CardTitle>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No location updates found.</p>
                  <Button className="mt-4" onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Location Update
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{event.product?.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {event.product?.trackingId}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate">{event.locationDescription}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{new Date(event.timestamp).toLocaleDateString()}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setDeletingEvent(event)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      <TrackingEventForm open={showForm} onOpenChange={handleFormClose} event={editingEvent} />

      <Dialog open={!!deletingEvent} onOpenChange={() => setDeletingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Location Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this location update? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingEvent(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingEvent && handleDelete(deletingEvent)}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
