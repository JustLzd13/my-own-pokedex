import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#DC4C64',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem 0',
        marginTop: 'auto', // key line to push it to the bottom
        width: '100%',
      }}
    >
      <div>
        <p style={{ margin: '0', fontSize: '1.2rem' }}>
          <strong>Created by:</strong> Mark Justine A. Lozada
        </p>
        <p style={{ margin: '0', fontSize: '1rem' }}>
          <strong>Email me for job at:</strong>{' '}
          <a
            href="mailto:lozadamarkjustine@email.com"
            style={{
              color: '#fff',
              textDecoration: 'underline',
            }}
          >
            lozadamarkjustine@email.com
          </a>
        </p>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        &copy; 2025 All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
