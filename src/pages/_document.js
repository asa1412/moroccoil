import Document, { Html, Head, Main, NextScript } from 'next/document';
import siteSettings from '../assets/data/siteUtils';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={siteSettings.language}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="/styles/fonts.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&family=Frank+Ruhl+Libre:wght@300..900&display=swap"
            rel="stylesheet"
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&family=Frank+Ruhl+Libre:wght@300..900&display=swap"
              rel="stylesheet"
            />
          </noscript>

          {/* Add the following lines */}
          <link rel="manifest" href="/manifest.json" /> {/* Link to manifest.json */}
          <meta name="theme-color" content="#000000" /> {/* Theme color for the address bar */}
          <link rel="icon" href="/favicon.ico" /> {/* Favicon */}

          <style>{`
            :root {
              --font-size-h1: 48px;
              --font-size-h2: 36px;
              --font-size-h3: 30px;
              --font-size-h4: 24px;
              --font-size-h5: 20px;
              --font-size-h6: 18px;
              --font-size-p: 16px;
              --font-size-a: 16px;
              --font-size-th: 16px;
              --font-size-ul: 16px;
              --font-size-li: 16px;
              --font-size-b: 16px;
              --font-size-strong: 16px;
              --font-size-span: 16px;
            }
            
            @media (max-width: 768px) {
              :root {
                --font-size-h1: 32px;
                --font-size-h2: 28px;
                --font-size-h3: 24px;
                --font-size-h4: 20px;
                --font-size-h5: 18px;
                --font-size-h6: 16px;
                --font-size-p: 15px;
                --font-size-a: 14px;
                --font-size-th: 14px;
                --font-size-ul: 14px;
                --font-size-li: 14px;
                --font-size-b: 14px;
                --font-size-strong: 14px;
                --font-size-span: 14px;
              }
            }
            
            h1 {
              font-size: var(--font-size-h1);
            }
            
            h2 {
              font-size: var(--font-size-h2);
              margin-top: 4rem;
              margin-bottom: 1.5rem;
            }
            
            h3 {
              font-size: var(--font-size-h3);
              margin-top: 2rem;
              margin-bottom: 0.75rem;
            }
            
            h4 {
              font-size: var(--font-size-h4);
              margin-top: 1rem;
              margin-bottom: 0.35rem;
            }
            
            h5 {
              font-size: var(--font-size-h5);
            }
            
            h6 {
              font-size: var(--font-size-h6);
            }
            
            p {
              font-size: var(--font-size-p);
            }
            
            a {
              font-size: var(--font-size-a);
            }
            
            th {
              font-size: var(--font-size-th);
            }
            
            ul, ol {
              font-size: var(--font-size-ul);
            }
            
            li {
              font-size: var(--font-size-li);
            }
            
            b, strong {
              font-size: var(--font-size-b);
            }
            
            span {
              font-size: var(--font-size-span);
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
