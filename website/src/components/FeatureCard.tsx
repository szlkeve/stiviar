import styles from "@site/src/pages/index.module.css";
import Heading from "@theme/Heading";
import { Feature } from "@site/src/lib/types";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
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
  );
}
