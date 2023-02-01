import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="keywords"
          content="browse movies, tv series, people, popular movies, trending movie, popular series, trending series, active communities"
          key="keywords"
        />
        <meta
          name="description"
          content="browse oshere series, movies, people, community of people and more"
          key="description"
        />
        <meta name="theme-color" content="#ff0a78" />
        <meta name="robots" content="index,follow" />
        <meta
          name="subject"
          content="browse oshere series, movies, people, community of people and more"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
