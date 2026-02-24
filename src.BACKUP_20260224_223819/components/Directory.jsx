import { useState, useEffect } from 'react';
import { FiMapPin, FiStar, FiPhone, FiFilter, FiX, FiArrowRight } from 'react-icons/fi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import apiClient from '../services/apiClient';

/*
  Spa directory images from Unsplash — all free for commercial use.
  Full documentation in public/assets/references/image-references.md
*/
const DEFAULT_SPAS = [
  {
    id: 1,
    name: 'Serenity Bliss Spa',
    location: 'Dubai Marina, Dubai',
    rating: 4.9,
    reviews: 312,
    price: '$$$',
    priceNote: 'From $80/session',
    services: ['Massage', 'Facial', 'Aromatherapy'],
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80&auto=format&fit=crop',
    badge: 'Top Rated',
    badgeColor: '#C08497',
    distance: '0.5 km away',
    openNow: true,
  },
  {
    id: 2,
    name: 'Aura Beauty Lounge',
    location: 'Jumeirah, Dubai',
    rating: 4.8,
    reviews: 228,
    price: '$$',
    priceNote: 'From $55/session',
    services: ['Nail Care', 'Bridal Makeup', 'Hair Spa'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80&auto=format&fit=crop',
    badge: 'Trending',
    badgeColor: '#A06880',
    distance: '1.2 km away',
    openNow: true,
  },
  {
    id: 3,
    name: 'Rose Petal Wellness',
    location: 'Downtown, Abu Dhabi',
    rating: 4.7,
    reviews: 185,
    price: '$$$',
    priceNote: 'From $75/session',
    services: ['Body Wrap', 'Aromatherapy', 'Facial'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop',
    badge: 'Premium',
    badgeColor: '#C08497',
    distance: '2.0 km away',
    openNow: false,
  },
  {
    id: 4,
    name: 'Lumière Skin Studio',
    location: 'Al Reem Island, Abu Dhabi',
    rating: 4.8,
    reviews: 194,
    price: '$$',
    priceNote: 'From $50/session',
    services: ['Facial', 'Laser', 'Peel'],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80&auto=format&fit=crop',
    badge: 'New',
    badgeColor: '#D8A7B1',
    distance: '0.8 km away',
    openNow: true,
  },
  {
    id: 5,
    name: 'Velvet Touch Spa',
    location: 'Business Bay, Dubai',
    rating: 4.6,
    reviews: 143,
    price: '$$$',
    priceNote: 'From $90/session',
    services: ['Hot Stone Massage', 'Couple Spa', 'Detox'],
    image: 'https://images.unsplash.com/photo-1561749003-f5c7a1c8c0ef?w=600&q=80&auto=format&fit=crop',
    badge: 'Couple Spa',
    badgeColor: '#A06880',
    distance: '3.5 km away',
    openNow: true,
  },
  {
    id: 6,
    name: 'Petal & Glow Studio',
    location: 'Mirdif, Dubai',
    rating: 4.7,
    reviews: 217,
    price: '$',
    priceNote: 'From $30/session',
    services: ['Nail Care', 'Eyebrow Threading', 'Waxing'],
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80&auto=format&fit=crop',
    badge: 'Budget Pick',
    badgeColor: '#D8A7B1',
    distance: '1.8 km away',
    openNow: false,
  },
];

const locationOptions  = ['All Locations', 'Dubai Marina', 'Jumeirah', 'Downtown', 'Business Bay', 'Mirdif'];
const priceOptions     = ['All Prices', '$  — Budget', '$$  — Mid-Range', '$$$  — Premium'];
const ratingOptions    = ['All Ratings', '4.9+', '4.7+', '4.5+'];
const serviceOptions   = ['All Services', 'Massage', 'Facial', 'Aromatherapy', 'Nail Care', 'Bridal Makeup', 'Hair Spa'];

export default function Directory() {
  const [spasData, setSpasData] = useState(DEFAULT_SPAS);
  const [loading, setLoading] = useState(false);
  const [savedIds,    setSavedIds]    = useState([]);
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [activePrice,    setActivePrice]    = useState('All Prices');
  const [activeRating,   setActiveRating]   = useState('All Ratings');
  const [activeService,  setActiveService]  = useState('All Services');

  useEffect(() => {
    const fetchSpas = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/api/spas');
        setSpasData(response.data);
      } catch (error) {
        // Fallback to default spas on error
        console.error('Failed to fetch spas:', error);
        setSpasData(DEFAULT_SPAS);
      } finally {
        setLoading(false);
      }
    };

    fetchSpas();
  }, []);

  const toggleSave = (id) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <section
      id="directory"
      style={{ background: '#FAF2F4', padding: '6rem 0', position: 'relative' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="animate-fade-up">
          <span className="badge-gradient" style={{ marginBottom: '1rem' }}>
            ✦ Discover Near You
          </span>
          <h2 className="section-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Spa Directory
          </h2>
          <p className="section-subheading">
            Browse our curated list of top-rated spas and beauty studios. Filter
            by location, price, and services to find your perfect match.
          </p>
        </div>

        {/* Filter bar */}
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.125rem 1.5rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(232,207,207,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <FiFilter style={{ color: 'var(--color-accent)', fontSize: '1rem', flexShrink: 0 }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-dark)',
              marginRight: '0.5rem',
            }}
          >
            Filter:
          </span>

          {/* Location */}
          <FilterSelect
            label="Location"
            options={locationOptions}
            value={activeLocation}
            onChange={setActiveLocation}
          />
          {/* Price */}
          <FilterSelect
            label="Price Range"
            options={priceOptions}
            value={activePrice}
            onChange={setActivePrice}
          />
          {/* Rating */}
          <FilterSelect
            label="Rating"
            options={ratingOptions}
            value={activeRating}
            onChange={setActiveRating}
          />
          {/* Service */}
          <FilterSelect
            label="Service"
            options={serviceOptions}
            value={activeService}
            onChange={setActiveService}
          />

          {/* Clear */}
          <button
            onClick={() => {
              setActiveLocation('All Locations');
              setActivePrice('All Prices');
              setActiveRating('All Ratings');
              setActiveService('All Services');
            }}
            style={{
              background: 'rgba(192,132,151,0.1)',
              border: 'none',
              borderRadius: '50px',
              padding: '0.4rem 0.875rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--color-accent)',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'background 0.2s',
              marginLeft: 'auto',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(192,132,151,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(192,132,151,0.1)')}
          >
            <FiX size={12} /> Clear Filters
          </button>
        </div>

        {/* Spa Cards Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}
          className="directory-grid"
        >
          {spasData.map((spa, index) => (
            <SpaCard
              key={spa.id}
              spa={spa}
              saved={savedIds.includes(spa.id)}
              onSave={() => toggleSave(spa.id)}
              index={index}
            />
          ))}
        </div>

        {/* Load More */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button className="btn-secondary">
            Load More Spas <FiArrowRight />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .directory-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .directory-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Filter Select ──────────────────────────────────── */
function FilterSelect({ options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: value === options[0] ? 'var(--color-dark-light)' : 'var(--color-accent)',
        background: value === options[0] ? 'rgba(232,207,207,0.2)' : 'rgba(192,132,151,0.12)',
        border: '1.5px solid rgba(232,207,207,0.5)',
        borderRadius: '50px',
        padding: '0.4rem 1rem',
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        paddingRight: '1.5rem',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'%3E%3Cpath d='M0 0l6 6 6-6z' fill='%23C08497'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.6rem center',
        transition: 'all 0.2s ease',
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

/* ── Spa Card ───────────────────────────────────────── */
function SpaCard({ spa, saved, onSave, index }) {
  return (
    <div
      className={`card-lift animate-fade-up delay-${(index % 3) * 100}`}
      style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid rgba(232,207,207,0.3)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '210px' }}>
        <img
          src={spa.image}
          alt={spa.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Badge */}
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: spa.badgeColor,
            color: 'white',
            borderRadius: '50px',
            padding: '0.25rem 0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
          }}
        >
          {spa.badge}
        </span>

        {/* Open Status */}
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            right: '3rem',
            background: spa.openNow ? 'rgba(76,175,80,0.9)' : 'rgba(158,158,158,0.85)',
            color: 'white',
            borderRadius: '50px',
            padding: '0.25rem 0.625rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            fontWeight: 600,
          }}
        >
          {spa.openNow ? '✓ Open Now' : 'Closed'}
        </span>

        {/* Save button */}
        <button
          onClick={onSave}
          aria-label={saved ? 'Unsave spa' : 'Save spa'}
          style={{
            position: 'absolute',
            top: '0.875rem',
            right: '0.875rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: saved ? 'var(--color-accent)' : 'var(--color-dark-light)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {saved ? <BsBookmarkFill size={14} /> : <BsBookmark size={14} />}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '1.375rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-dark)',
            marginBottom: '0.375rem',
          }}
        >
          {spa.name}
        </h3>

        {/* Location + Distance */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
          <FiMapPin style={{ color: 'var(--color-accent)', fontSize: '0.875rem', flexShrink: 0 }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-dark-light)',
            }}
          >
            {spa.location}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-accent)',
              background: 'rgba(192,132,151,0.1)',
              borderRadius: '50px',
              padding: '0.1rem 0.5rem',
              marginLeft: 'auto',
              flexShrink: 0,
            }}
          >
            {spa.distance}
          </span>
        </div>

        {/* Rating + Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="star-filled" style={{ fontSize: '0.9rem' }}>★</span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-dark)',
              }}
            >
              {spa.rating}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'var(--color-dark-light)',
              }}
            >
              ({spa.reviews} reviews)
            </span>
          </div>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
            }}
          >
            {spa.priceNote}
          </span>
        </div>

        {/* Service tags */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {spa.services.map((s) => (
            <span
              key={s}
              style={{
                background: 'rgba(232,207,207,0.35)',
                color: 'var(--color-dark)',
                borderRadius: '6px',
                padding: '0.2rem 0.625rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                fontWeight: 500,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(232,207,207,0.4)', marginBottom: '1.125rem', marginTop: 'auto' }} />

        {/* Action row */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={`tel:+1`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1.5px solid rgba(192,132,151,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(192,132,151,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Call Spa"
          >
            <FiPhone size={14} />
          </a>
          <a
            href="#booking"
            className="btn-primary"
            style={{
              flex: 1,
              textDecoration: 'none',
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              padding: '0.625rem 1rem',
            }}
          >
            View Details <FiArrowRight style={{ fontSize: '0.85rem' }} />
          </a>
        </div>
      </div>
    </div>
  );
}
