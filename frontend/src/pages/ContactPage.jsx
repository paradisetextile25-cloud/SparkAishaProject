import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function ContactPage() {
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
            ✦ Get In Touch
          </span>
          <h2 className="section-heading" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            Contact Us
          </h2>
          <p className="section-subheading">
            Have a question or want to list your spa? We&apos;d love to hear from you.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'var(--color-dark)',
                marginBottom: '1.75rem',
              }}
            >
              Reach Out Directly
            </h3>
            {[
              { icon: FiMapPin, label: 'Address',  value: 'Dubai, United Arab Emirates' },
              { icon: FiPhone,  label: 'Phone',    value: '+971 800 AISHA' },
              { icon: FiMail,   label: 'Email',    value: 'hello@sparkaisha.com' },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--gradient-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ color: 'white', fontSize: '1rem' }} />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-dark)',
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid rgba(232,207,207,0.3)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
              {['Full Name', 'Email Address', 'Subject'].map((placeholder) => (
                <input
                  key={placeholder}
                  type={placeholder === 'Email Address' ? 'email' : 'text'}
                  placeholder={placeholder}
                  style={{
                    border: '1.5px solid rgba(232,207,207,0.6)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-dark)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: 'var(--color-bg)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(232,207,207,0.6)')}
                />
              ))}
              <textarea
                placeholder="Your message..."
                rows={4}
                style={{
                  border: '1.5px solid rgba(232,207,207,0.6)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-dark)',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s',
                  background: 'var(--color-bg)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(232,207,207,0.6)')}
              />
              <button className="btn-primary" style={{ justifyContent: 'center' }}>
                Send Message <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
