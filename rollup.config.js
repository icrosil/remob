import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: 'src/index.js',
  output: { format: 'umd', name: 'remob' },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
      ignoreGlobal: false,
      sourceMap: false,
      ignore: ['conditional-runtime-dependency'],
    }),
    babel({}),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
};

export default config;
