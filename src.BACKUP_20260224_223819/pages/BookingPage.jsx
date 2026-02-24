import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';

const steps = [
  { icon: FiMapPin,    step: '01', title: 'Choose a Spa',    desc: 'Browse our directory and pick the perfect spa or beauty studio near you.' },
  { icon: FiCalendar,  step: '02', title: 'Select a Service', desc: 'Choose from massages, facials, nail care, bridal packages and more.' },
  { icon: FiClock,     step: '03', title: 'Pick a Time',      desc: 'Select your preferred date and time slot. Instant confirmation.' },
];

export default function BookingPage() {
  const [showForm, setShowForm] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!serviceId || !bookingDate) {
      setError('Please select a service and date');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/api/bookings', {
        serviceId: parseInt(serviceId),
        bookingDate,
      });
      setSuccess('Booking confirmed! Check your inbox for details.');
      setServiceId('');
      setBookingDate('');
      setTimeout(() => setShowForm(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: '6rem 0',
        minHeight: '60vh',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge-gradient" style={{ marginBottom: '1rem' }}>
            📅 Easy Booking
          </span>
          <h2 className="section-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Book Your Experience
          </h2>
          <p className="section-subheading">
            Three simple steps to your perfect wellness experience. No fuss,
            just relaxation.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '4rem',
          }}
          className="booking-steps"
        >
          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div
              key={step}
              className="card-lift"
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                border: '1px solid rgba(232,207,207,0.3)',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'rgba(232,207,207,0.5)',
                  lineHeight: 1,
                }}
              >
                {step}
              </span>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <Icon style={{ color: 'white', fontSize: '1.5rem' }} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-dark)',
                  marginBottom: '0.625rem',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-dark-light)',
                  lineHeight: 1.7,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA or Booking Form */}
        {!showForm ? (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
              style={{ fontSize: '1rem', border: 'none', cursor: 'pointer' }}
            >
              Browse Spas &amp; Book <FiArrowRight />
            </button>
          </div>
        ) : (
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '2.5rem',
              maxWidth: '500px',
              margin: '0 auto',
              boxShadow: '0 32px 80px rgba(74,63,66,0.15)',
              border: '1px solid rgba(232,207,207,0.4)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-dark)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Quick Booking
            </h3>

            {error && (
              <div
                style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1.5px solid rgba(220, 38, 38, 0.5)',
                  borderRadius: '10px',
                  padding: '0.875rem 1rem',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#991b1b',
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1.5px solid rgba(34, 197, 94, 0.5)',
                  borderRadius: '10px',
                  padding: '0.875rem 1rem',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#166534',
                }}
              >
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Service ID
                </label>
                <input
                  type="number"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  placeholder="e.g. 1"
                  required
                  style={{
                    width: '100%',
                    border: '1.5px solid rgba(232,207,207,0.6)',
                    borderRadius: '10px',
                    padding: '0.875rem 1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-dark)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Booking Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    border: '1.5px solid rgba(232,207,207,0.6)',
                    borderRadius: '10px',
                    padding: '0.875rem 1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-dark)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  padding: '0.875rem',
                  marginTop: '1rem',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Booking...' : 'Confirm Booking'} <FiArrowRight />
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(192,132,151,0.3)',
                  color: 'var(--color-dark)',
                  borderRadius: '10px',
                  padding: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(192,132,151,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
