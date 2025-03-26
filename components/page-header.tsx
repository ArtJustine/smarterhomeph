import Image from "next/image"

interface PageHeaderProps {
  title: string
  backgroundImage: string
  alt: string
}

export function PageHeader({ title, backgroundImage, alt }: PageHeaderProps) {
  return (
    <section className="relative">
      <div className="relative h-[300px] sm:h-[400px] w-full">
        <Image 
          src={backgroundImage || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover brightness-95"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
