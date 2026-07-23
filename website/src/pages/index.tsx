import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { ContractDiagram } from "../components/ContractDiagram";
import styles from "./index.module.css";
import { ReactNode } from "react";
import { COMPARISON_ROWS, FEATURES } from "@site/src/lib/features";

export default function Home(): ReactNode {
  const videoSrc = useBaseUrl("/videos/type_demo.mp4");

  return (
    <Layout
      title="A typesafe, decoupled API layer for your frontend"
      description="Define your app's API contract once — types, validation, and URLs — and never think about data fetching again."
    >
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container">
          <p className={styles.eyebrow}>ONE CONTRACT. ANY BACKEND.</p>
          <Heading as="h1" className="hero__title">
            Lightweight type wrapper around your API endpoint
          </Heading>
          <p className="hero__subtitle">
            A fully decoupled, declarative, type-safe API layer for your
            frontend.
          </p>
          <div className="margin-top--lg">
            <Link
              className="button button--primary button--lg margin-right--md"
              to="/docs/getting-started"
            >
              Get started
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/docs/intro"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="container margin-vert--xl">
          <div className={styles.demoFrame}>
            <div className={styles.demoFrameBar}>
              <span className={styles.dot} data-color="red" />
              <span className={styles.dot} data-color="yellow" />
              <span className={styles.dot} data-color="green" />
            </div>
            <video
              className={styles.demoVideo}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="container margin-vert--xl">
          <div className="row row--align-center">
            <div className="col col--6">
              <Heading as="h2">Why this exists</Heading>
              <p>
                Every frontend team eventually writes the same brittle layer by
                hand: a fetch call, a response cast to <code>any</code>, a
                loading flag, an error flag, and a silent hope that the backend
                didn't change shape overnight.
              </p>
              <p>
                Type-safe API clients like tRPC and oRPC solve part of this —
                but only if your backend is TypeScript, in the same monorepo,
                and willing to couple its release cycle to your frontend's.
              </p>
              <p>
                <strong>
                  This library takes a different approach: the contract lives on
                  the frontend, and the backend can be anything.
                </strong>
              </p>
            </div>
            <div className="col col--6 text--center">
              <ContractDiagram className={styles.diagram} />
            </div>
          </div>
        </section>

        <section className="container margin-vert--xl">
          <Heading as="h2" className="text--center margin-bottom--lg">
            What you get
          </Heading>
          <div className="row">
            {FEATURES.map((feature) => (
              <div key={feature.tag} className="col col--4 margin-bottom--lg">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card__header">
                    <span className={styles.featureTag}>{feature.tag}</span>
                    <Heading as="h3">{feature.title}</Heading>
                  </div>
                  <div className="card__body">
                    <p>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container margin-vert--xl">
          <Heading as="h2" className="text--center margin-bottom--lg">
            How it compares
          </Heading>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>This library</th>
                  <th>tRPC</th>
                  <th>oRPC</th>
                  <th>fetch / Axios</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.lib}</td>
                    <td>{row.trpc}</td>
                    <td>{row.orpc}</td>
                    <td>{row.raw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="container margin-vert--xl padding-vert--xl text--center">
          <Heading as="h2">
            Ready to stop writing the same data-fetching boilerplate?
          </Heading>
          <p>
            Head to the Getting Started guide to install the library and define
            your first API model in under five minutes.
          </p>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started"
          >
            Get started
          </Link>
        </section>
      </main>
    </Layout>
  );
}
