"use client"

import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ShoppingBag, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock data - in real app this comes from grocer uploads via database
const fruitsData: Record<string, {
  id: number
  name: string
  category: string
  price: number
  unit: string
  weight: string
  image: string
  bgColor: string
  grocerName: string
  grocerAddress: string
  description: string
  about: string[]
}> = {
  "1": {
    id: 1,
    name: "Pomelos",
    category: "Citrus",
    price: 5.99,
    unit: "per kg",
    weight: "0.8 KG TO 1.2 KG",
    image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=600&h=600&fit=crop",
    bgColor: "bg-[#E8A090]",
    grocerName: "Fresh Farms",
    grocerAddress: "1084 Pacific Str",
    description: "Fresh and juicy pomelos from local farms",
    about: [
      "Our pomelos are organically grown on a farm in Thailand.",
      "They are known for their sweet, mild citrus flavor.",
      "Perfect for salads, desserts, or eating fresh."
    ]
  },
  "2": {
    id: 2,
    name: "Peach",
    category: "Stone Fruit",
    price: 4.50,
    unit: "per kg",
    weight: "0.3 KG TO 0.5 KG",
    image: "https://images.unsplash.com/photo-1629828874514-c1e5e47c0ea5?w=600&h=600&fit=crop",
    bgColor: "bg-[#F5C4A9]",
    grocerName: "Organic Valley",
    grocerAddress: "256 Market Street",
    description: "Sweet organic peaches",
    about: [
      "Hand-picked from organic orchards.",
      "Sweet and juicy with a perfect texture.",
      "Great for pies, smoothies, or fresh eating."
    ]
  },
  "3": {
    id: 3,
    name: "Strawberry",
    category: "Berries",
    price: 6.99,
    unit: "per box",
    weight: "250g Box",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop",
    bgColor: "bg-[#E88070]",
    grocerName: "Berry Best",
    grocerAddress: "789 Garden Lane",
    description: "Farm fresh strawberries",
    about: [
      "Freshly picked every morning.",
      "Rich in antioxidants and vitamin C.",
      "Perfect for desserts, smoothies, or snacking."
    ]
  },
  "4": {
    id: 4,
    name: "Raspberry",
    category: "Berries",
    price: 7.99,
    unit: "per box",
    weight: "200g Box",
    image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=600&h=600&fit=crop",
    bgColor: "bg-[#C85050]",
    grocerName: "Berry Best",
    grocerAddress: "789 Garden Lane",
    description: "Premium raspberries",
    about: [
      "Premium quality raspberries.",
      "Delicate and sweet with a slight tartness.",
      "Excellent for jams, desserts, or fresh eating."
    ]
  },
  "5": {
    id: 5,
    name: "Papaya",
    category: "Tropical",
    price: 8.40,
    unit: "per piece",
    weight: "1.0 KG TO 1.2 KG",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=600&h=600&fit=crop",
    bgColor: "bg-[#E87040]",
    grocerName: "Tropical Delights",
    grocerAddress: "1084 Pacific Str",
    description: "Organically grown papayas",
    about: [
      "Our papayas are organically grown on a farm in St Lucia.",
      "They are known for their yellow to orange flesh and sweet taste.",
      "Rich in vitamins A, C, and digestive enzymes."
    ]
  },
  "6": {
    id: 6,
    name: "Mango",
    category: "Tropical",
    price: 3.99,
    unit: "per piece",
    weight: "0.3 KG TO 0.5 KG",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop",
    bgColor: "bg-[#F5B060]",
    grocerName: "Exotic Fruits Co",
    grocerAddress: "432 Sunshine Blvd",
    description: "Sweet Alphonso mangoes",
    about: [
      "Premium Alphonso mangoes from India.",
      "Known as the king of mangoes for their rich flavor.",
      "Perfect ripeness guaranteed."
    ]
  },
}

export default function FruitDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const fruit = fruitsData[params.id as string]

  if (!fruit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDF6F0]">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Fruit not found</p>
          <Button variant="link" onClick={() => router.back()}>Go back</Button>
        </div>
      </div>
    )
  }

  const totalPrice = (fruit.price * quantity).toFixed(2)

  return (
    <div className={`min-h-screen ${fruit.bgColor}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 text-white hover:bg-white/30"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 text-white hover:bg-white/30"
          onClick={() => router.push("/user/cart")}
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </header>

      {/* Fruit name */}
      <div className="px-6 pb-4 pt-2">
        <h1 className="text-center text-4xl font-bold uppercase tracking-wider text-white">
          {fruit.name}
        </h1>
      </div>

      {/* Fruit image */}
      <div className="px-6">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={fruit.image}
            alt={fruit.name}
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>

      {/* Price and weight */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-sm uppercase text-white/80">{fruit.name} 1PC</p>
          <p className="text-xs text-white/60">({fruit.weight})</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">
            <span className="text-lg align-top">$</span>{fruit.price.toFixed(1)}
          </p>
        </div>
      </div>

      {/* About section */}
      <div className="rounded-t-[2.5rem] bg-white px-6 pb-32 pt-8">
        <h2 className="mb-6 text-3xl font-bold text-foreground">ABOUT</h2>
        
        <div className="space-y-4">
          {fruit.about.map((paragraph, index) => (
            <div key={index} className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
            </div>
          ))}
        </div>

        {/* Grocer info */}
        <div className="mt-8 rounded-2xl bg-muted/50 p-4">
          <p className="text-xs font-medium uppercase text-muted-foreground">Sold by</p>
          <p className="mt-1 font-semibold text-foreground">{fruit.grocerName}</p>
          <p className="text-sm text-muted-foreground">{fruit.grocerAddress}</p>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 rounded-full bg-muted px-3 py-2">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-muted"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to bag button */}
          <Button
            className="flex-1 rounded-full bg-[#FDF6F0] py-6 text-foreground hover:bg-[#EDE5DD]"
            onClick={() => {
              // Add to cart logic
              alert(`Added ${quantity}x ${fruit.name} to bag!`)
            }}
          >
            <span className="mr-auto font-semibold">ADD TO BAG</span>
            <span className="font-bold">${totalPrice}</span>
            <ShoppingBag className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
