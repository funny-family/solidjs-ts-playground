import solid from 'solid-start/vite';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    devtools({
      /* additional options */
      autoname: true, // e.g. enable autoname
      // pass `true` or an object with options
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
  ],
});
