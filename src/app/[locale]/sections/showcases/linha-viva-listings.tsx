"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Bed, Bath, SquareMenu, ChevronRight, Mail } from "lucide-react"
import Image from "next/image"

const PHOTO_IDS = [
  '1600596542815-ffad4c1539a9',
  '1512917774080-9991f1c4c750',
  '1600585154340-be6161a56a0c',
  '1486406146926-c627a92ad1ab',
  '1545324418-cc1a3fa10c00',
  '1479839672679-a46483c0e7c8',
]

const listings = [
  { price: '€ 1,250,000', title: 'Modern Villa with Pool', location: 'Cascais', beds: 4, baths: 3, sqft: 350 },
  { price: '€ 850,000', title: 'Luxury Downtown Apartment', location: 'Lisbon Center', beds: 2, baths: 2, sqft: 120 },
  { price: '€ 2,100,000', title: 'Oceanfront Penthouse', location: 'Estoril', beds: 3, baths: 4, sqft: 280 },
  { price: '€ 650,000', title: 'Renovated Historic Flat', location: 'Alfama', beds: 2, baths: 1, sqft: 95 },
  { price: '€ 3,400,000', title: 'Contemporary Estate', location: 'Sintra', beds: 5, baths: 6, sqft: 600 },
  { price: '€ 920,000', title: 'Family Home with Garden', location: 'Oeiras', beds: 3, baths: 2, sqft: 180 },
]

const neighborhoods = [
  { name: 'Cascais', count: 47, from: '€650,000', photo: PHOTO_IDS[0] },
  { name: 'Chiado', count: 23, from: '€890,000', photo: PHOTO_IDS[1] },
  { name: 'Príncipe Real', count: 18, from: '€1.2M', photo: PHOTO_IDS[2] },
  { name: 'Estoril', count: 31, from: '€750,000', photo: PHOTO_IDS[4] },
  { name: 'Sintra', count: 12, from: '€950,000', photo: PHOTO_IDS[5] },
]

const agents = [
  { name: 'Ana Rodrigues', specialty: 'Luxury Residential', langs: ['🇵🇹', '🇬🇧', '🇫🇷'], initials: 'AR', email: 'ana@linhavivapt.com' },
  { name: 'Miguel Santos', specialty: 'Investment Properties', langs: ['🇵🇹', '🇬🇧'], initials: 'MS', email: 'miguel@linhavivapt.com' },
  { name: 'Carolina Lima', specialty: 'New Developments', langs: ['🇵🇹', '🇬🇧', '🇪🇸'], initials: 'CL', email: 'carolina@linhavivapt.com' },
  { name: 'Rui Pereira', specialty: 'Commercial & Land', langs: ['🇵🇹', '🇬🇧'], initials: 'RP', email: 'rui@linhavivapt.com' },
]

function pricePerSqm(priceStr: string, sqft: number): string {
  const numeric = parseInt(priceStr.replace(/[^0-9]/g, ''), 10)
  const perSqm = Math.round(numeric / sqft)
  return `€ ${perSqm.toLocaleString('pt-PT')}/m²`
}

