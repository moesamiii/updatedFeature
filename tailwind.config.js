// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "ibmplex-arabic": ['"IBM Plex Sans Arabic"', "sans-serif"],
      },
      colors: {
        // Background colors
        primary: "var(--color-primary)",
        screens: "var(--color-screens)",
        cards: "var(--color-cards)",
        dark: "var(--color-dark)",
        footer: "var(--color-footer)",
        "gray-light": "var(--color-gray-light)",
        "blue-darker": "var(--color-blue-darker)",
        secondary: "var(--color-secondary)",

        // Gradient colors
        "blue-start": "var(--color-blue-start)",
        "blue-end": "var(--color-blue-end)",

        // Hover colors
        "normal-hover": "var(--color-normal-hover)",
        "normal-active": "var(--color-normal-active)",
        "dark-hover": "var(--color-dark-hover)",
        "dark-active": "var(--color-dark-active)",

        // Text colors
        "text-title": "var(--color-text-title)",
        "text-titles": "var(--color-text-titles)",
        "text-primary": "var(--color-text-primary)",
        "text-body": "var(--color-text-body)",
        "text-captions": "var(--color-text-captions)",
        "text-tabs": "var(--color-text-tabs)",

        // Border colors
        "border-blue": "var(--color-border-blue)",
        "border-gray": "var(--color-border-gray)",
      },
    },
  },
  plugins: [],
};
