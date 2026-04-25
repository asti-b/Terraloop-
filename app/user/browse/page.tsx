"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, ChevronLeft, Bookmark, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data - in real app this comes from grocer uploads
const fruits = [
  {
    id: 1,
    name: "Pomelos",
    category: "Citrus",
    price: 5.99,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=400&h=400&fit=crop",
    bgColor: "bg-[#E8A090]",
    grocerId: "grocer-1",
    description: "Fresh and juicy pomelos from local farms"
  },
  {
    id: 2,
    name: "Peach",
    category: "Stone Fruit",
    price: 4.50,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1629828874514-c1e5e47c0ea5?w=400&h=400&fit=crop",
    bgColor: "bg-[#F5C4A9]",
    grocerId: "grocer-1",
    description: "Sweet organic peaches"
  },
  {
    id: 3,
    name: "Strawberry",
    category: "Berries",
    price: 6.99,
    unit: "per box",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    bgColor: "bg-[#E88070]",
    grocerId: "grocer-2",
    description: "Farm fresh strawberries"
  },
  {
    id: 4,
    name: "Raspberry",
    category: "Berries",
    price: 7.99,
    unit: "per box",
    image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&h=400&fit=crop",
    bgColor: "bg-[#C85050]",
    grocerId: "grocer-2",
    description: "Premium raspberries"
  },
  {
    id: 5,
    name: "Papaya",
    category: "Tropical",
    price: 8.40,
    unit: "per piece",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop",
    bgColor: "bg-[#E87040]",
    grocerId: "grocer-1",
    description: "Organically grown papayas from local farms"
  },
  {
    id: 6,
    name: "Mango",
    category: "Tropical",
    price: 3.99,
    unit: "per piece",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    bgColor: "bg-[#F5B060]",
    grocerId: "grocer-3",
    description: "Sweet Alphonso mangoes"
  },
]

export default function UserBrowsePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([])

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fruit.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FDF6F0] px-4 py-4">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-full"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="choose a fruit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-full border-0 bg-[#EDE5DD] pl-11 pr-12 text-base placeholder:text-muted-foreground/70"
              />
              <Button
                size="icon"
                className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#F5F0EA] hover:bg-[#EDE5DD]"
              >
                <ArrowRight className="h-4 w-4 text-foreground" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-full relative"
              onClick={() => router.push("/user/cart")}
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Fruit Grid */}
      <main className="px-4 pb-8">
        <div className="mx-auto max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            {filteredFruits.map((fruit, index) => (
              <div
                key={fruit.id}
                className="relative cursor-pointer"
                onClick={() => router.push(`/user/fruit/${fruit.id}`)}
              >
                {/* Card */}
                <div className={`${fruit.bgColor} rounded-3xl p-4 pb-14 transition-transform hover:scale-[1.02]`}>
                  {/* Bookmark button */}
                  <button
                    onClick={(e) => toggleBookmark(fruit.id, e)}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-black/80 transition-colors hover:bg-black"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${bookmarkedIds.includes(fruit.id) ? "fill-white text-white" : "text-white"}`}
                    />
                  </button>

                  {/* Fruit image */}
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={fruit.image}
                      alt={fruit.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Fruit name */}
                  <div className="mt-3">
                    <p className="text-sm text-white/80 italic">The</p>
                    <h3 className="text-xl font-bold text-white">{fruit.name}</h3>
                  </div>
                </div>

                {/* Index badge */}
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EDE5DD] text-lg font-medium text-foreground shadow-sm">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {filteredFruits.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No fruits found</p>
              <p className="mt-1 text-sm text-muted-foreground/70">Try a different search term</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating action button */}
      <button 
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg transition-transform hover:scale-110"
        onClick={() => router.push("/user/list")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
