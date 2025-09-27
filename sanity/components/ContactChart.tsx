import React, { useEffect, useRef, useState } from 'react';

interface ContactSubmission {
  _id: string;
  submittedAt: string;
  status: string;
}

interface ChartData {
  date: string;
  count: number;
  statusBreakdown: {
    new: number;
    contacted: number;
    'in-progress': number;
    completed: number;
  };
}

interface ContactChartProps {
  contacts: ContactSubmission[];
}

const ContactChart: React.FC<ContactChartProps> = ({ contacts }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: ChartData } | null>(null);

  // Process contact data into chart format
  useEffect(() => {
    const processData = () => {
      const now = new Date();
      const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

      // Create array of dates
      const dateMap: { [key: string]: ChartData } = {};
      
      for (let i = 0; i < days; i++) {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        dateMap[dateStr] = {
          date: dateStr,
          count: 0,
          statusBreakdown: { new: 0, contacted: 0, 'in-progress': 0, completed: 0 }
        };
      }

      // Count submissions by date
      contacts.forEach(contact => {
        const submissionDate = new Date(contact.submittedAt);
        const dateStr = submissionDate.toISOString().split('T')[0];
        
        if (dateMap[dateStr]) {
          dateMap[dateStr].count++;
          const status = contact.status as keyof typeof dateMap[dateStr].statusBreakdown;
          if (status in dateMap[dateStr].statusBreakdown) {
            dateMap[dateStr].statusBreakdown[status]++;
          }
        }
      });

      setChartData(Object.values(dateMap));
    };

    processData();
  }, [contacts, timeframe]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Find max value for scaling
    const maxCount = Math.max(...chartData.map(d => d.count), 1);
    const yScale = chartHeight / maxCount;
    const xScale = chartWidth / (chartData.length - 1);

    // Draw grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    const gridInterval = Math.max(1, Math.floor(chartData.length / 6));
    for (let i = 0; i < chartData.length; i += gridInterval) {
      const x = padding.left + i * xScale;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Draw y-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxCount / 5) * (5 - i));
      const y = padding.top + (chartHeight / 5) * i;
      ctx.fillText(value.toString(), padding.left - 10, y);
    }

    // Draw x-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    const labelInterval = Math.max(1, Math.floor(chartData.length / 6));
    chartData.forEach((data, index) => {
      if (index % labelInterval === 0) {
        const x = padding.left + index * xScale;
        const date = new Date(data.date);
        const label = date.getDate().toString();
        ctx.fillText(label, x, padding.top + chartHeight + 10);
      }
    });

    // Draw line chart
    if (chartData.length > 1) {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

      // Draw filled area
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(padding.left, padding.top + chartHeight);
      
      chartData.forEach((data, index) => {
        const x = padding.left + index * xScale;
        const y = padding.top + chartHeight - (data.count * yScale);
        if (index === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
      ctx.closePath();
      ctx.fill();

      // Draw line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      chartData.forEach((data, index) => {
        const x = padding.left + index * xScale;
        const y = padding.top + chartHeight - (data.count * yScale);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();

      // Draw points
      chartData.forEach((data, index) => {
        const x = padding.left + index * xScale;
        const y = padding.top + chartHeight - (data.count * yScale);
        
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Add title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Contact Form Submissions Over Time', rect.width / 2, 10);

  }, [chartData]);

  // Handle mouse move for tooltip
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;
    const xScale = chartWidth / (chartData.length - 1);
    const maxCount = Math.max(...chartData.map(d => d.count), 1);
    const yScale = chartHeight / maxCount;

    // Find closest point
    let closestIndex = -1;
    let closestDistance = Infinity;

    chartData.forEach((data, index) => {
      const pointX = padding.left + index * xScale;
      const pointY = padding.top + chartHeight - (data.count * yScale);
      const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));

      if (distance < 20 && distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex >= 0) {
      const pointX = padding.left + closestIndex * xScale;
      const pointY = padding.top + chartHeight - (chartData[closestIndex].count * yScale);
      setHoveredPoint({ x: pointX, y: pointY, data: chartData[closestIndex] });
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const getTotalSubmissions = () => {
    return contacts.filter(contact => {
      const submissionDate = new Date(contact.submittedAt);
      const now = new Date();
      const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      return submissionDate >= cutoff;
    }).length;
  };

  const getAveragePerDay = () => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    return (getTotalSubmissions() / days).toFixed(1);
  };

  const getStatusCounts = () => {
    const recentContacts = contacts.filter(contact => {
      const submissionDate = new Date(contact.submittedAt);
      const now = new Date();
      const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      return submissionDate >= cutoff;
    });

    return {
      new: recentContacts.filter(c => c.status === 'new').length,
      contacted: recentContacts.filter(c => c.status === 'contacted').length,
      'in-progress': recentContacts.filter(c => c.status === 'in-progress').length,
      completed: recentContacts.filter(c => c.status === 'completed').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      padding: '24px', 
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header with controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1f2937', 
          margin: 0 
        }}>
          Submission Analytics
        </h3>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['7d', '30d', '90d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                backgroundColor: timeframe === period ? '#10b981' : 'white',
                color: timeframe === period ? 'white' : '#6b7280',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {period === '7d' ? 'Last 7 days' : period === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
            {getTotalSubmissions()}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>
            Total Submissions
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
            {getAveragePerDay()}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>
            Avg Per Day
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
            {statusCounts.new}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>
            New Submissions
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
            {statusCounts.completed}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>
            Completed
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div style={{ position: 'relative', height: '300px' }}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            width: '100%', 
            height: '100%', 
            cursor: 'crosshair' 
          }}
        />
        
        {/* Tooltip */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              left: `${hoveredPoint.x + 10}px`,
              top: `${hoveredPoint.y - 80}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              pointerEvents: 'none',
              zIndex: 10,
              minWidth: '160px'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              {new Date(hoveredPoint.data.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div style={{ marginBottom: '4px' }}>
              <strong>{hoveredPoint.data.count}</strong> submissions
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              <div>New: {hoveredPoint.data.statusBreakdown.new}</div>
              <div>Contacted: {hoveredPoint.data.statusBreakdown.contacted}</div>
              <div>In Progress: {hoveredPoint.data.statusBreakdown['in-progress']}</div>
              <div>Completed: {hoveredPoint.data.statusBreakdown.completed}</div>
            </div>
          </div>
        )}
      </div>

      {/* Status breakdown */}
      <div style={{ 
        marginTop: '24px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e5e7eb' 
      }}>
        <h4 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#1f2937', 
          marginBottom: '16px' 
        }}>
          Status Breakdown ({timeframe.replace('d', ' days')})
        </h4>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
          gap: '12px' 
        }}>
          {Object.entries(statusCounts).map(([status, count]) => {
            const colors = {
              new: '#f59e0b',
              contacted: '#3b82f6',
              'in-progress': '#8b5cf6',
              completed: '#10b981'
            };
            
            return (
              <div key={status} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: colors[status as keyof typeof colors] 
                }} />
                <span style={{ 
                  fontSize: '14px', 
                  color: '#6b7280',
                  textTransform: 'capitalize'
                }}>
                  {status.replace('-', ' ')}: {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactChart;
