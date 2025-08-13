'use client'

import { getServices } from '@/sanity/sanity-utils'
import { Service } from '@/types/Service'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import PageHero from '@/app/components/PageHero/PageHero'
import { useEffect, useState } from 'react'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set metadata
    document.title = 'Our Services | Elixderm'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life.')
    }

    // Fetch services
    getServices().then((data) => {
      setServices(data)
      setLoading(false)
    })
  }, [])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services' }
  ]

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const category = service.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(service)
    return acc
  }, {} as Record<string, Service[]>)

  const categoryLabels: Record<string, string> = {
    formulation: 'Formulation Services',
    research: 'Research & Development',
    testing: 'Testing & Analysis',
    consulting: 'Consulting',
    other: 'Other Services'
  }

  if (loading) {
    return (
      <div className="services-page">
        <Breadcrumb items={breadcrumbItems} />
        <PageHero 
          title="Our Services"
          subtitle="Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life."
        />
        <main className="services-main" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
          <p>Loading services...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="services-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHero 
        title="Our Services"
        subtitle="Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life."
      />
      
      <main className="services-main" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <section key={category} style={{ marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '2rem', 
              color: '#1d413c',
              textAlign: 'center'
            }}>
              {categoryLabels[category] || 'Services'}
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {categoryServices.map((service) => (
                <Link 
                  key={service._id}
                  href={`/services/${service.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    border: '1px solid #e4e6e8',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(29, 65, 60, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div>
                    {service.hero?.image && (
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <Image
                          src={service.hero.image}
                          alt={service.hero.imageAlt || service.name}
                          width={400}
                          height={200}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}
                    
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '1rem',
                        color: '#1d413c'
                      }}>
                        {service.name}
                      </h3>
                      
                      {service.hero?.description && (
                        <p style={{
                          color: '#666',
                          lineHeight: '1.6',
                          marginBottom: '1rem'
                        }}>
                          {service.hero.description.substring(0, 150)}
                          {service.hero.description.length > 150 ? '...' : ''}
                        </p>
                      )}
                      
                      <span style={{
                        color: '#1d413c',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}>
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
        
        {services.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3 style={{ color: '#666' }}>No services available at the moment.</h3>
            <p style={{ color: '#999' }}>Please check back later for updates.</p>
          </div>
        )}
      </main>
    </div>
  )
}
