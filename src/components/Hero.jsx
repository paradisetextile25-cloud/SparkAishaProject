import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

/* 
  Hero image: Unsplash — luxury spa candles and towels
  Photo by: Raphael Lovaski
  Source: https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80&auto=format&fit=crop
  License: Unsplash Free License
*/
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80&auto=format&fit=crop';

const stats = [
  { value: '500+', label: 'Premium Spas' },
  { value: '12K+', label: 'Happy Clients' },
  { value: '4.9',  label: 'Avg Rating' },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        background: 'var(--gradient-hero)',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,167,177,0.2) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,207,207,0.3) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-80px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* ── Left Column ──────────────────── */}
        <div className="animate-fade-up">
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(192,132,151,0.25)',
              borderRadius: '50px',
              padding: '0.375rem 1rem',
              marginBottom: '1.75rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <BsStars style={{ color: 'var(--color-accent)', fontSize: '0.875rem' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Premium Spa &amp; Beauty Directory
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.75rem, 5vw, 4.25rem)',
              fontWeight: 700,
              color: 'var(--color-dark)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Relax.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C08497, #A06880)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}
            >
              Refresh.
            </span>
            <br />
            Rejuvenate.
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--color-dark-light)',
              lineHeight: 1.8,
              marginBottom: '2.25rem',
              maxWidth: '480px',
            }}
          >
            Discover the finest spas, salons, and beauty sanctuaries near you.
            From soul-soothing massages to radiant skin treatments — your
            perfect glow is just one click away.
          </p>

          {/* Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '60px',
              padding: '0.375rem 0.375rem 0.375rem 1.25rem',
              boxShadow: '0 8px 32px rgba(192,132,151,0.2)',
              border: '1.5px solid rgba(232,207,207,0.6)',
              marginBottom: '2rem',
              maxWidth: '480px',
              gap: '0.5rem',
            }}
          >
            <FiMapPin style={{ color: 'var(--color-accent)', fontSize: '1.125rem', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search city, spa, or treatment…"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-dark)',
                background: 'transparent',
                padding: '0.375rem 0',
                minWidth: 0,
              }}
            />
            <button
              className="btn-primary"
              style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem', flexShrink: 0 }}
            >
              Search
            </button>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a
              href="#directory"
              className="btn-primary"
              style={{ textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Explore Spas <FiArrowRight />
            </a>
            <a
              href="#services"
              className="btn-secondary"
              style={{ textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Our Services
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-dark-light)',
                    fontWeight: 500,
                    marginTop: '0.25rem',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column — Image ──────────── */}
        <div
          className="animate-fade-up delay-300"
          style={{ position: 'relative' }}
        >
          {/* Floating accent card */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '-1.5rem',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: '14px',
              padding: '0.875rem 1.125rem',
              boxShadow: '0 8px 32px rgba(192,132,151,0.18)',
              border: '1px solid rgba(232,207,207,0.5)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
              }}
            >
              ✨
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-dark-light)', fontWeight: 500 }}>
                Top Rated
              </p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 600 }}>
                Serenity Bliss Spa
              </p>
            </div>
          </div>

          {/* Floating review card */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: '-1rem',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: '14px',
              padding: '0.875rem 1.125rem',
              boxShadow: '0 8px 32px rgba(192,132,151,0.18)',
              border: '1px solid rgba(232,207,207,0.5)',
              zIndex: 10,
              maxWidth: '180px',
            }}
          >
            <div style={{ display: 'flex', gap: '2px', marginBottom: '0.375rem' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-filled" style={{ fontSize: '0.85rem' }}>★</span>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-dark)', lineHeight: 1.5 }}>
              "Absolutely divine experience. Felt reborn!"
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '0.375rem' }}>
              — Aisha R.
            </p>
          </div>

          {/* Main image */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(74,63,66,0.22)',
              aspectRatio: '4/5',
              maxHeight: '580px',
            }}
          >
            <img
              src={HERO_IMAGE}
              alt="Luxury spa with candles, stones and towels in a warm serene environment"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          {/* Decorative ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-16px',
              borderRadius: '32px',
              border: '2px dashed rgba(216,167,177,0.3)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 3rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
