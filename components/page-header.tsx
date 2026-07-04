import Image from "next/image"

interface PageHeaderProps {
  title: string
  backgroundImage: string
  alt: string
}

export function PageHeader({ title, backgroundImage, alt }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-foreground/5 bg-black">
      <div className="relative h-[250px] sm:h-[350px] w-full flex items-center justify-center">
        <Image 
          src={backgroundImage || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover brightness-[0.35] scale-105 transition-transform duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/50" />
        
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic text-glow select-none animate-fade-in">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
