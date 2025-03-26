import "./App.css"

function App() {
  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-[#2f2f2f]">SmartHome</div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
            Home
          </a>
          <a href="/devices" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
            Devices
          </a>
          <a href="/services" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
            Services
          </a>
          <a href="/blog" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
            Blog
          </a>
        </nav>
        <button className="bg-white text-[#2f2f2f] hover:bg-[#f8f8f4] border border-[#deddd9] rounded-full px-4 py-2">
          Contact Us
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[500px]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Developer_Portfolio_Website_Design__Community_.png-o0DDh79HCZBaShZ51V2if7ZJs0Kbzq.jpeg"
          alt="Modern living room with smart home features"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 md:space-x-4">
          <button className="bg-[#2f2f2f]/70 text-white border border-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            Living Room
          </button>
          <button className="bg-white/70 text-[#2f2f2f] border border-[#deddd9]/20 backdrop-blur-sm rounded-full px-4 py-2">
            Kitchen
          </button>
          <button className="bg-white/70 text-[#2f2f2f] border border-[#deddd9]/20 backdrop-blur-sm rounded-full px-4 py-2">
            Bedroom
          </button>
          <button className="bg-white/70 text-[#2f2f2f] border border-[#deddd9]/20 backdrop-blur-sm rounded-full px-4 py-2">
            Bathroom
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-8 flex justify-center">
        <button className="bg-[#a8c3b8] hover:bg-[#a8c3b8]/90 text-white rounded-full px-8 py-6 text-lg">
          GET YOUR FREE QUOTE!
        </button>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto py-8 px-4">
        <p className="text-center text-[#6e6e6e] mb-6">
          Partnered with Trusted Brands to Bring You Seamless Smart Home Integrations.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="text-2xl font-bold">Aqara</div>
          <div className="text-2xl font-bold">Govee</div>
          <div className="text-2xl font-bold">eve.</div>
          <div className="text-2xl font-bold">Reolink</div>
          <div className="text-2xl font-bold">a b o d e</div>
          <div className="text-2xl font-bold">YOLINK</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              Manage and monitor your home from anywhere.
            </h2>
            <p className="text-[#6e6e6e] mb-6">Enhance Your Home Management System</p>

            <div className="bg-[#f8f8f4] p-6 rounded-lg mb-6 max-w-md">
              <h3 className="font-bold text-[#2f2f2f] mb-2">Effortless Remote Home Control</h3>
              <p className="text-[#6e6e6e]">
                Enjoy unparalleled convenience with the ability to manage your home from anywhere, putting you in
                complete control, no matter where life takes you.
              </p>
            </div>

            <button className="bg-[#a8c3b8] hover:bg-[#a8c3b8]/90 text-white rounded-full px-8 py-6 text-lg">
              GET YOUR FREE QUOTE!
            </button>
          </div>

          <div className="relative">
            <div className="bg-[#f8f8f4] p-6 rounded-lg absolute -top-12 right-0 max-w-xs">
              <h3 className="font-bold text-[#2f2f2f] mb-2">Infinite Possibilities Await</h3>
              <p className="text-[#6e6e6e]">
                Unlock endless opportunities with our multifunctional smart home ecosystem, designed to adapt and grow
                with your unique lifestyle.
              </p>
            </div>

            <img src="https://placehold.co/500x600" alt="Smart home mobile app interfaces" className="mx-auto" />

            <div className="bg-[#f8f8f4] p-6 rounded-lg absolute -bottom-12 right-0 max-w-xs">
              <h3 className="font-bold text-[#2f2f2f] mb-2">Compatible with Any Ecosystem</h3>
              <p className="text-[#6e6e6e]">
                No matter which smart home platform you use, our devices seamlessly integrate to work perfectly for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="relative w-full h-[600px] mt-24">
        <img
          src="https://placehold.co/1920x600"
          alt="Modern smart home exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f2f2f]/60 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Effortless Living with Smart Automation
              </h2>
              <p className="text-white/80 mb-8">Smarter Home, Seamless Living</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/90 p-4 rounded-lg">
                  <h3 className="font-bold text-[#2f2f2f] mb-2">Convenience</h3>
                  <p className="text-[#6e6e6e] text-sm">
                    Transform your home with smart automation for ultimate convenience and control.
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-lg">
                  <h3 className="font-bold text-[#2f2f2f] mb-2">Comfort</h3>
                  <p className="text-[#6e6e6e] text-sm">
                    Unlock a new level of comfort and efficiency with seamless home automation solutions.
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-lg">
                  <h3 className="font-bold text-[#2f2f2f] mb-2">Security</h3>
                  <p className="text-[#6e6e6e] text-sm">
                    Enjoy increased security, and energy savings with effortless automation.
                  </p>
                </div>
              </div>

              <button className="bg-[#a8c3b8] hover:bg-[#a8c3b8]/90 text-white rounded-full px-8 py-6 text-lg">
                GET YOUR FREE QUOTE!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8f8f4] py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-xl font-bold text-[#2f2f2f] mb-4">SmartHome</div>
              <p className="text-[#6e6e6e] max-w-md">
                Transforming houses into intelligent living spaces with cutting-edge smart home technology.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <nav className="flex flex-col space-y-2">
                <a href="/" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
                  Home
                </a>
                <a href="/devices" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
                  Devices
                </a>
                <a href="/service" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
                  Service
                </a>
                <a href="/blog" className="text-[#2f2f2f] hover:text-[#a8c3b8]">
                  Blog
                </a>
              </nav>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-[#deddd9]">
            <p className="text-[#6e6e6e] text-sm">Privacy Policy</p>
            <p className="text-[#6e6e6e] text-sm">© 2023 - 2024 Smarter Home Philippines</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

