"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Complete fruit list - in real app this comes from database
const allFruits = [
  { id: 1, name: "Acai", available: true },
  { id: 2, name: "Acerola Cherry", available: true },
  { id: 3, name: "Ackee", available: false },
  { id: 4, name: "African Star Apple", available: true },
  { id: 5, name: "Aguaje", available: false },
  { id: 6, name: "Apple", available: true },
  { id: 7, name: "Apricot", available: true },
  { id: 8, name: "Avocado", available: true },
  { id: 9, name: "Banana", available: true },
  { id: 10, name: "Blackberry", available: true },
  { id: 11, name: "Blueberry", available: true },
  { id: 12, name: "Breadfruit", available: false },
  { id: 13, name: "Cacao", available: true },
  { id: 14, name: "Cantaloupe", available: true },
  { id: 15, name: "Cherry", available: true },
  { id: 16, name: "Coconut", available: true },
  { id: 17, name: "Custard Apple", available: true },
  { id: 18, name: "Date", available: true },
  { id: 19, name: "Dragon Fruit", available: true },
  { id: 20, name: "Durian", available: false },
  { id: 21, name: "Fig", available: true },
  { id: 22, name: "Goji Berry", available: true },
  { id: 23, name: "Grape", available: true },
  { id: 24, name: "Grapefruit", available: true },
  { id: 25, name: "Guava", available: true },
  { id: 26, name: "Honeydew", available: true },
  { id: 27, name: "Jackfruit", available: true },
  { id: 28, name: "Kiwi", available: true },
  { id: 29, name: "Kumquat", available: false },
  { id: 30, name: "Lemon", available: true },
  { id: 31, name: "Lime", available: true },
  { id: 32, name: "Lychee", available: true },
  { id: 33, name: "Mango", available: true },
  { id: 34, name: "Mangosteen", available: false },
  { id: 35, name: "Melon", available: true },
  { id: 36, name: "Mulberry", available: true },
  { id: 37, name: "Nectarine", available: true },
  { id: 38, name: "Orange", available: true },
  { id: 39, name: "Papaya", available: true },
  { id: 40, name: "Passion Fruit", available: true },
  { id: 41, name: "Peach", available: true },
  { id: 42, name: "Pear", available: true },
  { id: 43, name: "Persimmon", available: true },
  { id: 44, name: "Pineapple", available: true },
  { id: 45, name: "Plum", available: true },
  { id: 46, name: "Pomegranate", available: true },
  { id: 47, name: "Pomelo", available: true },
  { id: 48, name: "Raspberry", available: true },
  { id: 49, name: "Starfruit", available: true },
  { id: 50, name: "Strawberry", available: true },
  { id: 51, name: "Tamarind", available: false },
  { id: 52, name: "Tangerine", available: true },
  { id: 53, name: "Watermelon", available: true },
]

// Group fruits by first letter
function groupByLetter(fruits: typeof allFruits) {
  return fruits.reduce((acc, fruit) => {
    const letter = fruit.name[0].toUpperCase()
    if (!acc[letter]) {
      acc[letter] = []
    }
    acc[letter].push(fruit)
    return acc
  }, {} as Record<string, typeof allFruits>)
}

export default function FruitListPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFruits, setSelectedFruits] = useState<number[]>([])

  const filteredFruits = allFruits.filter(fruit =>
    fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedFruits = groupByLetter(filteredFruits)
  const sortedLetters = Object.keys(groupedFruits).sort()

  const toggleFruit = (id: number) => {
    setSelectedFruits(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FDF6F0] px-4 pb-2 pt-4">
        <div className="mx-auto max-w-lg">
          <Button
            variant="ghost"
            size="icon"
            className="mb-4 rounded-full"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <h1 className="mb-6 text-3xl font-bold text-foreground">
            CHOOSE<br />THE BEST ONE
          </h1>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-xl border-0 bg-white pl-11 text-base shadow-sm placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
      </header>

      {/* Fruit list */}
      <main className="px-4 pb-32">
        <div className="mx-auto max-w-lg">
          {sortedLetters.map(letter => (
            <div key={letter} className="mb-6">
              {/* Letter header */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground">
                  <span className="text-lg font-bold">{letter}</span>
                </div>
                <div className="h-px flex-1 bg-muted-foreground/20" />
              </div>

              {/* Fruits in this letter group */}
              <div className="space-y-2 pl-2">
                {groupedFruits[letter].map(fruit => (
                  <button
                    key={fruit.id}
                    onClick={() => fruit.available && toggleFruit(fruit.id)}
                    disabled={!fruit.available}
                    className={`block w-full text-left transition-colors ${
                      !fruit.available
                        ? "cursor-not-allowed opacity-40"
                        : selectedFruits.includes(fruit.id)
                        ? "text-[#C85050] font-semibold"
                        : "text-foreground hover:text-[#C85050]"
                    }`}
                  >
                    <span className="text-lg uppercase tracking-wide">{fruit.name}</span>
                    {!fruit.available && (
                      <span className="ml-2 text-xs text-muted-foreground">(unavailable)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {filteredFruits.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No fruits found</p>
            </div>
          )}
        </div>
      </main>

      {/* Done button */}
      {selectedFruits.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#FDF6F0] px-4 py-4">
          <div className="mx-auto max-w-lg">
            <Button
              className="w-full rounded-full bg-[#8B2323] py-6 text-lg font-semibold text-white hover:bg-[#6B1A1A]"
              onClick={() => {
                router.push("/user/browse")
              }}
            >
              DONE
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-sm">
                {selectedFruits.length}
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Letter quick navigation */}
      <div className="fixed right-2 top-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
          {sortedLetters.map(letter => (
            <button
              key={letter}
              onClick={() => {
                const el = document.getElementById(`letter-${letter}`)
                el?.scrollIntoView({ behavior: "smooth" })
              }}
              className="px-1 py-0.5 hover:text-foreground transition-colors"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
