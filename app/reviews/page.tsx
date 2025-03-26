import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Jennifer M.",
      location: "San Francisco, CA",
      rating: 5,
      review:
        "The smart home system has completely transformed our daily routines. The automation features are intuitive and the app is incredibly user-friendly. Customer support was also exceptional when we needed help with setup.",
      product: "Complete Home Automation Package",
    },
    {
      id: 2,
      name: "Robert T.",
      location: "Chicago, IL",
      rating: 4,
      review:
        "I've been using the security system for about 6 months now and I'm very impressed with the quality of the cameras and the reliability of the motion detection. The only reason for 4 stars instead of 5 is that the night vision could be slightly better.",
      product: "Smart Security Bundle",
    },
    {
      id: 3,
      name: "Maria G.",
      location: "Austin, TX",
      rating: 5,
      review:
        "The smart lighting system is amazing! I love being able to control the ambiance of each room from my phone, and the energy savings have been significant. The installation was straightforward and the customer service team was very helpful.",
      product: "Smart Lighting Package",
    },
    {
      id: 4,
      name: "David L.",
      location: "Seattle, WA",
      rating: 5,
      review:
        "I was hesitant about investing in smart home technology, but I'm so glad I did. The system works flawlessly with my existing devices and the voice control integration is seamless. Highly recommend!",
      product: "Voice Control Hub",
    },
    {
      id: 5,
      name: "Sarah K.",
      location: "Boston, MA",
      rating: 4,
      review:
        "The smart thermostat has made a noticeable difference in our energy bills. It's easy to program and I love being able to adjust the temperature remotely. The only improvement I'd suggest is more detailed energy usage reports.",
      product: "Climate Control System",
    },
    {
      id: 6,
      name: "Michael P.",
      location: "Denver, CO",
      rating: 5,
      review:
        "The installation service was worth every penny. The technicians were professional, knowledgeable, and took the time to explain how everything works. Our system has been running perfectly since day one.",
      product: "Professional Installation Service",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          title="USER REVIEWS"
          backgroundImage="/placeholder.svg?height=500&width=1200"
          alt="Customer testimonials"
        />

        <section className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground">
                Read honest feedback from real customers who have transformed their homes with our smart technology.
              </p>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{review.name}</h3>
                            <p className="text-sm text-muted-foreground">{review.location}</p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-muted-foreground">{review.review}</p>
                        <p className="mt-2 text-sm font-medium">Product: {review.product}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

