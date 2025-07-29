"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from 'next-sanity';
import clientConfig from '../config/client-config';

// Create a client for fetching data (read-only)
const sanityClient = createClient({
  ...clientConfig,
  useCdn: false,
});

interface HomeContactSubmission {
  _id: string;
  _createdAt: string;
  name: string;
  email: string;
  projectDescription: string;
  status: string;
  submittedAt: string;
}

const HomeContactTable: React.FC = () => {
  const [submissions, setSubmissions] = useState<HomeContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const query = `*[_type == "homeContact"] | order(submittedAt desc) {
          _id,
          _createdAt,
          name,
          email,
          projectDescription,
          status,
          submittedAt
        }`;
        
        const data = await sanityClient.fetch(query);
        setSubmissions(data);
      } catch (err) {
        setError('Failed to fetch home contact submissions');
        console.error('Error fetching submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const updateStatus = async (submissionId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-home-contact-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submissionId,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status');
      }

      // Update local state
      setSubmissions(prev => prev.map(submission => 
        submission._id === submissionId 
          ? { ...submission, status: newStatus }
          : submission
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const deleteContact = async (id: string, name: string) => {
    // Confirmation dialog
    if (!window.confirm(`Are you sure you want to delete the submission from "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch('/api/delete-home-contact', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setSubmissions(prev => prev.filter(submission => submission._id !== id));
        console.log('Home contact deleted successfully');
      } else {
        console.error('Failed to delete home contact');
        alert('Failed to delete contact. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting home contact:', error);
      alert('Error deleting contact. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Project Description', 'Status', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(submission => [
        `"${submission.name}"`,
        `"${submission.email}"`,
        `"${submission.projectDescription.replace(/"/g, '""')}"`,
        `"${submission.status}"`,
        `"${new Date(submission.submittedAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `home-contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) return <div>Loading home contact submissions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Home Contact Submissions ({submissions.length})</h2>
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
            fontWeight: '500'
          }}
        >
          Download CSV
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', width: '300px' }}>Project Description</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Submitted</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr
                key={submission._id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc';
                }}
              >
                <td style={{ padding: '12px', fontWeight: '500' }}>{submission.name}</td>
                <td style={{ padding: '12px' }}>
                  <a href={`mailto:${submission.email}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                    {submission.email}
                  </a>
                </td>
                <td style={{ padding: '12px', maxWidth: '300px' }}>
                  <div style={{ 
                    maxHeight: '60px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4'
                  }}>
                    {submission.projectDescription}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <select
                    value={submission.status}
                    onChange={(e) => updateStatus(submission._id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      border: '1px solid #d1d5db',
                      backgroundColor: submission.status === 'new' ? '#fef3c7' : 
                                     submission.status === 'in_progress' ? '#dbeafe' : '#d1fae5',
                      color: submission.status === 'new' ? '#92400e' :
                             submission.status === 'in_progress' ? '#1e40af' : '#065f46',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td style={{ padding: '12px', color: '#6b7280' }}>
                  {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => deleteContact(submission._id, submission.name)}
                    disabled={deleting === submission._id}
                    style={{
                      backgroundColor: deleting === submission._id ? '#f3f4f6' : '#ef4444',
                      color: deleting === submission._id ? '#9ca3af' : 'white',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: deleting === submission._id ? 'not-allowed' : 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      opacity: deleting === submission._id ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (deleting !== submission._id) {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deleting !== submission._id) {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                      }
                    }}
                  >
                    {deleting === submission._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {submissions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          No home contact submissions yet.
        </div>
      )}
    </div>
  );
};

export default HomeContactTable; 