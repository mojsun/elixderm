'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: '7v67lu84',
  dataset: 'production',
  apiVersion: '2025-07-17',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

interface URLItem {
  id: string
  title: string
  url: string
  type: string
  status: string
  lastModified: string
  metaTitle?: string
  metaDescription?: string
  canonical?: string
  noIndex?: boolean
  canEdit: boolean
  canDelete: boolean
}

export default function SiteURLs() {
  const [urls, setUrls] = useState<URLItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUrls, setFilteredUrls] = useState<URLItem[]>([])
  const [typeFilter, setTypeFilter] = useState('')
  const [editingField, setEditingField] = useState<{ id: string, field: string } | null>(null)
  const [tempValue, setTempValue] = useState('')

  useEffect(() => {
    fetchAllUrls()
  }, [])

  useEffect(() => {
    let filtered = urls
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.metaTitle && item.metaTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.metaDescription && item.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    
    if (typeFilter) {
      filtered = filtered.filter(item => item.type === typeFilter)
    }
    
    setFilteredUrls(filtered)
  }, [urls, searchQuery, typeFilter])

  const fetchAllUrls = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
      const allUrls: URLItem[] = []

      // Static pages
      const staticPages = [
        { title: 'Home', url: '/', type: 'Static Page' },
        { title: 'About', url: '/about', type: 'Static Page' },
        { title: 'Products', url: '/products', type: 'Static Page' },
        { title: 'Contact Us', url: '/contact-us', type: 'Static Page' },
        { title: 'Sitemap', url: '/sitemap', type: 'Static Page' },
      ]

      staticPages.forEach(page => {
        allUrls.push({
          id: page.url,
          title: page.title,
          url: `${baseUrl}${page.url}`,
          type: page.type,
          status: 'Published',
          lastModified: 'Static',
          canEdit: false,
          canDelete: false
        })
      })

      // Fetch dynamic pages from Sanity with proper slug handling
      const [pages, projects, products] = await Promise.all([
        // Pages
        client.fetch(`*[_type == "page" && defined(slug.current)] {
          _id,
          title,
          "slug": slug.current,
          _updatedAt,
          seo {
            metaTitle,
            metaDescription,
            noIndex
          }
        }`),
        // Projects
        client.fetch(`*[_type == "project" && defined(slug.current)] {
          _id,
          name,
          "slug": slug.current,
          _updatedAt
        }`),
        // Products  
        client.fetch(`*[_type == "product" && defined(slug.current)] {
          _id,
          name,
          "slug": slug.current,
          _updatedAt,
          seo {
            metaTitle,
            metaDescription,
            noIndex
          }
        }`)
      ])

      // Add pages
      pages.forEach((page: any) => {
        allUrls.push({
          id: page._id,
          title: page.title,
          url: `${baseUrl}/${page.slug}`,
          type: 'Dynamic Page',
          status: 'Published',
          lastModified: new Date(page._updatedAt).toLocaleDateString(),
          metaTitle: page.seo?.metaTitle,
          metaDescription: page.seo?.metaDescription,
          canonical: `${baseUrl}/${page.slug}`,
          noIndex: page.seo?.noIndex,
          canEdit: true,
          canDelete: true
        })
      })

      // Add projects
      projects.forEach((project: any) => {
        allUrls.push({
          id: project._id,
          title: project.name,
          url: `${baseUrl}/projects/${project.slug}`,
          type: 'Project',
          status: 'Published',
          lastModified: new Date(project._updatedAt).toLocaleDateString(),
          canonical: `${baseUrl}/projects/${project.slug}`,
          canEdit: false,
          canDelete: true
        })
      })

      // Add products
      products.forEach((product: any) => {
        allUrls.push({
          id: product._id,
          title: product.name,
          url: `${baseUrl}/products/${product.slug}`,
          type: 'Product',
          status: 'Published',
          lastModified: new Date(product._updatedAt).toLocaleDateString(),
          metaTitle: product.seo?.metaTitle,
          metaDescription: product.seo?.metaDescription,
          canonical: `${baseUrl}/products/${product.slug}`,
          noIndex: product.seo?.noIndex,
          canEdit: true,
          canDelete: true
        })
      })

      // Sort by type, then by title
      allUrls.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type)
        }
        return a.title.localeCompare(b.title)
      })

      setUrls(allUrls)
    } catch (error) {
      console.error('Error fetching URLs:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (item: URLItem) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) {
      return
    }

    try {
      await client.delete(item.id)
      setUrls(prev => prev.filter(url => url.id !== item.id))
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const updateField = async (itemId: string, field: string, value: string) => {
    try {
      const updateData: any = {}
      
      if (field === 'metaTitle') {
        updateData['seo.metaTitle'] = value
      } else if (field === 'metaDescription') {
        updateData['seo.metaDescription'] = value
      } else if (field === 'noIndex') {
        updateData['seo.noIndex'] = value === 'true'
      }

      await client.patch(itemId).set(updateData).commit()
      
      // Update local state
      setUrls(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, [field]: field === 'noIndex' ? value === 'true' : value }
          : item
      ))
      
      setEditingField(null)
      setTempValue('')
    } catch (error) {
      console.error('Error updating field:', error)
      alert('Failed to update field. Please try again.')
    }
  }

  const startEditing = (itemId: string, field: string, currentValue: string) => {
    setEditingField({ id: itemId, field })
    setTempValue(currentValue || '')
  }

  const cancelEditing = () => {
    setEditingField(null)
    setTempValue('')
  }

  const uniqueTypes = Array.from(new Set(urls.map(item => item.type)))

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading website URLs...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
            Published Website URLs ({filteredUrls.length} of {urls.length})
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by title, URL, or meta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                width: '250px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            {(searchQuery || typeFilter) && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setTypeFilter('')
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
          All published URLs • Click URLs to visit • Click meta fields to edit
        </p>
      </div>

      {filteredUrls.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          {searchQuery || typeFilter ? 'No URLs found matching your filters.' : 'No URLs found.'}
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Title</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>URL</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Meta Title</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Meta Description</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Index</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                {filteredUrls.map((item, index) => (
                  <tr 
                    key={item.id} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                      borderBottom: index < filteredUrls.length - 1 ? '1px solid #f3f4f6' : 'none',
                    }}
                  >
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937', fontWeight: '500', maxWidth: '200px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', maxWidth: '300px' }}>
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#10b981',
                          textDecoration: 'none',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        title={item.url}
                      >
                        {item.url}
                      </a>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem' }}>
                      <span style={{ 
                        backgroundColor: '#f3f4f6', 
                        color: '#374151', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', maxWidth: '250px' }}>
                      {item.canEdit && editingField?.id === item.id && editingField?.field === 'metaTitle' ? (
                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            style={{
                              flex: 1,
                              padding: '0.25rem 0.5rem',
                              border: '1px solid #10b981',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              outline: 'none'
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') updateField(item.id, 'metaTitle', tempValue)
                              if (e.key === 'Escape') cancelEditing()
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => updateField(item.id, 'metaTitle', tempValue)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              fontSize: '0.675rem',
                              cursor: 'pointer'
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              fontSize: '0.675rem',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div 
                          style={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            cursor: item.canEdit ? 'pointer' : 'default',
                            padding: '0.25rem',
                            borderRadius: '0.25rem',
                            border: '1px solid transparent'
                          }}
                          onClick={() => item.canEdit && startEditing(item.id, 'metaTitle', item.metaTitle || '')}
                          onMouseEnter={(e) => {
                            if (item.canEdit) {
                              e.currentTarget.style.backgroundColor = '#f3f4f6'
                              e.currentTarget.style.borderColor = '#d1d5db'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (item.canEdit) {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.borderColor = 'transparent'
                            }
                          }}
                          title={item.canEdit ? "Click to edit meta title" : ""}
                        >
                          {item.metaTitle || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                            {item.canEdit ? 'Click to add' : 'Not available'}
                          </span>}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', maxWidth: '250px' }}>
                      {item.canEdit && editingField?.id === item.id && editingField?.field === 'metaDescription' ? (
                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                          <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            style={{
                              flex: 1,
                              padding: '0.25rem 0.5rem',
                              border: '1px solid #10b981',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              outline: 'none',
                              resize: 'vertical',
                              minHeight: '60px'
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.ctrlKey) updateField(item.id, 'metaDescription', tempValue)
                              if (e.key === 'Escape') cancelEditing()
                            }}
                            autoFocus
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <button
                              onClick={() => updateField(item.id, 'metaDescription', tempValue)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                fontSize: '0.675rem',
                                cursor: 'pointer'
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              style={{
                                padding: '0.25rem 0.5rem',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                fontSize: '0.675rem',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          style={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            cursor: item.canEdit ? 'pointer' : 'default',
                            padding: '0.25rem',
                            borderRadius: '0.25rem',
                            border: '1px solid transparent'
                          }}
                          onClick={() => item.canEdit && startEditing(item.id, 'metaDescription', item.metaDescription || '')}
                          onMouseEnter={(e) => {
                            if (item.canEdit) {
                              e.currentTarget.style.backgroundColor = '#f3f4f6'
                              e.currentTarget.style.borderColor = '#d1d5db'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (item.canEdit) {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.borderColor = 'transparent'
                            }
                          }}
                          title={item.canEdit ? "Click to edit meta description" : ""}
                        >
                          {item.metaDescription || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                            {item.canEdit ? 'Click to add' : 'Not available'}
                          </span>}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem' }}>
                      {item.canEdit && editingField?.id === item.id && editingField?.field === 'noIndex' ? (
                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                          <select
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              border: '1px solid #10b981',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              outline: 'none'
                            }}
                          >
                            <option value="false">Index</option>
                            <option value="true">No Index</option>
                          </select>
                          <button
                            onClick={() => updateField(item.id, 'noIndex', tempValue)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              fontSize: '0.675rem',
                              cursor: 'pointer'
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              fontSize: '0.675rem',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span 
                          style={{ 
                            backgroundColor: item.noIndex ? '#fef2f2' : '#f0fdf4', 
                            color: item.noIndex ? '#dc2626' : '#16a34a', 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            cursor: item.canEdit ? 'pointer' : 'default'
                          }}
                          onClick={() => item.canEdit && startEditing(item.id, 'noIndex', String(item.noIndex || false))}
                          title={item.canEdit ? "Click to change index setting" : ""}
                        >
                          {item.noIndex ? 'No Index' : 'Index'}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                      {item.canDelete && (
                        <button
                          onClick={() => deleteItem(item)}
                          style={{
                            backgroundColor: 'transparent',
                            color: '#ef4444',
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #fecaca',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fef2f2'
                            e.currentTarget.style.borderColor = '#ef4444'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.borderColor = '#fecaca'
                          }}
                          title="Delete this page"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m5,6 1,14c0,1.1 0.9,2 2,2h8c1.1,0 2-0.9 2-2l1-14"></path>
                            <path d="m9,6V4c0-1.1 0.9-2 2-2h2c1.1,0 2,0.9 2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 