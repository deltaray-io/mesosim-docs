import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MesoSim Docs',
  tagline: 'MesoSim Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.mesosim.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'deltaray-io', // Usually your GitHub org/user name.
  projectName: 'strategy-library', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        gtag: {
          trackingID: 'G-ZM5E79CLK0',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'MesoSim',
      logo: {
        alt: 'Deltaray Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Home',
        },
      ],
    },
    announcementBar: {
      id: 'light-blue-promo',
      content: '🎉 Black Friday Sale - Up to 20% Off! <a href="https://blog.deltaray.io/black-friday-2024">Read more</a> 🎉',
      backgroundColor: '#68bcfc',
      textColor: '#000',
      isCloseable: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Home',
              to: '/intro',
            },
            {
              label: 'MesoLive Docs',
              href: 'https://docs.mesolive.io',
            },
          ],
        },
        {
          title: 'Services',
          items: [
            { 
              href: 'https://q-api.deltaray.io',
              label: 'Q-API', 
              },
            { 
              href: 'https://mesosim.io', 
              label: 'MesoSim Portal', 
            },
            { 
              href: 'https://mesolive.io', 
              label: 'MesoLive Portal', 
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'deltaray',
              href: 'https://deltaray.io',
            },
            {
              label: 'Blog',
              href: 'https://blog.deltaray.io',
            },
          ],
        },
      ],
      copyright: `Copyright © 2022-2024 Deltaray Research Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
