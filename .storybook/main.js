const path = require('path');

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    addons: [
      "@storybook/addon-actions",
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-controls",  
    ],
    typescript: {
      check: false,
      checkOptions: {},
      reactDocgen: 'react-docgen-typescript',
      reactDocgenTypescriptOptions: {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        compilerOptions: {
          allowSyntheticDefaultImports: true,
        }
      },
    },
    webpackFinal: async (config) => {
      // Replaces the webpack rule that loads SVGs as static files to leave out SVG files for us to handle
      const indexOfRuleToRemove = config.module.rules.findIndex(rule => rule.test.toString().includes('svg'))
      config.module.rules.splice(indexOfRuleToRemove, 1, {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
          esModule: false
        }
      })
  
      config.module.rules.push(
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
          include: path.resolve(__dirname, '../'),
        },
        {
          test: /.svg$/,
          use: ['@svgr/webpack'],
        },
  
      )
      config.resolve.extensions.push('.ts', '.tsx');
      return config
    },
  };