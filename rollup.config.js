import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

import pkg from "./package.json";

function createConfig(input, out) {
  return [
    {
      input: input,
      output: [
        { file: `${out}.js`, format: `esm`, sourcemap: true },
        { file: `${out}.cjs.js`, format: `cjs`, sourcemap: true }
      ],
      external: [
        "react",
        "preact",
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
      ],
      plugins: [
        typescript({ useTsconfigDeclarationDir: true }),
        resolve(),
        sourceMaps(),
        sizeSnapshot()
      ]
    }
  ];
}

const config = [
  ...createConfig("./src/preact/index.ts", "preact/index"),
  ...createConfig("./src/react/index.ts", "react/index")
];

export default config;
