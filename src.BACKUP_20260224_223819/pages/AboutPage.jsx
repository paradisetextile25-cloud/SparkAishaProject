import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const values = [
  { emoji: '✨', title: 'Curated Excellence',   desc: 'Every spa in our directory is vetted for quality, hygiene, and exceptional client experience.' },
  { emoji: '📍', title: 'Hyperlocal Focus',     desc: 'We surface the best wellness spots near you — whether in Dubai Marina or Downtown Abu Dhabi.' },
  { emoji: '💖', title: 'Community Driven',     desc: 'Built on thousands of real reviews from our growing community of wellness enthusiasts.' },
  { emoji: '🔒', title: 'Trusted & Secure',     desc: 'Your data and bookings are protected. We partner only with verified, licensed businesses.' },
];

export default function AboutPage() {
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
            ✦ Our Story
          </span>
          <h2 className="section-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            About Spark Aisha
          </h2>
          <p className="section-subheading" style={{ maxWidth: '640px', margin: '0 auto' }}>
            We started with one simple belief — every person deserves access to
            premium wellness without the guesswork. Spark Aisha Directory
            connects you to the finest spas in the UAE, effortlessly.
          </p>
        </div>

        {/* Values Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4rem',
          }}
        >
          {values.map((v) => (
            <div
              key={v.title}
              className="card-lift"
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(232,207,207,0.3)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.emoji}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-dark)',
                  marginBottom: '0.5rem',
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-dark-light)',
                  lineHeight: 1.7,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/spas" className="btn-primary" style={{ textDecoration: 'none' }}>
            Explore Spas <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
