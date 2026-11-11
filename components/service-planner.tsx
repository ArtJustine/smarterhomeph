"use client"

import { useMemo, useState } from "react"
import { Minus, Plus, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROOMS, type ServicePlan } from "@/lib/service-plans"
import { cn } from "@/lib/utils"

type Counts = Record<string, Record<string, number>>

export function ServicePlanner({ plan }: { plan: ServicePlan }) {
  const [room, setRoom] = useState(ROOMS[0])
  const [counts, setCounts] = useState<Counts>({})

  const roomTotal = (r: string) => Object.values(counts[r] ?? {}).reduce((a, b) => a + b, 0)
  const grandTotal = useMemo(() => ROOMS.reduce((a, r) => a + roomTotal(r), 0), [counts]) // eslint-disable-line react-hooks/exhaustive-deps

  const change = (itemId: string, delta: number) =>
    setCounts((prev) => {
      const current = prev[room]?.[itemId] ?? 0
      const next = Math.max(0, Math.min(50, current + delta))
      return { ...prev, [room]: { ...prev[room], [itemId]: next } }
    })

  const chosenRooms = ROOMS.filter((r) => roomTotal(r) > 0)

  const send = () => {
    const rooms = chosenRooms.map((r) => ({
      name: r,
      devices: plan.items.filter((i) => (counts[r]?.[i.id] ?? 0) > 0).map((i) => `${counts[r][i.id]} × ${i.label}`),
    }))
    try {
      localStorage.setItem(
        "smarterhome_builder_config",
        JSON.stringify({ propertyType: plan.name, rooms, totalPrice: 0 }),
      )
    } catch {}
    window.location.href = "/contact"
  }

  const totalsByItem = plan.items
    .map((i) => ({ ...i, n: ROOMS.reduce((a, r) => a + (counts[r]?.[i.id] ?? 0), 0) }))
    .filter((i) => i.n > 0)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div>
        <p className="eyebrow mb-3">1. Pick a room</p>
        <div className="flex flex-wrap gap-2">
          {ROOMS.map((r) => {
            const n = roomTotal(r)
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRoom(r)}
                aria-pressed={room === r}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                  room === r ? "border-foreground bg-foreground text-background" : "bg-card hover:border-foreground/40",
                )}
              >
                {r}
                {n > 0 && (
                  <span className={cn("rounded-full px-1.5 font-mono text-[11px]", room === r ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary-ink")}>
                    {n}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <p className="eyebrow mb-3 mt-10">2. How many in the {room.toLowerCase()}?</p>
        <ul className="border-b">
          {plan.items.map((item) => {
            const n = counts[room]?.[item.id] ?? 0
            return (
              <li key={item.id} className="flex items-center justify-between gap-4 border-t py-4">
                <div className="min-w-0">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.hint}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Fewer ${item.label}`}
                    onClick={() => change(item.id, -1)}
                    disabled={n === 0}
                    className="flex h-9 w-9 items-center justify-center rounded-full border bg-card transition-colors hover:border-foreground/40 disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-mono text-lg" aria-live="polite">{n}</span>
                  <button
                    type="button"
                    aria-label={`More ${item.label}`}
                    onClick={() => change(item.id, 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border bg-card transition-colors hover:border-foreground/40"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-xl border bg-card p-6 lg:sticky lg:top-24">
        <p className="eyebrow">Your plan</p>
        {grandTotal === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Nothing yet. Pick a room and add items.</p>
        ) : (
          <>
            <p className="mt-2 font-display text-5xl leading-none">
              {grandTotal} <span className="text-lg text-muted-foreground">{plan.unit}</span>
            </p>
            <ul className="mt-5 space-y-4">
              {chosenRooms.map((r) => (
                <li key={r}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{r}</p>
                    <button
                      type="button"
                      aria-label={`Clear ${r}`}
                      onClick={() => setCounts((p) => ({ ...p, [r]: {} }))}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.items
                      .filter((i) => (counts[r]?.[i.id] ?? 0) > 0)
                      .map((i) => `${i.label} × ${counts[r][i.id]}`)
                      .join(", ")}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t pt-4 font-mono text-xs text-muted-foreground">
              {totalsByItem.map((i) => `${i.label} × ${i.n}`).join(" · ")}
            </p>
          </>
        )}
        <Button onClick={send} disabled={grandTotal === 0} size="lg" className="mt-6 h-12 w-full rounded-full">
          Request a quote <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">No prices here. We quote in writing after a quick call.</p>
      </aside>
    </div>
  )
}
