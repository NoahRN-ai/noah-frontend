/** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: ['class'],
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
      ],
      theme: {
        container: {
          center: true,
          padding: '2rem',
          screens: {
            '2xl': '1400px',
          },
        },
        extend: {
          colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))', /* Parchment White */
            foreground: 'hsl(var(--foreground))',
            primary: {
              DEFAULT: 'hsl(var(--primary))', /* Byzantine Blue */
              foreground: 'hsl(var(--primary-foreground))', /* Parchment White */
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))', /* Emerald Green */
              foreground: 'hsl(var(--secondary-foreground))', /* Parchment White */
            },
            destructive: {
              DEFAULT: 'hsl(var(--destructive))', /* Vermilion Red */
              foreground: 'hsl(var(--destructive-foreground))', /* Parchment White */
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))', /* Gold Ochre */
              foreground: 'hsl(var(--accent-foreground))', /* Dark text for contrast on gold */
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
            brand: {
              byzantineBlue: '#3C5A99',
              vermilionRed: '#A62639',
              goldOchre: '#D4A017',
              emeraldGreen: '#2E7D32',
              parchmentWhite: '#F5F5F5',
            }
          },
          fontFamily: {
            serif: ['Playfair Display', 'serif'],
            sans: ['Open Sans', 'sans-serif'],
          },
          borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
          },
          keyframes: {
            'accordion-down': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
            },
            'gradient-animation': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
             'subtle-pulse': {
              '0%, 100%': { opacity: '1', transform: 'scale(1)' },
              '50%': { opacity: '.8', transform: 'scale(1.05)' },
            },
             'ripple': {
              '0%': { transform: 'scale(1)', opacity: '0.7' },
              'to': {
                transform: 'scale(4)',
                opacity: '0'
              }
            },
             'focus-glow-dots': { /* Emerald Green glow */
              '0%, 100%': { boxShadow: '0 0 4px #2E7D32, 0 0 8px #2E7D32, 0 0 12px #2E7D32' },
              '50%': { boxShadow: '0 0 6px #2E7D32, 0 0 12px #2E7D32, 0 0 18px #2E7D32' },
            },
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'gradient': 'gradient-animation 15s ease infinite',
            'subtle-pulse': 'subtle-pulse 1.5s ease-in-out infinite',
            'ripple': 'ripple 0.6s linear',
            'focus-glow-dots': 'focus-glow-dots 1.5s ease-in-out infinite alternate',
          },
        },
      },
      plugins: [require('tailwindcss-animate')],
    };