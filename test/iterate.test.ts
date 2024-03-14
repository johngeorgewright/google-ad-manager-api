import { iterate } from '../src'

test('iterate', async () => {
  let i = 0
  const results: number[] = []

  for await (const result of iterate({
    pageSize: 10,
    executeQuery: async (limit, offset) =>
      offset >= 10
        ? {
            rval: {
              results: [],
              startIndex: offset,
              totalResultSetSize: 0,
            },
          }
        : {
            rval: {
              results: new Array(limit).fill(0).map(() => ++i),
              startIndex: offset,
              totalResultSetSize: limit,
            },
          },
  })) {
    results.push(result)
  }

  expect(results).toMatchInlineSnapshot(`
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]
  `)
})

test('iterate with returning all response info', async () => {
  let i = 0
  const results: number[] = []

  for await (const result of iterate({
    pageSize: 10,
    executeQuery: async (limit, offset) =>
      offset >= 10
        ? [
            {
              rval: {
                results: [],
                startIndex: offset,
                totalResultSetSize: 0,
              },
            },
            'mung',
            'face',
          ]
        : [
            {
              rval: {
                results: new Array(limit).fill(0).map(() => ++i),
                startIndex: offset,
                totalResultSetSize: limit,
              },
            },
            'foo',
            'bar',
          ],
  })) {
    results.push(result)
  }

  expect(results).toMatchInlineSnapshot(`
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]
  `)
})
