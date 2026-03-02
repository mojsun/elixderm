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

interface ChatSessionSummary {
  contactId: string;
  messageCount: number;
  durationSeconds: number;
  bookingClicked: boolean;
  startedAt: string;
}

interface ChatMessage {
  role: 'user' | 'mochi';
  content: string;
  timestamp: string;
}

interface ChatSessionFull extends ChatSessionSummary {
  endedAt: string;
  messages: ChatMessage[];
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 1) return '< 1s';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

export default function ContactTable() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [sessionsByContactId, setSessionsByContactId] = useState<Record<string, ChatSessionSummary>>({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChatSession, setModalChatSession] = useState<ChatSessionFull | null | 'loading'>('loading');

  useEffect(() => {
    fetchAll();
  }, []);

  const openModal = async (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
    setModalChatSession('loading');

    try {
      const session = await client.fetch<ChatSessionFull | null>(
        `*[_type == "chatSession" && contactId == $id][0] {
          contactId, messageCount, durationSeconds, bookingClicked,
          startedAt, endedAt, messages
        }`,
        { id: contact._id }
      );
      setModalChatSession(session ?? null);
    } catch {
      setModalChatSession(null);
    }
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
    setModalChatSession('loading');
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

  const fetchAll = async () => {
    try {
      const [contactData, sessionData] = await Promise.all([
        client.fetch<ContactSubmission[]>(`*[_type == "contact"] | order(submittedAt desc) {
          _id, name, email, company, targetMarket, businessStage, hasBrand,
          hasBenchmarkProduct, productType, timeline, quantity, formulation,
          packagingIdeas, vision, submittedAt, status
        }`),
        client.fetch<ChatSessionSummary[]>(`*[_type == "chatSession"] {
          contactId, messageCount, durationSeconds, bookingClicked, startedAt
        }`),
      ]);

      setContacts(contactData);

      // Build O(1) lookup map
      const map: Record<string, ChatSessionSummary> = {};
      for (const s of sessionData) {
        if (s.contactId) map[s.contactId] = s;
      }
      setSessionsByContactId(map);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-contact-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        setContacts(prev =>
          prev.map(contact =>
            contact._id === id ? { ...contact, status: newStatus } : contact
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the submission from "${name}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      const response = await fetch('/api/delete-contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setContacts(prev => prev.filter(contact => contact._id !== id));
      } else {
        alert('Failed to delete contact. Please try again.');
      }
    } catch {
      alert('Error deleting contact. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Target Market', 'Business Stage', 'Has Brand', 'Has Benchmark Product', 'Product Type', 'Timeline', 'Quantity', 'Formulation', 'Packaging Ideas', 'Vision', 'Status', 'Submitted At', 'Mochi Chat', 'Messages', 'Duration', 'Booking Clicked'];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => {
        const session = sessionsByContactId[contact._id];
        return [
          contact.name, contact.email, contact.company, contact.targetMarket,
          contact.businessStage, contact.hasBrand, contact.hasBenchmarkProduct,
          contact.productType, contact.timeline, contact.quantity, contact.formulation,
          `"${contact.packagingIdeas.replace(/"/g, '""')}"`,
          `"${contact.vision.replace(/"/g, '""')}"`,
          contact.status,
          new Date(contact.submittedAt).toLocaleDateString(),
          session ? 'Yes' : 'No',
          session ? session.messageCount : '',
          session ? formatDuration(session.durationSeconds) : '',
          session ? (session.bookingClicked ? 'Yes' : 'No') : '',
        ].join(',');
      })
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
      <ContactChart contacts={contacts} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          Main Contact Form ({contacts.length})
        </h2>
        <button
          onClick={downloadCSV}
          style={{ backgroundColor: 'transparent', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #10b981', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#10b981'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#10b981'; }}
        >
          Download CSV
        </button>
      </div>

      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No contact form submissions yet.
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  {['Name', 'Email', 'Company', 'Market', 'Stage', 'Product', 'Timeline', 'Mochi Chat', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                {contacts.map((contact, index) => {
                  const session = sessionsByContactId[contact._id];
                  return (
                    <tr
                      key={contact._id}
                      style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: index < contacts.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}
                      onClick={(e) => {
                        if (e.target instanceof HTMLSelectElement || e.target instanceof HTMLButtonElement || (e.target as HTMLElement).closest('button')) return;
                        openModal(contact);
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc'; }}
                    >
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.name}</td>
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.email}</td>
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.company}</td>
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.targetMarket}</td>
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.businessStage}</td>
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.productType}</td>
                      <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#1f2937' }}>{contact.timeline}</td>

                      {/* ── Mochi Chat badge ── */}
                      <td style={{ padding: '1rem 0.75rem' }}>
                        {session ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#d1fae5', color: '#065f46', fontSize: '0.7rem', fontWeight: '600', padding: '3px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                              {session.messageCount} msgs
                            </span>
                            {session.bookingClicked && (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '0.7rem', fontWeight: '600', padding: '3px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                Booked
                              </span>
                            )}
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>No chat</span>
                        )}
                      </td>

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
                        <div>{new Date(contact.submittedAt).toLocaleDateString()}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>{getDaysAgo(contact.submittedAt)}</div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          onClick={() => deleteContact(contact._id, contact.name)}
                          disabled={deleting === contact._id}
                          style={{ backgroundColor: 'transparent', color: deleting === contact._id ? '#94a3b8' : '#ef4444', padding: '0.5rem', borderRadius: '0.375rem', border: deleting === contact._id ? '1px solid #e2e8f0' : '1px solid #fecaca', cursor: deleting === contact._id ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }}
                          onMouseEnter={(e) => { if (deleting !== contact._id) { e.currentTarget.style.backgroundColor = '#fef2f2'; e.currentTarget.style.borderColor = '#ef4444'; } }}
                          onMouseLeave={(e) => { if (deleting !== contact._id) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#fecaca'; } }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m5,6 1,14c0,1.1 0.9,2 2,2h8c1.1,0 2-0.9 2-2l1-14"></path>
                            <path d="m9,6V4c0-1.1 0.9-2 2-2h2c1.1,0 2,0.9 2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Contact Details Modal ── */}
      {isModalOpen && selectedContact && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
          onClick={closeModal}
        >
          <div
            style={{ backgroundColor: 'white', borderRadius: '12px', maxWidth: '760px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '24px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', color: 'white', position: 'relative' }}>
              <button
                onClick={closeModal}
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' }}
              >×</button>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Contact Submission Details</h2>
              <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
                Submitted {getDaysAgo(selectedContact.submittedAt)} · {new Date(selectedContact.submittedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>

              {/* Contact Information */}
              <Section title="Contact Information">
                <Grid>
                  <Field label="Name" value={selectedContact.name} />
                  <Field label="Email" value={<a href={`mailto:${selectedContact.email}`} style={{ color: '#10b981', textDecoration: 'none' }}>{selectedContact.email}</a>} />
                  <Field label="Company" value={selectedContact.company} />
                </Grid>
              </Section>

              {/* Business Information */}
              <Section title="Business Information">
                <Grid>
                  <Field label="Target Market" value={selectedContact.targetMarket} />
                  <Field label="Business Stage" value={selectedContact.businessStage} />
                  <Field label="Has Brand" value={selectedContact.hasBrand} />
                  <Field label="Has Benchmark Product" value={
                    <Badge color={selectedContact.hasBenchmarkProduct === 'yes' ? 'blue' : 'gray'}>
                      {selectedContact.hasBenchmarkProduct === 'yes' ? 'Yes' : 'No'}
                    </Badge>
                  } />
                </Grid>
              </Section>

              {/* Project Details */}
              <Section title="Project Details">
                <Grid>
                  <Field label="Product Type" value={selectedContact.productType} />
                  <Field label="Launch Timeline" value={selectedContact.timeline} />
                  <Field label="Order Quantity" value={selectedContact.quantity} />
                  <Field label="Formulation" value={selectedContact.formulation} />
                  <Field label="Status" value={
                    <Badge color={selectedContact.status === 'new' ? 'gray' : selectedContact.status === 'contacted' ? 'amber' : selectedContact.status === 'in-progress' ? 'blue' : 'green'}>
                      {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1).replace('-', ' ')}
                    </Badge>
                  } />
                </Grid>
              </Section>

              {/* Packaging Ideas */}
              <Section title="Packaging Ideas & Preferences">
                <Prose>{selectedContact.packagingIdeas}</Prose>
              </Section>

              {/* Project Vision */}
              <Section title="Project Vision">
                <Prose>{selectedContact.vision}</Prose>
              </Section>

              {/* ── Mochi Chat Session ── */}
              <Section title="Mochi Chat Session">
                {modalChatSession === 'loading' ? (
                  <div style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.875rem' }}>Loading chat session...</div>
                ) : modalChatSession === null ? (
                  <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#9ca3af', fontSize: '0.875rem' }}>
                    This contact did not use Mochi chat.
                  </div>
                ) : (
                  <div>
                    {/* Metrics row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                      <MetricPill icon="🕐" label="Started" value={new Date(modalChatSession.startedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                      <MetricPill icon="⏱" label="Duration" value={formatDuration(modalChatSession.durationSeconds)} />
                      <MetricPill icon="💬" label="Messages" value={String(modalChatSession.messageCount)} />
                      <MetricPill
                        icon={modalChatSession.bookingClicked ? '📅' : '—'}
                        label="Booking"
                        value={modalChatSession.bookingClicked ? 'Clicked' : 'Not clicked'}
                        highlight={modalChatSession.bookingClicked}
                      />
                    </div>

                    {/* Transcript */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '16px', maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {modalChatSession.messages && modalChatSession.messages.length > 0 ? (
                        modalChatSession.messages.map((msg, i) => (
                          <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: '8px' }}>
                            {/* Avatar */}
                            <div style={{ width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '800', color: 'white', background: msg.role === 'user' ? '#6b7280' : 'linear-gradient(135deg,#10b981,#059669)', marginTop: '2px' }}>
                              {msg.role === 'user' ? 'U' : 'M'}
                            </div>
                            {/* Bubble */}
                            <div style={{ maxWidth: '75%', backgroundColor: msg.role === 'user' ? '#10b981' : 'white', color: msg.role === 'user' ? 'white' : '#1f2937', borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '9px 13px', fontSize: '0.845rem', lineHeight: '1.55', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: msg.role === 'mochi' ? '1px solid #e5e7eb' : 'none', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                              {msg.content}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>No messages in this session.</div>
                      )}
                    </div>
                  </div>
                )}
              </Section>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small helper components ────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1f2937', marginBottom: '14px', paddingBottom: '8px', borderBottom: '2px solid #10b981' }}>{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>{children}</div>;
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <div style={{ marginTop: '4px', fontSize: '15px', color: '#1f2937', fontWeight: '500' }}>{value}</div>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#1f2937', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
      {children}
    </div>
  );
}

function Badge({ color, children }: { color: 'blue' | 'gray' | 'amber' | 'green'; children: React.ReactNode }) {
  const colors = {
    blue:  { bg: '#dbeafe', text: '#1e40af' },
    gray:  { bg: '#f3f4f6', text: '#374151' },
    amber: { bg: '#fef3c7', text: '#92400e' },
    green: { bg: '#d1fae5', text: '#065f46' },
  };
  const c = colors[color];
  return (
    <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', backgroundColor: c.bg, color: c.text }}>
      {children}
    </span>
  );
}

function MetricPill({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: highlight ? '#d1fae5' : '#f3f4f6', borderRadius: '8px', padding: '7px 12px', fontSize: '0.8rem' }}>
      <span>{icon}</span>
      <span style={{ color: '#6b7280', fontWeight: '500' }}>{label}:</span>
      <span style={{ color: highlight ? '#065f46' : '#1f2937', fontWeight: '600' }}>{value}</span>
    </div>
  );
}
