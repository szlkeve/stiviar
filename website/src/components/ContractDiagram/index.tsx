import styles from "./styles.module.css";

interface Props {
  className?: string;
}

const BACKENDS = [".NET", "Go", "Java", "REST"];

export function ContractDiagram({ className }: Props) {
  return (
    <svg
      className={className ? `${styles.diagram} ${className}` : styles.diagram}
      viewBox="0 0 640 400"
      role="img"
      aria-label="Diagram: a single typed contract connects a React frontend to any backend language"
    >
      {/* frontend -> contract */}
      <path d="M 170 200 H 250" className={styles.line} />

      {/* contract -> each backend, fanning out */}
      {BACKENDS.map((name, i) => {
        const y = 60 + i * 90;
        return (
          <path
            key={name}
            d={`M 390 200 C 430 200, 430 ${y}, 470 ${y}`}
            className={styles.lineDashed}
          />
        );
      })}

      {/* frontend box */}
      <rect
        x="20"
        y="160"
        width="150"
        height="80"
        rx="10"
        className={styles.boxFrontend}
      />
      <text x="95" y="196" textAnchor="middle" className={styles.boxLabel}>
        Your React
      </text>
      <text x="95" y="214" textAnchor="middle" className={styles.boxLabel}>
        Hook
      </text>

      {/* contract box */}
      <rect
        x="250"
        y="140"
        width="140"
        height="120"
        rx="10"
        className={styles.boxContract}
      />
      <text
        x="320"
        y="170"
        textAnchor="middle"
        className={styles.contractTitle}
      >
        Contract
      </text>
      <text x="320" y="196" textAnchor="middle" className={styles.contractLine}>
        type User
      </text>
      <text x="320" y="216" textAnchor="middle" className={styles.contractLine}>
        schema
      </text>
      <text x="320" y="236" textAnchor="middle" className={styles.contractLine}>
        url
      </text>

      {/* backend boxes */}
      {BACKENDS.map((name, i) => {
        const y = 60 + i * 90;
        return (
          <g key={name}>
            <rect
              x="470"
              y={y - 25}
              width="150"
              height="50"
              rx="10"
              className={styles.boxBackend}
            />
            <text
              x="545"
              y={y + 5}
              textAnchor="middle"
              className={styles.backendLabel}
            >
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
