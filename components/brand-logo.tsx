import { cn } from "@/lib/utils"

/** Logo files live in /public/brands. Brands without a file fall back to a plain wordmark. */
const logos: Record<string, string> = {
  Aqara: "/brands/aqara.svg",
  Govee: "/brands/govee.svg",
  Eve: "/brands/eve.svg",
  Reolink: "/brands/reolink.svg",
  Abode: "/brands/abode.svg",
  YoLink: "/brands/yolink.svg",
  "TP-Link": "/brands/tp-link.svg",
  Philips: "/brands/philips.svg",
}

/** These files are icon marks only, so the brand name is shown beside them. */
const iconOnly = new Set(["TP-Link", "Philips"])

interface BrandLogoProps {
  name: string
  /** Tailwind height class for the image, e.g. "h-5" */
  heightClass?: string
  className?: string
}

export function BrandLogo({ name, heightClass = "h-5", className }: BrandLogoProps) {
  const src = logos[name]

  if (!src) {
    return <span className={cn("font-display text-lg leading-none", className)}>{name}</span>
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={iconOnly.has(name) ? "" : `${name} logo`}
      loading="lazy"
      className={cn("w-auto max-w-[7rem] object-contain object-left", heightClass, iconOnly.has(name) ? "" : className)}
    />
  )

  if (!iconOnly.has(name)) return img

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {img}
      <span className="font-display text-lg leading-none">{name}</span>
    </span>
  )
}
