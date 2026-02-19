import { deepStrictEqual, strictEqual } from 'node:assert'
import test from 'node:test'
import { lz4Compress, lz4Decompress, snappyCompress, snappyDecompress } from '../src/index.ts'

test('snappy compression works correctly', () => {
  const input = Buffer.from('test data for compression')
  const validCompressed = '196074657374206461746120666f7220636f6d7072657373696f6e'

  const compressed = snappyCompress(input)
  deepStrictEqual(compressed.toString('hex'), validCompressed)

  const decompressed = snappyDecompress(compressed)
  strictEqual(decompressed.toString(), 'test data for compression')
})

test('lz4 compression works correctly', () => {
  const input = Buffer.from('test data for compression')
  const validCompressed = '04224d186040821900008074657374206461746120666f7220636f6d7072657373696f6e00000000'

  const compressed = lz4Compress(input)
  deepStrictEqual(compressed.toString('hex'), validCompressed)

  const decompressed = lz4Decompress(compressed)
  strictEqual(decompressed.toString(), 'test data for compression')
})
