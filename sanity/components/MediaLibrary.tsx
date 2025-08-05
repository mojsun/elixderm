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

interface ImageAsset {
  _id: string
  _type: string
  url: string
  originalFilename: string
  size: number
  metadata: {
    dimensions: {
      width: number
      height: number
    }
  }
  altText?: string
  mimeType: string
}

export default function MediaLibrary() {
  const [images, setImages] = useState<ImageAsset[]>([])
  const [filteredImages, setFilteredImages] = useState<ImageAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingAltText, setEditingAltText] = useState<string | null>(null)
  const [tempAltText, setTempAltText] = useState('')

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredImages(images)
    } else {
      const filtered = images.filter(image => 
        image.originalFilename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (image.altText && image.altText.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredImages(filtered)
    }
  }, [images, searchQuery])

  const fetchImages = async () => {
    try {
      const query = `*[_type == "sanity.imageAsset"] | order(_createdAt desc) {
        _id,
        _type,
        url,
        originalFilename,
        size,
        metadata,
        altText,
        mimeType
      }`
      
      const data = await client.fetch(query)
      setImages(data)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAltText = async (imageId: string, newAltText: string) => {
    try {
      await client
        .patch(imageId)
        .set({ altText: newAltText })
        .commit()
      
      // Update local state
      setImages(prev => prev.map(img => 
        img._id === imageId ? { ...img, altText: newAltText } : img
      ))
      
      setEditingAltText(null)
      setTempAltText('')
    } catch (error) {
      console.error('Error updating alt text:', error)
      alert('Failed to update alt text. Please try again.')
    }
  }

  const startEditingAltText = (imageId: string, currentAltText: string) => {
    setEditingAltText(imageId)
    setTempAltText(currentAltText || '')
  }

  const cancelEditingAltText = () => {
    setEditingAltText(null)
    setTempAltText('')
  }

  const saveAltText = (imageId: string) => {
    updateAltText(imageId, tempAltText)
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFormat = (mimeType: string) => {
    return mimeType.split('/')[1]?.toUpperCase() || 'Unknown'
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading media library...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
            Media Library ({filteredImages.length} of {images.length} images)
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search by filename or alt text..."
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
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
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
          Click any URL to copy it to clipboard • Click alt text to edit
        </p>
      </div>

      {images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No images uploaded yet.
        </div>
      ) : filteredImages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No images found matching "{searchQuery}".
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb', width: '100px' }}>Preview</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Filename</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Alt Text</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Dimensions</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Format</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Size</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>URL</th>
                </tr>
              </thead>
                             <tbody style={{ backgroundColor: 'white' }}>
                 {filteredImages.map((image, index) => (
                  <tr 
                    key={image._id} 
                                         style={{ 
                       backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                       borderBottom: index < filteredImages.length - 1 ? '1px solid #f3f4f6' : 'none',
                     }}
                  >
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <img 
                        src={`${image.url}?w=80&h=80&fit=crop`}
                        alt={image.altText || image.originalFilename}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover', 
                          borderRadius: '4px',
                          border: '1px solid #e5e7eb'
                        }}
                      />
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937', maxWidth: '200px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {image.originalFilename}
                      </div>
                    </td>
                                         <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937', maxWidth: '200px' }}>
                       {editingAltText === image._id ? (
                         <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                           <input
                             type="text"
                             value={tempAltText}
                             onChange={(e) => setTempAltText(e.target.value)}
                             style={{
                               flex: 1,
                               padding: '0.25rem 0.5rem',
                               border: '1px solid #10b981',
                               borderRadius: '0.25rem',
                               fontSize: '0.75rem',
                               outline: 'none'
                             }}
                             onKeyDown={(e) => {
                               if (e.key === 'Enter') saveAltText(image._id)
                               if (e.key === 'Escape') cancelEditingAltText()
                             }}
                             autoFocus
                           />
                           <button
                             onClick={() => saveAltText(image._id)}
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
                             onClick={cancelEditingAltText}
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
                             cursor: 'pointer',
                             padding: '0.25rem',
                             borderRadius: '0.25rem',
                             border: '1px solid transparent'
                           }}
                           onClick={() => startEditingAltText(image._id, image.altText || '')}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.backgroundColor = '#f3f4f6'
                             e.currentTarget.style.borderColor = '#d1d5db'
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.backgroundColor = 'transparent'
                             e.currentTarget.style.borderColor = 'transparent'
                           }}
                           title="Click to edit alt text"
                         >
                           {image.altText || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Click to add alt text</span>}
                         </div>
                       )}
                     </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>
                      {image.metadata?.dimensions ? 
                        `${image.metadata.dimensions.width} × ${image.metadata.dimensions.height}` : 
                        <span style={{ color: '#9ca3af' }}>Unknown</span>
                      }
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>
                      <span style={{ 
                        backgroundColor: '#f3f4f6', 
                        color: '#374151', 
                        padding: '2px 6px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {getFormat(image.mimeType)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      {formatFileSize(image.size)}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem' }}>
                      <button
                        onClick={() => copyToClipboard(image.url)}
                        style={{
                          backgroundColor: copiedUrl === image.url ? '#10b981' : 'transparent',
                          color: copiedUrl === image.url ? 'white' : '#10b981',
                          border: '1px solid #10b981',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={image.url}
                      >
                        {copiedUrl === image.url ? 'Copied!' : 'Copy URL'}
                      </button>
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