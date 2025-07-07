"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createProduct,
  updateProduct,
  clearError,
} from "@/lib/features/products/productsSlice";
import type { Product } from "@/lib/features/products/productsSlice";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export function ProductForm({ open, onOpenChange, product }: ProductFormProps) {
  const [name, setName] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setTrackingId(product.trackingId);
    } else {
      setName("");
      setTrackingId("");
    }
  }, [product]);

  useEffect(() => {
    if (open) {
      dispatch(clearError());
    }
  }, [open, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !trackingId.trim()) {
      return;
    }

    try {
      if (product) {
        await dispatch(
          updateProduct({
            id: product.id,
            data: { name: name.trim(), trackingId: trackingId.trim() },
          })
        ).unwrap();
      } else {
        await dispatch(
          createProduct({
            name: name.trim(),
            trackingId: trackingId.trim(),
          })
        ).unwrap();
      }

      onOpenChange(false);
      setName("");
      setTrackingId("");
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Update the product details below."
              : "Create a new product for tracking."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Product name"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trackingId" className="text-right">
                Tracking ID
              </Label>
              <Input
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="col-span-3"
                placeholder="TF123456789"
                required
              />
            </div>
            {error && (
              <div className="col-span-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : product ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
