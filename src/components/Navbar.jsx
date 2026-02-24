import { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { label: 'Home',          href: '#home' },
  { label: 'Services',      href: '#services' },
  { label: 'Spa Directory', href: '#directory' },
  { label: 'Offers',        href: '#offers' },
  { label: 'About',         href: '#about' },
  { label: 'Contact',       href: '#contact' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(253,246,248,0.92)'
          : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(192,132,151,0.15)'
          : '0 1px 0 rgba(192,132,151,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(74,63,66,0.6)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '5rem',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 24px 64px rgba(74,63,66,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>
              Search Spas & Services
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Facial, Massage, Nail care…"
                style={{
                  flex: 1,
                  border: '2px solid var(--color-primary)',
                  borderRadius: '50px',
                  padding: '0.75rem 1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-dark)',
                  background: 'var(--color-bg)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              />
              <button className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                Search
              </button>
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              style={{
                marginTop: '0.75rem',
                background: 'none',
                border: 'none',
                color: 'var(--color-dark-light)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* ── Logo ────────────────── */}
        <a
          href="#home"
          style={{ textDecoration: 'none', flexShrink: 0 }}
          aria-label="Spark Aisha Directory Home"
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 700,
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #C08497, #A06880)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
                color: 'var(--color-dark-light)',
                textTransform: 'uppercase',
                marginTop: '1px',
              }}
            >
              Directory
            </span>
          </div>
        </a>

        {/* ── Desktop Nav Links ────── */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-dark)',
                textDecoration: 'none',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.background = 'rgba(232,207,207,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-dark)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Right Actions ─────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(232,207,207,0.3)',
              color: 'var(--color-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(232,207,207,0.3)';
              e.currentTarget.style.color = 'var(--color-dark)';
            }}
          >
            <FiSearch size={16} />
          </button>

          {/* Login */}
          <a
            href="#login"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-dark)',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              border: '1.5px solid rgba(192,132,151,0.35)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(192,132,151,0.35)';
              e.currentTarget.style.color = 'var(--color-dark)';
            }}
            className="hide-on-mobile"
          >
            Login
          </a>

          {/* Book Now */}
          <a
            href="#services"
            className="btn-primary hide-on-mobile"
            style={{
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.5rem 1.25rem',
            }}
          >
            Book Now
          </a>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="show-on-mobile"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(232,207,207,0.3)',
              color: 'var(--color-dark)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ────────────── */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(253,246,248,0.98)',
            borderTop: '1px solid rgba(232,207,207,0.4)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--color-dark)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(232,207,207,0.3)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
            <a href="#login" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              Login
            </a>
            <a href="#services" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              Book Now
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .show-on-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
