import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

function createConfig(pkg) {
  const input = `packages/${pkg}/src/index.ts`;
  const output = `packages/${pkg}/dist/index`;
  const tsconfig = `packages/${pkg}/tsconfig.json`;

  return [
    {
      input: input,
      output: [
        { file: `${output}.esm.js`, format: `esm`, sourcemap: true },
        { file: `${output}.cjs.js`, format: `cjs`, sourcemap: true }
      ],
      external: ["react", "preact"],
      plugins: [
        typescript({
          tsconfig: `${tsconfig}`,
          tsconfigOverride: {
            compilerOptions: {
              target: "esnext"
            }
          }
        }),
        resolve(),
        sourceMaps(),
        sizeSnapshot()
      ]
    }
  ];
}

const config = [
  ...createConfig("core"),
  ...createConfig("react"),
  ...createConfig("preact")
];

export default config;
