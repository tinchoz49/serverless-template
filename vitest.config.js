export default {
  test: {
    coverage: {
      exclude: ['migrations/**'],
      reporter: [
        'html',
        'text'
      ],
      lines: 95,
      branches: '82',
      statements: '95'
    }
  }
}
