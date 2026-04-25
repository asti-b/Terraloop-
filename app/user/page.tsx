"use client"

import { useRouter } from "next/navigation"
import { MapPin, ShoppingBag, Search, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

// Featured categories
const categories = [
  { name: "Citrus", color: "bg-[#F5B060]", icon: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=100&h=100&fit=crop" },
  { name: "Berries", color: "bg-[#C85050]", icon: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100&h=100&fit=crop" },
  { name: "Tropical", color: "bg-[#E87040]", icon: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop" },
  { name: "Stone Fruit", color: "bg-[#F5C4A9]", icon: "https://images.unsplash.com/photo-1629828874514-c1e5e47c0ea5?w=100&h=100&fit=crop" },
]

// Featured items preview
const featuredFruits = [
  {
    id: 5,
    name: "Papaya",
    price: 8.40,
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=200&h=200&fit=crop",
    bgColor: "bg-[#E87040]",
  },
  {
    id: 6,
    name: "Mango",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&fit=crop",
    bgColor: "bg-[#F5B060]",
  },
]

export default function UserHomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#5B2D7A]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-white/80" />
          <span className="text-sm font-medium text-white">1084 Pacific Str</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-white/10"
          onClick={() => router.push("/user/cart")}
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </header>

      {/* Hero section */}
      <div className="px-6 pb-8 pt-4">
        <h1 className="text-4xl font-bold leading-tight text-white">
          EXOTIC<br />
          FRUITS OF<br />
          THE WORLD
        </h1>
      </div>

      {/* Categories */}
      <div className="px-4 pb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => router.push("/user/browse")}
              className={`${cat.color} flex shrink-0 flex-col items-center rounded-2xl px-5 py-3 transition-transform hover:scale-105`}
            >
              <div className="mb-2 h-12 w-12 overflow-hidden rounded-full">
                <img src={cat.icon} alt={cat.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-xs font-semibold uppercase text-white">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content card */}
      <div className="rounded-t-[2.5rem] bg-[#FDF6F0] px-6 pb-8 pt-8">
        {/* Search bar */}
        <button
          onClick={() => router.push("/user/browse")}
          className="mb-8 flex w-full items-center gap-3 rounded-full bg-white px-5 py-4 shadow-sm transition-colors hover:bg-muted"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Search fresh fruits...</span>
        </button>

        {/* Featured section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Featured Today</h2>
          <button
            onClick={() => router.push("/user/browse")}
            className="text-sm font-medium text-[#C85050]"
          >
            See all
          </button>
        </div>

        {/* Featured fruits */}
        <div className="grid grid-cols-2 gap-4">
          {featuredFruits.map((fruit) => (
            <button
              key={fruit.id}
              onClick={() => router.push(`/user/fruit/${fruit.id}`)}
              className={`${fruit.bgColor} rounded-3xl p-4 text-left transition-transform hover:scale-[1.02]`}
            >
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-bold text-white">{fruit.name}</h3>
                <p className="text-sm text-white/80">${fruit.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Browse all button */}
        <Button
          className="mt-8 w-full rounded-full bg-[#5B2D7A] py-6 text-base font-semibold text-white hover:bg-[#4A2463]"
          onClick={() => router.push("/user/browse")}
        >
          Browse All Fruits
        </Button>

        {/* Quick links */}
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => router.push("/user/list")}
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <span className="text-lg font-bold">A-Z</span>
            </div>
            <span className="text-xs">All Fruits</span>
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <Leaf className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xs">Freshness AI</span>
          </button>
        </div>
      </div>
    </div>
  )
}