export default function LinhaVivaListings() {
  return (
    <div className="bg-stone-50 text-slate-900 min-h-screen font-sans">

      {/* Top ribbon */}
      <div className="bg-blue-900 py-2 text-center">
        <p className="text-xs font-mono text-blue-200 tracking-widest">
          EST. 1998&nbsp;&nbsp;·&nbsp;&nbsp;LISBOA, PORTUGAL&nbsp;&nbsp;·&nbsp;&nbsp;+351 21 000 0000
        </p>
      </div>

      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-blue-950 tracking-tight">Linha Viva</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="text-amber-600 border-b border-amber-400 pb-0.5">Buy</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Rent</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Our Developments</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Agents</a>
          </div>
          <Button className="bg-blue-950 hover:bg-blue-900 text-white rounded-none px-6 text-xs tracking-widest font-mono uppercase">
            Contact Us
          </Button>
        </div>
      </nav>
      <nav
        aria-label="Mobile showcase navigation"
        className="sticky top-16 z-40 border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden"
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1 pl-20 sm:pl-24">
          <a href="#featured-listings" className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-600">
            Listings
          </a>
          <a href="#neighborhoods" className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-600">
            Neighborhoods
          </a>
          <a href="#agents" className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-600">
            Agents
          </a>
          <a href="#developments" className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-600">
            Developments
          </a>
        </div>
      </nav>

      {/* Hero — split layout */}
      <section className="flex flex-col lg:flex-row min-h-[620px]">
        {/* Left panel */}
        <div className="bg-blue-950 lg:w-[60%] flex items-center px-8 md:px-16 py-20">
          <div className="max-w-xl w-full">
            <p className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-6">Premium Real Estate · Portugal</p>
            <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-5">
              Find your perfect home in Portugal.
            </h1>
            <p className="text-blue-300 text-lg mb-10 leading-relaxed">
              Curated properties across Lisbon, Cascais, Estoril and beyond — from historic flats to waterfront estates.
            </p>

            {/* Search form */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-blue-300" />
                <Input
                  placeholder="Location, Neighborhood, or Zone"
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus-visible:ring-amber-400 focus-visible:ring-1"
                />
              </div>
              <div className="flex gap-3">
                <select className="flex-1 h-11 bg-white/10 border border-white/20 rounded-md px-3 text-sm text-blue-200 outline-none focus:border-amber-400">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
                <select className="flex-1 h-11 bg-white/10 border border-white/20 rounded-md px-3 text-sm text-blue-200 outline-none focus:border-amber-400">
                  <option>Price Range</option>
                  <option>€500k – €1M</option>
                  <option>€1M – €2M</option>
                  <option>€2M+</option>
                </select>
              </div>
              <Button size="lg" className="w-full h-12 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-md tracking-wide">
                <Search className="mr-2 h-4 w-4" /> Search Properties
              </Button>
            </div>
          </div>
        </div>

        {/* Right panel — image */}
        <div className="lg:w-[40%] min-h-[340px] relative">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Luxury Portugal home"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 to-transparent" />
          {/* Amber border detail */}
          <div className="absolute bottom-8 left-0 w-1 h-24 bg-amber-400" />
          <div className="absolute bottom-8 left-0 h-1 w-24 bg-amber-400" />
        </div>
      </section>

      {/* Featured Listings */}
      <section id="featured-listings" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-28">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Curated selection</p>
            <h2 className="text-3xl font-serif font-bold text-blue-950">Featured Properties</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-blue-950 bg-amber-400 px-3 py-1 font-bold tracking-widest">06 LISTINGS</span>
            <button className="text-sm text-amber-600 font-medium hover:underline hidden sm:block">View all &rarr;</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((prop, i) => (
            <div key={i} className="bg-white overflow-hidden border border-stone-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              {/* Image */}
              <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${PHOTO_IDS[i]}?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3`}
                  alt={prop.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* FOR SALE pill */}
                <div className="absolute top-4 left-4 bg-amber-400 text-blue-950 text-xs font-black px-3 py-1 uppercase tracking-widest">
                  For Sale
                </div>
                {/* Listing number */}
                <div className="absolute top-3 right-4 text-amber-400 font-black text-4xl leading-none opacity-80 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="text-2xl font-serif font-bold text-blue-950 mb-1">{prop.price}</div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">{prop.title}</h3>
                <p className="text-stone-400 text-sm mb-4 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />{prop.location}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-stone-100 text-sm text-slate-600 mb-3">
                  <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-stone-400" />{prop.beds}</span>
                  <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-stone-400" />{prop.baths}</span>
                  <span className="flex items-center gap-1.5"><SquareMenu className="h-4 w-4 text-stone-400" />{prop.sqft} m²</span>
                </div>
                <p className="text-xs font-mono text-amber-600 tracking-wide">
                  {pricePerSqm(prop.price, prop.sqft)} avg. price per m²
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section id="neighborhoods" className="py-20 px-4 bg-white border-t border-stone-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Browse by area</p>
            <h2 className="text-3xl font-serif font-bold text-blue-950">Explore by Neighborhood</h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
            {neighborhoods.map((n) => (
              <div
                key={n.name}
                className="relative flex-none w-52 h-72 overflow-hidden cursor-pointer group"
              >
                <Image
                  src={`https://images.unsplash.com/photo-${n.photo}?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3`}
                  alt={n.name}
                  fill
                  sizes="208px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/30 to-transparent" />
                <div className="absolute bottom-5 left-4 right-4">
                  <h3 className="font-serif text-xl text-white font-bold leading-snug mb-1">{n.name}</h3>
                  <p className="text-blue-200 text-xs font-mono">{n.count} listings</p>
                  <p className="text-amber-400 text-xs font-mono">from {n.from}</p>
                </div>
                <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Pulse */}
      <section className="bg-blue-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-12 text-center">Market Pulse Q1 2026</p>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x divide-blue-800">
            {[
              { value: '38', label: 'Avg. Days on Market', unit: 'days' },
              { value: '€1.15M', label: 'Median Sale Price', unit: 'median' },
              { value: '+8.4%', label: 'YoY Price Growth', unit: 'year-on-year' },
              { value: '340', label: 'Active Inventory', unit: 'listings' },
            ].map((stat) => (
              <div key={stat.label} className="px-8 py-6 md:py-0 text-center md:text-left">
                <div className="text-4xl font-serif font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Agents */}
      <section id="agents" className="py-20 px-4 bg-stone-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Meet our specialists</p>
            <h2 className="text-3xl font-serif font-bold text-blue-950">Our Team</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div key={agent.name} className="bg-stone-50 border border-stone-200 p-6 hover:shadow-lg transition-shadow">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-950 font-bold text-lg font-mono">{agent.initials}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{agent.name}</h3>
                <p className="text-sm text-blue-600 mb-3">{agent.specialty}</p>
                <div className="flex gap-1 mb-4 text-base">
                  {agent.langs.map((flag) => (
                    <span key={flag}>{flag}</span>
                  ))}
                </div>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-600 transition-colors font-mono"
                >
                  <Mail className="h-3 w-3" />{agent.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-stone-50 border-t border-stone-200 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-9xl font-serif text-amber-300 leading-none select-none pointer-events-none">
            &ldquo;
          </div>
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl font-serif text-blue-950 leading-snug italic mb-8">
              They found us our dream home in Cascais in under three weeks. Professional, patient, and genuinely invested in our happiness.
            </p>
            <footer>
              <p className="font-semibold text-slate-800">James &amp; Emma T.</p>
              <p className="text-sm text-stone-400 font-mono tracking-wide">Purchased 2025 · €1.8M Waterfront Villa</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA to Obras */}
      <section id="developments" className="border-t border-stone-200 scroll-mt-28">
        <div className="grid lg:grid-cols-2 min-h-[400px]">
          {/* Left: architectural photo */}
          <div className="relative min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="New construction"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/20" />
          </div>

          {/* Right: teal-50 panel */}
          <div className="bg-teal-50 flex items-center px-12 py-16">
            <div>
              <p className="text-xs font-mono tracking-widest text-teal-500 uppercase mb-4">New Developments</p>
              <h2 className="text-3xl font-serif font-bold text-blue-950 mb-5">
                Interested in new constructions?
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-md">
                Discover our portfolio of exclusive developments — A+ certified, architect-designed, built to last. From off-plan investment to ready-to-move-in residences.
              </p>
              <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white rounded-none px-8 h-13 tracking-wide" asChild>
                <a href="#">View Our Developments &nbsp;&rarr;</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
