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
          Contact Submissions Table
        </h2>
        <button
          onClick={downloadCSV}
          style={{
            backgroundColor: '#007cba',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#005a87'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#007cba'}
        >
          📥 Download CSV
        </button>
      </div>
      
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        border: '1px solid #ddd',
        fontSize: '14px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              #
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Name
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Email
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Company
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Phone
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Product Type
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Timeline
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Quantity
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Formulation
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Vision
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Budget
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Submitted
            </th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact._id} style={{ 
              backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9'
            }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {index + 1}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.email}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.company}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.phone || '-'}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.productType}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.timeline}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.quantity}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.formulation}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', maxWidth: '200px' }}>
                <div style={{ 
                  maxHeight: '60px', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  wordBreak: 'break-word'
                }}>
                  {contact.vision}
                </div>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.budget}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {contact.submittedAt ? new Date(contact.submittedAt).toLocaleDateString() : '-'}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: contact.status === 'new' ? '#e3f2fd' : 
                                 contact.status === 'contacted' ? '#fff3e0' :
                                 contact.status === 'in-progress' ? '#f3e5f5' : '#e8f5e8',
                  color: contact.status === 'new' ? '#1976d2' : 
                         contact.status === 'contacted' ? '#f57c00' :
                         contact.status === 'in-progress' ? '#7b1fa2' : '#388e3c',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {contact.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
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