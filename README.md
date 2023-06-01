# PeopleEat Web App

## Development Prerequisites

-   Make sure you have the [Node.js runtime](https://nodejs.org) installed.
-   Make sure you are using Node.js version 20. A simple way to switch versions is with the npm package [n](https://www.npmjs.com/package/n) or [nvm](https://github.com/nvm-sh/nvm).

```bash
npm install --global n
```

```bash
sudo n 20
```

-   Make sure you have the [Yarn package manager](https://yarnpkg.com) installed.

```bash
npm install --global yarn
```

## Development

Install dependencies:

```bash
yarn
```

Start the development server:

```bash
yarn dev
```

| Available Pages                                                         |                       |
| ----------------------------------------------------------------------- | --------------------- |
| [Home page](http://localhost:3000)                                      | /                     |
| [Sign in page](http://localhost:3000/sign-in)                           | /sign-in              |
| [Sign up page](http://localhost:3000/sign-up)                           | /sign-up              |
| [How to become a chef page](http://localhost:3000/how-to-chef)          | /how-to-chef          |
| [Chef sign up page](http://localhost:3000/chef-sign-up)                 | /chef-sign-up         |
| [Profile page](http://localhost:3000/profile)                           | /profile              |
| [Chef profile page](http://localhost:3000/chef-profile)                 | /chef-profile         |
| [About us page](http://localhost:3000/about-us)                         | /about-us             |
| [Imprint page](http://localhost:3000/imprint)                           | /imprint              |
| [Data privacy policy page](http://localhost:3000/data-privacy-policy)   | /data-privacy-policy  |
| [Terms and conditions page](http://localhost:3000/terms-and-conditions) | /terms-and-conditions |
| [Individual request page](http://localhost:3000/individual-request)     | /individual-request   |
| [Search results](http://localhost:3000/search-results)                  | /search-results       |

### Storybook

Start locally:

```bash
yarn storybook:start
```

## Integration

| Available Pages                                                                                |                       |
| ---------------------------------------------------------------------------------------------- | --------------------- |
| [Home page](https://integration-people-eat.cem-yilmaz.de)                                      | /                     |
| [Sign in page](https://integration-people-eat.cem-yilmaz.de/sign-in)                           | /sign-in              |
| [Sign up page](https://integration-people-eat.cem-yilmaz.de/sign-up)                           | /sign-up              |
| [How to become a chef page](https://integration-people-eat.cem-yilmaz.de/how-to-chef)          | /how-to-chef          |
| [Chef sign up page](https://integration-people-eat.cem-yilmaz.de/chef-sign-up)                 | /chef-sign-up         |
| [Profile page](https://integration-people-eat.cem-yilmaz.de/profile)                           | /profile              |
| [Chef profile page](https://integration-people-eat.cem-yilmaz.de/chef-profile)                 | /chef-profile         |
| [About us page](https://integration-people-eat.cem-yilmaz.de/about-us)                         | /about-us             |
| [Imprint page](https://integration-people-eat.cem-yilmaz.de/imprint)                           | /imprint              |
| [Data privacy policy page](https://integration-people-eat.cem-yilmaz.de/data-privacy-policy)   | /data-privacy-policy  |
| [Terms and conditions page](https://integration-people-eat.cem-yilmaz.de/terms-and-conditions) | /terms-and-conditions |
| [Individual request page](https://integration-people-eat.cem-yilmaz.de/individual-request)     | /individual-request   |
| [Search results](https://integration-people-eat.cem-yilmaz.de/search-results)                  | /search-results       |

Storybook in integration: [https://storybook-integration-people-eat.cem-yilmaz.de](https://storybook-integration-people-eat.cem-yilmaz.de)

## Production

| Available Pages                                                                    |                       |
| ---------------------------------------------------------------------------------- | --------------------- |
| [Home page](https://people-eat.cem-yilmaz.de)                                      | /                     |
| [Sign in page](https://people-eat.cem-yilmaz.de/sign-in)                           | /sign-in              |
| [Sign up page](https://people-eat.cem-yilmaz.de/sign-up)                           | /sign-up              |
| [How to become a chef page](https://people-eat.cem-yilmaz.de/how-to-chef)          | /how-to-chef          |
| [Chef sign up page](https://people-eat.cem-yilmaz.de/chef-sign-up)                 | /chef-sign-up         |
| [Profile page](https://people-eat.cem-yilmaz.de/profile)                           | /profile              |
| [Chef profile page](https://people-eat.cem-yilmaz.de/chef-profile)                 | /chef-profile         |
| [About us page](https://people-eat.cem-yilmaz.de/about-us)                         | /about-us             |
| [Imprint page](https://people-eat.cem-yilmaz.de/imprint)                           | /imprint              |
| [Data privacy policy page](https://people-eat.cem-yilmaz.de/data-privacy-policy)   | /data-privacy-policy  |
| [Terms and conditions page](https://people-eat.cem-yilmaz.de/terms-and-conditions) | /terms-and-conditions |
| [Search results](https://people-eat.cem-yilmaz.de/search-results)                  | /search-results       |

## Design

The design implemented in this repository is based on the following Figma design:

[https://www.figma.com/file/8idSpCQiNPRTFY5Jr1mR9A/People-Eat-web](https://www.figma.com/file/8idSpCQiNPRTFY5Jr1mR9A/People-Eat-web)

## Technology Stack

-   [Next.js](https://nextjs.org)
-   [TypeScript](https://www.typescriptlang.org)
-   [React](https://reactjs.org)
-   [Tailwind CSS](https://tailwindcss.com)
-   [Prettier](https://prettier.io)
-   [ESLint](https://eslint.org)
-   [mui](https://mui.com)
-   [Apollo Client](https://www.apollographql.com/docs/react)
-   [GraphQL Code Generator](https://graphql-code-generator.com)
-   [Storybook](https://storybook.js.org)
