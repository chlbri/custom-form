/// <reference types="vite/client" />

import HeadLinks from '#organisms/HeadLinks';
import seo from '#seo';
import { createRootRoute, Outlet } from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import appCss from '~/styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
        lang: 'en',
      },
      ...seo({
        title: 'Custom Form | by @chlbri',
        description: `A form builder`,
      }),
    ],
  }),
  component: () => {
    return (
      <>
        <HeadLinks />
        <main class='p-2 w-full min-h-full text-center '>
          <Outlet />
        </main>
        <TanStackRouterDevtools position='bottom-left' />
      </>
    );
  },
});
