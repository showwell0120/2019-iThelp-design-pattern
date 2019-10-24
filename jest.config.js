module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'clover'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    globals: {
        'ts-jest': {
            extends: './babel.config.js'
        }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    modulePathIgnorePatterns: ['dist'],
    moduleNameMapper: {
        '@taxi/(.+)$': '<rootDir>packages/$1/src',
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    notify: true,
    notifyMode: 'always',
    roots: ['<rootDir>packages'],
    testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupTestFrameworkScriptFile: '<rootDir>jest/setupTests.ts',
    snapshotSerializers: ['enzyme-to-json/serializer']
};
