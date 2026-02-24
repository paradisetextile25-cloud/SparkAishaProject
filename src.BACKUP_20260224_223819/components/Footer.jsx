import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

const quickLinks = [
  { label: 'Home',          href: '#home' },
  { label: 'Services',      href: '#services' },
  { label: 'Spa Directory', href: '#directory' },
  { label: 'Offers & Deals',href: '#offers' },
  { label: 'About Us',      href: '#about' },
  { label: 'Contact',       href: '#contact' },
];

const serviceLinks = [
  'Facial Therapy',
  'Aromatherapy',
  'Hair Spa',
  'Body Massage',
  'Nail Care',
  'Bridal Makeup',
];

const socialLinks = [
  { icon: FaInstagram, href: '#', label: 'Instagram',  color: '#E1306C' },
  { icon: FaFacebookF, href: '#', label: 'Facebook',   color: '#1877F2' },
  { icon: FaPinterestP,href: '#', label: 'Pinterest',  color: '#E60023' },
  { icon: FaTwitter,   href: '#', label: 'Twitter',    color: '#1DA1F2' },
  { icon: FaYoutube,   href: '#', label: 'YouTube',    color: '#FF0000' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-dark)',
        color: 'rgba(255,255,255,0.85)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top wave */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--gradient-primary)',
        }}
      />

      {/* Decorative blob */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,132,151,0.08) 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none',
        }}
      />

      {/* Newsletter Banner */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '2.5rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '0.375rem',
              }}
            >
              Get Exclusive Spa Deals
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              Join 10,000+ wellness lovers for weekly beauty tips & special offers.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flex: '1 1 380px',
              maxWidth: '480px',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                borderRadius: '50px',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-secondary)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
            <button
              className="btn-primary"
              style={{ padding: '0.75rem 1.375rem', fontSize: '0.875rem', flexShrink: 0 }}
            >
              Subscribe <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 1.5rem 3rem',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '3rem',
        }}
        className="footer-grid"
      >
        {/* Brand Column */}
        <div>
          <div style={{ marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.625rem',
                fontWeight: 700,
                fontStyle: 'italic',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              Spark Aisha
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
              }}
            >
              Directory
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
              marginBottom: '1.75rem',
              maxWidth: '280px',
            }}
          >
            Your trusted guide to premium spa & beauty services. We connect you
            to the finest wellness experiences near you.
          </p>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { icon: FiMapPin, text: 'Dubai, United Arab Emirates' },
              { icon: FiPhone, text: '+971 800 AISHA' },
              { icon: FiMail,  text: 'hello@sparkaisha.com' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Icon style={{ color: 'var(--color-secondary)', fontSize: '0.875rem', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-secondary)',
              marginBottom: '1.25rem',
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  <span style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>◆</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-secondary)',
              marginBottom: '1.25rem',
            }}
          >
            Services
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {serviceLinks.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  <span style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>◆</span>
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + App */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-secondary)',
              marginBottom: '1.25rem',
            }}
          >
            Follow Us
          </h4>
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  fontSize: '1rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.border = `1px solid ${color}`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* App badges */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Download App
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['App Store', 'Google Play'].map((store) => (
              <a
                key={store}
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)' }}>
                  {store === 'App Store' ? '🍎' : '▶'} {store}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '1.25rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            © 2026 Spark Aisha Directory. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
