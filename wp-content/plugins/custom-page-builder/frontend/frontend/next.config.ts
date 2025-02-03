const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {}, // Fix voor "appDir" foutmelding
  images: {
    domains: ['yourdomain.com'], // Voeg hier je domein toe als je externe afbeeldingen gebruikt
  },
};

module.exports = withPWA(nextConfig);
