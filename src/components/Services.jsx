import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import apiClient from '../services/apiClient';

/*
  Service images from Unsplash — all free for commercial use.
  Full documentation in public/assets/references/image-references.md
*/
const DEFAULT_SERVICES = [
  {
    id: 1,
    title: 'Facial Therapy',
    description:
      'Revive your skin with our signature deep-cleansing and brightening facials. Tailored for every skin type.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80&auto=format&fit=crop',
    tag: 'Most Popular',
    price: 'From $45',
    duration: '60 min',
    color: '#F7EAED',
  },
  {
    id: 2,
    title: 'Aromatherapy',
    description:
      'Immerse in the healing power of essential oils — a journey to calm the mind, body and spirit.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80&auto=format&fit=crop',
    tag: 'Relaxing',
    price: 'From $55',
    duration: '75 min',
    color: '#EEE8F4',
  },
  {
    id: 3,
    title: 'Hair Spa',
    description:
      'Nourish and restore shine to your hair with our luxury deep-conditioning treatment rituals.',
    image:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80&auto=format&fit=crop',
    tag: 'Trending',
    price: 'From $40',
    duration: '50 min',
    color: '#FEF0D9',
  },
  {
    id: 4,
    title: 'Body Massage',
    description:
      'Release tension and restore balance with a full-body therapeutic massage by certified therapists.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80&auto=format&fit=crop',
    tag: 'Therapeutic',
    price: 'From $65',
    duration: '90 min',
    color: '#E8F4EC',
  },
  {
    id: 5,
    title: 'Nail Care',
    description:
      'Treat your hands and feet to a luxurious mani-pedi with premium polishes and gentle exfoliation.',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop',
    tag: 'Premium',
    price: 'From $35',
    duration: '45 min',
    color: '#FDE8EF',
  },
  {
    id: 6,
    title: 'Bridal Makeup',
    description:
      'Look radiant on your special day with our expert bridal makeup artists and bespoke beauty packages.',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop',
    tag: 'Special',
    price: 'From $120',
    duration: '120 min',
    color: '#FDF0E8',
  },
];

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/api/services');
        setServices(response.data);
      } catch (error) {
        // Fallback to default services on error
        console.error('Failed to fetch services:', error);
        setServices(DEFAULT_SERVICES);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <section
      id="services"
      style={{
        background: 'var(--color-bg)',
        padding: '6rem 0',
        position: 'relative',
      }}
    >
      {/* Top wave decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background:
            'linear-gradient(180deg, rgba(232,207,207,0.08) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section Header */}
        <div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          className="animate-fade-up"
        >
          <span className="badge-gradient" style={{ marginBottom: '1rem' }}>
            ✦ Our Offerings
          </span>
          <h2 className="section-heading" style={{ marginBottom: '1rem', marginTop: '0.75rem' }}>
            Signature Services
          </h2>
          <p className="section-subheading">
            Handpicked treatments curated for ultimate relaxation, beauty, and
            self-care. Every session is a journey to your best self.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.75rem',
          }}
          className="services-grid"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a
            href="#directory"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            View All Services <FiArrowRight />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <div
      className={`card-lift animate-fade-up delay-${(index % 4) * 100}`}
      style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid rgba(232,207,207,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Tag */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50px',
            padding: '0.25rem 0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--color-accent)',
            border: '1px solid rgba(192,132,151,0.25)',
          }}
        >
          {service.tag}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '0.875rem',
          }}
        >
          <span
            style={{
              background: service.color,
              borderRadius: '6px',
              padding: '0.2rem 0.6rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--color-dark)',
            }}
          >
            {service.duration}
          </span>
          <span
            style={{
              background: 'rgba(192,132,151,0.12)',
              borderRadius: '6px',
              padding: '0.2rem 0.6rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
            }}
          >
            {service.price}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-dark)',
            marginBottom: '0.625rem',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-dark-light)',
            lineHeight: 1.7,
            flex: 1,
            marginBottom: '1.25rem',
          }}
        >
          {service.description}
        </p>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(232,207,207,0.4)',
            marginBottom: '1.25rem',
          }}
        />

        {/* Book button */}
        <a
          href="#directory"
          className="btn-primary"
          style={{
            textDecoration: 'none',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            padding: '0.6875rem 1.25rem',
          }}
        >
          Book Now <FiArrowRight style={{ fontSize: '0.875rem' }} />
        </a>
      </div>
    </div>
  );
}
