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
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/PwdFYdMm4t' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ngaut/agent-git-service' },
      ],
      customCss: ['./src/styles/starlight-custom.css'],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'What is ClawMem?', slug: 'docs' },
            { label: 'Quick Start', slug: 'docs/getting-started/quickstart' },
          ],
        },
        {
          label: 'Learn',
          items: [
            { label: 'How ClawMem Works', slug: 'docs/guides/concepts' },
            { label: 'Session Lifecycle', slug: 'docs/guides/session-lifecycle' },
          ],
        },
        {
          label: 'Operate',
          items: [
            { label: 'Console', slug: 'docs/guides/console' },
            { label: 'Shared Memory & Agent Teams', slug: 'docs/operations/agent-teams' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Tools, Config & Labels', slug: 'docs/reference' },
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
