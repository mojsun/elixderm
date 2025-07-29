import React, { useEffect, useState } from 'react';
import { createClient } from 'next-sanity';

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
  phone: string;
  productType: string;
  timeline: string;
  quantity: string;
  formulation: string;
  vision: string;
  budget: string;
  submittedAt: string;
  status: string;
}

export default function ContactTable() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const query = `*[_type == "contact"] | order(submittedAt desc) {
        _id,
        name,
        email,
        company,
        phone,
        productType,
        timeline,
        quantity,
        formulation,
        vision,
        budget,
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
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Product Type', 'Timeline', 'Quantity', 'Formulation', 'Vision', 'Budget', 'Status', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        contact.name,
        contact.email,
        contact.company,
        contact.phone || 'N/A',
        contact.productType,
        contact.timeline,
        contact.quantity,
        contact.formulation,
        `"${contact.vision.replace(/"/g, '""')}"`,
        contact.budget,
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
      case 'new': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading contact submissions...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          Contact Submissions ({contacts.length})
        </h2>
        <button
          onClick={downloadCSV}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          Download CSV
        </button>
      </div>

      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No contact submissions yet.
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
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Product</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Timeline</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                {contacts.map((contact, index) => (
                  <tr key={contact._id} style={{ borderBottom: index < contacts.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.name}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.email}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.company}</td>
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
                      {new Date(contact.submittedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                      <button
                        onClick={() => deleteContact(contact._id, contact.name)}
                        disabled={deleting === contact._id}
                        style={{
                          backgroundColor: deleting === contact._id ? '#f3f4f6' : '#ef4444',
                          color: deleting === contact._id ? '#9ca3af' : 'white',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '0.375rem',
                          border: 'none',
                          cursor: deleting === contact._id ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                          opacity: deleting === contact._id ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (deleting !== contact._id) {
                            e.currentTarget.style.backgroundColor = '#dc2626';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (deleting !== contact._id) {
                            e.currentTarget.style.backgroundColor = '#ef4444';
                          }
                        }}
                      >
                        {deleting === contact._id ? 'Deleting...' : 'Delete'}
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
  );
} 