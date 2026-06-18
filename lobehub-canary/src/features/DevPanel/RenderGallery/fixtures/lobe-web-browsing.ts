'use client';

import { defineFixtures, single, variants } from './_helpers';

export default defineFixtures({
  identifier: 'lobe-web-browsing',
  fixtures: {
    crawlMultiPages: single({
      args: {
        urls: ['https://aetherhub.local', 'https://docs.aetherhub.local'],
      },
      pluginState: {
        results: [
          {
            crawler: 'firecrawl',
            data: {
              content: 'AetherHub ships desktop and web experiences for AI collaboration.',
              description: 'Product homepage',
              title: 'AetherHub',
              url: 'https://aetherhub.local',
            },
            originalUrl: 'https://aetherhub.local',
          },
          {
            crawler: 'firecrawl',
            data: {
              content: 'Developer documentation for routing, tooling, and local testing.',
              description: 'Docs homepage',
              title: 'AetherHub Docs',
              url: 'https://docs.aetherhub.local',
            },
            originalUrl: 'https://docs.aetherhub.local',
          },
        ],
      },
    }),
    crawlSinglePage: single({
      args: { url: 'https://aetherhub.local/blog' },
      pluginState: {
        results: [
          {
            crawler: 'firecrawl',
            data: {
              content: 'Recent product updates and engineering notes.',
              description: 'Blog landing page',
              title: 'AetherHub Blog',
              url: 'https://aetherhub.local/blog',
            },
            originalUrl: 'https://aetherhub.local/blog',
          },
        ],
      },
    }),
    search: variants([
      {
        args: {
          query: 'AetherHub devtools preview route',
          searchEngines: ['google', 'bing'],
        },
        label: 'With results',
        pluginState: {
          query: 'AetherHub devtools preview route',
          results: [
            {
              content: 'Documentation and implementation notes about local preview tooling.',
              engines: ['google'],
              title: 'Preview tooling guide',
              url: 'https://docs.example.com/preview-tooling',
            },
            {
              content: 'Issue thread describing the /devtools route rollout.',
              engines: ['bing'],
              title: 'Builtin render devtools issue',
              url: 'https://linear.example.com/issue/',
            },
          ],
        },
      },
      {
        args: {
          query: 'undocumented internal preview snapshot harness',
          searchEngines: ['google'],
        },
        label: 'No results',
        pluginState: {
          query: 'undocumented internal preview snapshot harness',
          results: [],
        },
      },
    ]),
  },
});
