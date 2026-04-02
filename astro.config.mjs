import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://clawmem.ai',
  integrations: [
    starlight({
      title: 'ClawMem',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: false,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/clawmem-ai' },
      ],
      customCss: ['./src/styles/starlight-custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quickstart' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Memory Concepts', slug: 'guides/concepts' },
            { label: 'Multi-Agent Setup', slug: 'guides/multi-agent' },
            { label: 'Session Lifecycle', slug: 'guides/session-lifecycle' },
            { label: 'Collaboration', slug: 'guides/collaboration' },
            { label: 'Console', slug: 'guides/console' },
            { label: 'Security & Privacy', slug: 'guides/security' },
            { label: 'Troubleshooting', slug: 'guides/troubleshooting' },
            { label: 'FAQ', slug: 'guides/faq' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Plugin Tools API', slug: 'reference/tools-api' },
            { label: 'Memory Schema', slug: 'reference/schema' },
            { label: 'Configuration', slug: 'reference/configuration' },
            { label: 'Hooks & Lifecycle', slug: 'reference/hooks' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/clawmem-ai/landing-page/edit/main/',
      },
      lastUpdated: true,
      disable404Route: true,
    }),
  ],
});
