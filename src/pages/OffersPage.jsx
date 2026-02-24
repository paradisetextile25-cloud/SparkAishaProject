import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTag, FiArrowRight } from 'react-icons/fi';
import apiClient from '../services/apiClient';

const DEFAULT_OFFERS = [
  { title: '20% Off First Visit',   desc: 'Book any spa for the first time and enjoy 20% off your session.', tag: 'New Members',   color: '#F7EAED' },
  { title: 'Couple Spa Package',    desc: 'A luxurious couples experience with aromatherapy & hot stone massage.', tag: 'Limited Time', color: '#EEE8F4' },
  { title: 'Weekend Wellness Deal', desc: 'Saturday & Sunday bookings at 15% off. Unwind without the full price.', tag: 'Weekends',    color: '#FEF0D9' },
  { title: 'Bridal Beauty Bundle',  desc: 'Full bridal prep package — hair, makeup & skin — at one special rate.', tag: 'Bridal',     color: '#FDE8EF' },
];

export default function OffersPage() {
  const [offers, setOffers] = useState(DEFAULT_OFFERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/api/offers');
        setOffers(response.data);
      } catch (error) {
        // Fallback to default offers on error
        console.error('Failed to fetch offers:', error);
        setOffers(DEFAULT_OFFERS);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);
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
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge-gradient" style={{ marginBottom: '1rem' }}>
            🎁 Exclusive Deals
          </span>
          <h2 className="section-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Offers &amp; Deals
          </h2>
          <p className="section-subheading">
            Discover our latest promotions and special packages. Treat yourself
            for less — without compromising on luxury.
          </p>
        </div>

        {/* Offer Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="card-lift"
              style={{
                background: offer.color,
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(232,207,207,0.3)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'var(--color-accent)',
                  color: 'white',
                  borderRadius: '50px',
                  padding: '0.25rem 0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                <FiTag size={11} /> {offer.tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--color-dark)',
                  marginBottom: '0.625rem',
                }}
              >
                {offer.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-dark-light)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                {offer.desc}
              </p>
              <Link
                to="/booking"
                className="btn-primary"
                style={{ textDecoration: 'none', fontSize: '0.875rem' }}
              >
                Claim Offer <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
