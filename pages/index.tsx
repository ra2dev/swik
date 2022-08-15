import styles from "../styles/Home.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div>swik</div>
        <div>Login</div>
      </nav>
    </header>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Setup swik <a href="https://nextjs.org">SWIK starter</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <svg
              fill="currentColor"
              role="img"
              aria-hidden="true"
              className="gamut-j03qo6-Svg e3tf18d0"
            >
              <title>Dot Loose</title>
              <pattern
                id="DotLoose-pattern-3"
                x="0"
                y="0"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <rect width="0.5" height="0.5" fill="currentColor"></rect>
                <rect y="1" width="0.5" height="0.5" fill="currentColor"></rect>
                <rect
                  y="0.5"
                  width="0.5"
                  height="0.5"
                  fill="currentColor"
                ></rect>
                <rect x="1" width="0.5" height="0.5" fill="currentColor"></rect>
                <rect
                  x="1"
                  y="1"
                  width="0.5"
                  height="0.5"
                  fill="currentColor"
                ></rect>
                <rect
                  x="1"
                  y="0.5"
                  width="0.5"
                  height="0.5"
                  fill="currentColor"
                ></rect>
                <rect
                  x="0.5"
                  width="0.5"
                  height="0.5"
                  fill="currentColor"
                ></rect>
                <rect
                  x="0.5"
                  y="1"
                  width="0.5"
                  height="0.5"
                  fill="currentColor"
                ></rect>
                <rect
                  x="0.5"
                  y="0.5"
                  width="0.5"
                  height="0.5"
                  fill="currentColor"
                ></rect>
              </pattern>
              <rect
                width="100%"
                height="100%"
                fill="url(#DotLoose-pattern-3)"
              ></rect>
            </svg>
          </div>
        </main>

        <footer className={styles.footer}>
          <a href="https://ra2.dev" target="_blank" rel="noopener noreferrer">
            Powered by&nbsp;<b>RA2</b>
          </a>
        </footer>
      </div>
    </>
  );
}
