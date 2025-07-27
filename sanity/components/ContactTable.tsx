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

  const updateStatus = async (contactId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-contact-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: contactId,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status');
      }

      // Update local state
      setContacts(prev => prev.map(contact => 
        contact._id === contactId 
          ? { ...contact, status: newStatus }
          : contact
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const downloadCSV = () => {
    // Create CSV header
    const header = [
      '#',
      'Name',
      'Email', 
      'Company',
      'Phone',
      'Product Type',
      'Timeline',
      'Quantity', 
      'Formulation',
      'Vision',
      'Budget',
      'Submitted Date',
      'Status'
    ].join(',');

    // Create CSV rows
    const rows = contacts.map((contact, index) => [
      index + 1,
      `"${contact.name}"`,
      `"${contact.email}"`,
      `"${contact.company}"`,
      `"${contact.phone || ''}"`,
      `"${contact.productType}"`,
      `"${contact.timeline}"`,
      `"${contact.quantity}"`,
      `"${contact.formulation}"`,
      `"${contact.vision?.replace(/"/g, '""') || ''}"`, // Escape quotes in vision
      `"${contact.budget}"`,
      `"${contact.submittedAt ? new Date(contact.submittedAt).toLocaleDateString() : ''}"`,
      `"${contact.status}"`
    ].join(','));

    // Combine header and rows
    const csvContent = [header, ...rows].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const query = `*[_type == "contact"] | order(submittedAt desc)`;
        const data = await client.fetch(query);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading contact submissions...</div>;
  }

  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Contact Submissions ({contacts.length})
        </h2>
        <button
          onClick={downloadCSV}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#059669'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#10b981'}
        >
          📥 Download CSV
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          border: '1px solid #e2e8f0',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                #
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Name
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Email
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Company
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Phone
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Product Type
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Timeline
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Quantity
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Formulation
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Vision
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Budget
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Status
              </th>
              <th style={{ border: '1px solid #e2e8f0', padding: '12px', textAlign: 'left', fontWeight: '600' }}>
                Submitted
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr 
                key={contact._id} 
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                  borderBottom: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc';
                }}
              >
                <td style={{ border: '1px solid #e2e8f0', padding: '12px', fontWeight: '500' }}>
                  {index + 1}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px', fontWeight: '500' }}>
                  {contact.name}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  <a href={`mailto:${contact.email}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                    {contact.email}
                  </a>
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.company}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.phone || '-'}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.productType}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.timeline}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.quantity}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.formulation}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px', maxWidth: '200px' }}>
                  <div style={{ 
                    maxHeight: '60px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-word',
                    lineHeight: '1.4'
                  }}>
                    {contact.vision}
                  </div>
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  {contact.budget}
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px' }}>
                  <select
                    value={contact.status}
                    onChange={(e) => updateStatus(contact._id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      border: '1px solid #d1d5db',
                      backgroundColor: contact.status === 'new' ? '#fef3c7' : 
                                     contact.status === 'contacted' ? '#fff3e0' :
                                     contact.status === 'in-progress' ? '#dbeafe' : '#d1fae5',
                      color: contact.status === 'new' ? '#92400e' :
                             contact.status === 'contacted' ? '#f57c00' :
                             contact.status === 'in-progress' ? '#1e40af' : '#065f46',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td style={{ border: '1px solid #e2e8f0', padding: '12px', color: '#6b7280' }}>
                  {contact.submittedAt ? new Date(contact.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {contacts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666',
          fontSize: '16px'
        }}>
          No contact submissions yet.
        </div>
      )}
    </div>
  );
} 