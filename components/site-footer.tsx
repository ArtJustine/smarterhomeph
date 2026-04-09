import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Youtube, Rocket, Github, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background py-24 relative overflow-hidden">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand and Newsletter */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 text-3xl font-black tracking-tighter">
              <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
                <Rocket className="h-6 w-6" />
              </div>
              <span className="text-white uppercase">SMARTER HOME PH</span>
            </Link>
            <p className="text-background/60 text-lg max-w-md leading-relaxed">
              Engineering the next generation of private, secure, and intuitive smart home environments for the modern lifestyle.
            </p>
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Stay updated</p>
              <div className="flex w-full max-w-sm items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 focus-within:border-primary/50 transition-colors">
                <Input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/20 h-12" 
                />
                <Button className="rounded-xl px-6 font-bold shadow-xl shadow-primary/20">
                  JOIN
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-4 lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Platform</h3>
            <ul className="space-y-4">
              {['Devices', 'Builder', 'Services', 'Pricing'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-background/50 hover:text-primary transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Company</h3>
            <ul className="space-y-4">
              {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-background/50 hover:text-primary transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social and Legal */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Follow the vision</h3>
            <div className="flex gap-4">
               {[
                 { icon: Twitter, href: "#" },
                 { icon: Instagram, href: "#" },
                 { icon: Github, href: "#" },
                 { icon: Linkedin, href: "#" },
               ].map((social, i) => (
                 <Link key={i} href={social.href} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-primary hover:bg-white/10 transition-all border border-white/5">
                    <social.icon className="h-5 w-5" />
                 </Link>
               ))}
            </div>
            <div className="pt-4 border-t border-white/10">
               <p className="text-[10px] text-background/30 uppercase font-black tracking-widest leading-loose">
                 © {new Date().getFullYear()} SMARTER HOME PH.<br />
                 INTELLIGENT LIVING, PHILIPPINES.
               </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


