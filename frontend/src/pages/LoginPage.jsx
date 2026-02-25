import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5098/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      console.log(response.status);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate('/');
      } else if (response.status === 401) {
        console.error("Login failed:", data);
        setError('Invalid email or password');
      } else {
        console.error("Login error:", data);
        setError('An error occurred during login');
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: 'var(--gradient-hero)',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '3rem',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 32px 80px rgba(74,63,66,0.15)',
          border: '1px solid rgba(232,207,207,0.4)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
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
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-dark-light)',
              marginTop: '0.5rem',
            }}
          >
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              border: '1.5px solid rgba(232,207,207,0.6)',
              borderRadius: '10px',
              padding: '0.875rem 1rem',
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: '1.5px solid rgba(232,207,207,0.6)',
              borderRadius: '10px',
              padding: '0.875rem 1rem',
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
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ justifyContent: 'center', padding: '0.875rem', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Signing In...' : 'Sign In'} <FiArrowRight />
          </button>
        </form>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-dark-light)',
            textAlign: 'center',
            marginTop: '1.5rem',
          }}
        >
          Don&apos;t have an account?{' '}
          <Link
            to="/booking"
            style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}
          >
            Get started
          </Link>
        </p>
      </div>
    </section>
  );
}
