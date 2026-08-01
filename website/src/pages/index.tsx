import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { ContractDiagram } from "../components/ContractDiagram";
import styles from "./index.module.css";
import { ReactNode } from "react";
import { FEATURES } from "@site/src/lib/features";
import { FeatureCard } from "@site/src/components/FeatureCard";
import { HeroCodeSample } from "@site/src/components/HeroCodeSample";

export default function Home(): ReactNode {
  return (
    <Layout
      title="A typesafe, decoupled API layer for your frontend"
      description="Define your app's API contract once — types, validation, and URLs — and never think about data fetching again."
    >
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container text-center">
          <Heading as="h1" className="hero__title">
            RPC Lite
          </Heading>
          <p className="hero__subtitle">
            A fully decoupled, declarative, type-safe API layer for your
            frontend.
          </p>
        </div>
      </header>

      <main>
        <section className="container flex flex-col gap-8">
          <HeroCodeSample />
          <div className="mamx-auto flex justify-center gap-8">
            <Link className="button button--primary" to="/docs/getting-started">
              Read the Docs
            </Link>
            <Link
              className="button button--outline button--secondary"
              to="/docs/intro"
            >
              GitHub
            </Link>
          </div>
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
          <div className="column">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.tag} feature={feature} />
            ))}
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
