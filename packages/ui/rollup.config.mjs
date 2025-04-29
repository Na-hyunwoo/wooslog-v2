import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';
import postcss from 'rollup-plugin-postcss';

/**
 * FIXME: RSC를 위해 banner 분기 처리 필요
 */
export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: true,
        banner: "'use client';",
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        banner: "'use client';",
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extract: 'styles.css',
        minimize: true,
        extensions: ['.css'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    external: ['react', 'react-dom'],
    plugins: [dts()],
  },
]);
