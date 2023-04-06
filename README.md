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

| Available Pages                    |     |
| ---------------------------------- | --- |
| [Home page](http://localhost:3000) | /   |

### Storybook

Start locally:

```bash
yarn storybook:start
```

## Integration

| Available Pages                                           |     |
| --------------------------------------------------------- | --- |
| [Home page](https://integration-people-eat.cem-yilmaz.de) | /   |

Storybook in integration: [https://storybook-integration-people-eat.cem-yilmaz.de](https://storybook-integration-people-eat.cem-yilmaz.de)

## Production

| Available Pages                               |     |
| --------------------------------------------- | --- |
| [Home page](https://people-eat.cem-yilmaz.de) | /   |

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
