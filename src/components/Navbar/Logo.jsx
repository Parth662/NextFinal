import React from 'react';

const Logo = ({ theme = 'dark' }) => {
  const color = theme === 'light' ? '#000000' : 'var(--text-light)';
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      textDecoration: 'none',
      cursor: 'pointer'
    }}>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '28px',
        fontWeight: '800',
        letterSpacing: '-1px',
        color: color,
        lineHeight: '1',
        transition: 'color var(--animation-fast) ease'
      }}>
        NextIn
      </span>
    </div>
  );
};

export default Logo;
