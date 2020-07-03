module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: [
    "**/__tests__/**/*.test.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/example/"
  ]
}
