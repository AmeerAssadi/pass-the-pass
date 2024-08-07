module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./jest.setup.ts'], // Ensures the setup file is run before tests
    testMatch: ['**/tests/**/*.test.ts'],
};
