export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
     theme: {


// tailwind.config.js

    extend: {
      colors: {
        // optional: expose exact hexes if you prefer
        // brand: {
        //   indigo: '#6366f1',
        //   purple: '#c084fc',
        // },
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeInDown: 'fadeInDown 0.8s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        pulse: { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 0.8 } },
        fadeInDown: { from: { opacity: 0, transform: 'translateY(-30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeInUp:   { from: { opacity: 0, transform: 'translateY(30px)' },  to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  


},
    }
  },
  plugins: []
};
