import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const cartographer = await import('@replit/vite-plugin-cartographer');
  return {
    plugins: [cartographer.default()],
    build: {
      target: 'esnext'
    }
  };
});
