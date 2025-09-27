import React, { useEffect, useState } from 'react';
import { createClient } from 'next-sanity';
import ContactChart from './ContactChart';

const client = createClient({
  projectId: '7v67lu84',
  dataset: 'production',
  apiVersion: '2025-07-17',
  useCdn: false,
});

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  company: string;
  targetMarket: string;
  businessStage: string;
  hasBrand: string;
  hasBenchmarkProduct: string;
  productType: string;
  timeline: string;
  quantity: string;
  formulation: string;
  packagingIdeas: string;
  vision: string;
  submittedAt: string;
  status: string;
}

export default function ContactTable() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const openModal = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  const getDaysAgo = (submittedAt: string) => {
    const submissionDate = new Date(submittedAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - submissionDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const fetchContacts = async () => {
    try {
      const query = `*[_type == "contact"] | order(submittedAt desc) {
        _id,
        name,
        email,
        company,
        targetMarket,
        businessStage,
        hasBrand,
        hasBenchmarkProduct,
        productType,
        timeline,
        quantity,
        formulation,
        packagingIdeas,
        vision,
        submittedAt,
        status
      }`;
      
      const data = await client.fetch(query);
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-contact-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setContacts(prev => 
          prev.map(contact => 
            contact._id === id ? { ...contact, status: newStatus } : contact
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteContact = async (id: string, name: string) => {
    // Confirmation dialog
    if (!window.confirm(`Are you sure you want to delete the submission from "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch('/api/delete-contact', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setContacts(prev => prev.filter(contact => contact._id !== id));
        console.log('Contact deleted successfully');
      } else {
        console.error('Failed to delete contact');
        alert('Failed to delete contact. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Target Market', 'Business Stage', 'Has Brand', 'Has Benchmark Product', 'Product Type', 'Timeline', 'Quantity', 'Formulation', 'Packaging Ideas', 'Vision', 'Status', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        contact.name,
        contact.email,
        contact.company,
        contact.targetMarket,
        contact.businessStage,
        contact.hasBrand,
        contact.hasBenchmarkProduct,
        contact.productType,
        contact.timeline,
        contact.quantity,
        contact.formulation,
        `"${contact.packagingIdeas.replace(/"/g, '""')}"`,
        `"${contact.vision.replace(/"/g, '""')}"`,
        contact.status,
        new Date(contact.submittedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-submissions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'contacted': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading main contact form submissions...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Analytics Chart */}
      <ContactChart contacts={contacts} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          Main Contact Form ({contacts.length})
        </h2>
        <button
          onClick={downloadCSV}
          style={{
            backgroundColor: 'transparent',
            color: '#10b981',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #10b981',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#10b981';
          }}
        >
          Download CSV
        </button>
      </div>

      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No contact form submissions yet.
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Company</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Market</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Stage</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Product</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Timeline</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                {contacts.map((contact, index) => (
                  <tr 
                    key={contact._id} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                      borderBottom: index < contacts.length - 1 ? '1px solid #f3f4f6' : 'none',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      // Don't open modal if clicking on select or button
                      if (e.target instanceof HTMLSelectElement || e.target instanceof HTMLButtonElement || (e.target as HTMLElement).closest('button')) {
                        return;
                      }
                      openModal(contact);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc';
                    }}
                  >
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.name}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.email}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.company}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.targetMarket}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.businessStage}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.productType}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.timeline}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact._id, e.target.value)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border cursor-pointer ${getStatusColor(contact.status)}`}
                        style={{ fontSize: '0.75rem' }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <div>
                        {new Date(contact.submittedAt).toLocaleDateString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
                        {getDaysAgo(contact.submittedAt)}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <button
                        onClick={() => deleteContact(contact._id, contact.name)}
                        disabled={deleting === contact._id}
                        style={{
                          backgroundColor: deleting === contact._id ? '#f8fafc' : 'transparent',
                          color: deleting === contact._id ? '#94a3b8' : '#ef4444',
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          border: deleting === contact._id ? '1px solid #e2e8f0' : '1px solid #fecaca',
                          cursor: deleting === contact._id ? 'not-allowed' : 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          opacity: deleting === contact._id ? 0.6 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px'
                        }}
                        onMouseEnter={(e) => {
                          if (deleting !== contact._id) {
                            e.currentTarget.style.backgroundColor = '#fef2f2';
                            e.currentTarget.style.borderColor = '#ef4444';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (deleting !== contact._id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#fecaca';
                          }
                        }}
                      >
                        {deleting === contact._id ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m5,6 1,14c0,1.1 0.9,2 2,2h8c1.1,0 2-0.9 2-2l1-14"></path>
                            <path d="m9,6V4c0-1.1 0.9-2 2-2h2c1.1,0 2,0.9 2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {isModalOpen && selectedContact && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              maxWidth: '700px', 
              width: '100%', 
              maxHeight: '90vh', 
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              padding: '24px', 
              borderTopLeftRadius: '12px', 
              borderTopRightRadius: '12px',
              color: 'white',
              position: 'relative'
            }}>
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ×
              </button>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>
                Contact Submission Details
              </h2>
              <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
                Submitted {getDaysAgo(selectedContact.submittedAt)} • {new Date(selectedContact.submittedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              {/* Contact Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #10b981'
                }}>
                  Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{selectedContact.name}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>
                      <a href={`mailto:${selectedContact.email}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{selectedContact.company}</p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #10b981'
                }}>
                  Business Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Market</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.targetMarket}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Stage</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.businessStage}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Has Brand</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.hasBrand}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Has Benchmark Product</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        backgroundColor: selectedContact.hasBenchmarkProduct === 'yes' ? '#dbeafe' : '#f3f4f6',
                        color: selectedContact.hasBenchmarkProduct === 'yes' ? '#1e40af' : '#374151'
                      }}>
                        {selectedContact.hasBenchmarkProduct === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #10b981'
                }}>
                  Project Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Type</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.productType}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Launch Timeline</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.timeline}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Quantity</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.quantity}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Formulation</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>{selectedContact.formulation}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1f2937' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        backgroundColor: selectedContact.status === 'new' ? '#f3f4f6' : 
                                       selectedContact.status === 'contacted' ? '#fef3c7' :
                                       selectedContact.status === 'in-progress' ? '#dbeafe' : '#d1fae5',
                        color: selectedContact.status === 'new' ? '#374151' :
                               selectedContact.status === 'contacted' ? '#92400e' :
                               selectedContact.status === 'in-progress' ? '#1e40af' : '#065f46'
                      }}>
                        {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1).replace('-', ' ')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Packaging Ideas */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #10b981'
                }}>
                  Packaging Ideas & Preferences
                </h3>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '20px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '16px', 
                    color: '#1f2937', 
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedContact.packagingIdeas}
                  </p>
                </div>
              </div>

              {/* Project Vision */}
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #10b981'
                }}>
                  Project Vision
                </h3>
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '20px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '16px', 
                    color: '#1f2937', 
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedContact.vision}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 