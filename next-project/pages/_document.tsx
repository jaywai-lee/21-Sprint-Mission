import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body className="font-base">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
