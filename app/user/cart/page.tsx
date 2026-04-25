"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock cart data
const initialCartItems = [
  {
    id: 5,
    name: "Papaya",
    price: 8.40,
    quantity: 1,
    weight: "1.0 KG TO 1.2 KG",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=200&h=200&fit=crop",
  },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FDF6F0] px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Your Bag</h1>
          <div className="ml-auto rounded-full bg-muted px-3 py-1 text-sm font-medium">
            {cartItems.length} items
          </div>
        </div>
      </header>

      {/* Cart items */}
      <main className="px-4 pb-48">
        <div className="mx-auto max-w-lg">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">Your bag is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Start adding some fresh fruits!</p>
              <Button
                className="mt-6 rounded-full"
                onClick={() => router.push("/user/browse")}
              >
                Browse Fruits
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  {/* Image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.weight}</p>
                    <p className="mt-1 font-bold text-foreground">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2 rounded-full bg-muted px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Checkout section */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 rounded-t-3xl bg-white px-6 py-6 shadow-2xl">
          <div className="mx-auto max-w-lg">
            {/* Price breakdown */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Button
              className="w-full rounded-full bg-[#8B2323] py-6 text-lg font-semibold text-white hover:bg-[#6B1A1A]"
              onClick={() => alert("Checkout coming soon!")}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
