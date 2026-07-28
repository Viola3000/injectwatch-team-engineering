import { ArrowRight } from "lucide-react";
import { assetPath } from "../../data/syntheticScenario";

export function AssetPath({ detailed = false }: { detailed?: boolean }) {
  return (
    <div>
      <div className={`asset-path ${detailed ? "is-detailed" : ""}`}>
        {assetPath.map((node, index) => (
          <div className="asset-path-piece" key={node.name}>
            <article className="asset-node">
              <span className="node-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{node.name}</h3>
              <dl>
                <div>
                  <dt>Measured</dt>
                  <dd>{node.measured}</dd>
                </div>
                {detailed && (
                  <>
                    <div>
                      <dt>Unknown</dt>
                      <dd>{node.unknown}</dd>
                    </div>
                    <div>
                      <dt>Contribution</dt>
                      <dd>{node.contribution}</dd>
                    </div>
                  </>
                )}
              </dl>
            </article>
            {index < assetPath.length - 1 && (
              <ArrowRight className="asset-arrow" aria-hidden="true" size={18} />
            )}
          </div>
        ))}
      </div>
      <p className="diagram-note">Scenario asset path · not a full-field topology</p>
    </div>
  );
}

