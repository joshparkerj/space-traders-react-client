module.exports = {
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest',
      {
        jsc: {
          parser: {
            jsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};
