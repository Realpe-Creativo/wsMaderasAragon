// tailwind.config.js (con "type": "module")
import flowbite from 'flowbite-react/tailwind';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    aspectRatio,
  ],
};
