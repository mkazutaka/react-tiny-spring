import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

function createConfig(pkg) {
  const include = `./packages/${pkg}/src`;
  const input = `./packages/${pkg}/src/index.ts`;
  const output = `./packages/${pkg}/dist/index`;
  
  return [
    {
      input: input,
      output: [
        { file: `${output}.esm.js`, format: `esm`, sourcemap: true },
        { file: `${output}.cjs.js`, format: `cjs`, sourcemap: true }
      ],
      external: [
        "react",
        "preact"
      ],
      plugins: [
        typescript({
          tsconfigDefaults: {
            compilerOptions: {
              declaration: true,
            },
          },
          tsconfigOverride: {
            compilerOptions: {
              target: 'esnext'
            },
            include: [include]
          },
        }),
        resolve(),
        sourceMaps(),
        sizeSnapshot()
      ]
    }
  ];
}

const config = [
  ...createConfig("react-spring-tiny"),
  ...createConfig("react"),
  ...createConfig("preact"),
];

export default config;
