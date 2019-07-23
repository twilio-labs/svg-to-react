import {svgTemplate} from './templates';

const TAGS_WITH_FILL = ['path', 'g', 'polygon', 'polyline', 'circle'];

// This is the SVGR lib configuration used to generate the output we desire.
const config = {
  template: svgTemplate,
  expandProps: false, // Don't add {...props} to <svg> tag
  titleProp: true, // Add a <title> tag
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'], // Compress + manipulate SVG output
  svgo: true, // Enable compression
  svgoConfig: {
    plugins: {
      removeViewBox: false,
    },
  },
  // This configures the output SVG JSX, doing a bunch of custom additional functionality
  jsx: {
    babelConfig: {
      plugins: [
        /*
         * Remove any predefined `fill` with their hexes and use currentColor instead
         */
        [
          '@svgr/babel-plugin-remove-jsx-attribute',
          {
            elements: TAGS_WITH_FILL,
            attributes: ['fill'],
          },
        ],
        [
          '@svgr/babel-plugin-add-jsx-attribute',
          {
            elements: TAGS_WITH_FILL,
            attributes: [
              {
                name: 'fill',
                value: 'currentColor',
                position: 'start',
              },
            ],
          },
          'add-fill-currentColor', // Cant use same plugin twice without overriding the name, which this argument does
        ],
        /*
         * Modify SVG wrapper tag to add width, height, and a11y features
         */
        [
          '@svgr/babel-plugin-add-jsx-attribute',
          {
            elements: ['svg'],
            attributes: [
              {
                name: 'width',
                value: '100%',
                position: 'start',
              },
              {
                name: 'height',
                value: '100%',
                position: 'start',
              },
              {
                name: 'aria-labelledby',
                value: `uid`,
                literal: true,
                position: 'start',
              },
              {
                name: 'aria-hidden',
                value: 'decorative',
                literal: true,
                position: 'start',
              },
              {
                name: 'role',
                value: 'img',
                position: 'start',
              },
            ],
          },
          'add-width-and-height',
        ],
        /*
         * Modify <title> tag to add unique ID
         */
        [
          '@svgr/babel-plugin-add-jsx-attribute',
          {
            elements: ['title'],
            attributes: [
              {
                name: 'id',
                value: 'uid',
                literal: true,
                position: 'start',
              },
            ],
          },
          'add-title-aria-label',
        ],
      ],
    },
  },
};

export {config};
