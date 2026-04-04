import { DynamicBuffer } from '@platformatic/dynamic-buffer'
import { deepStrictEqual, strictEqual } from 'node:assert'
import test from 'node:test'
import { crc32c, lz4Compress, lz4Decompress, snappyCompress, snappyDecompress } from '../dist/bundled.js'

test('crc32 hashing works correctly with the bundled version', () => {
  const longString =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis cursus metus vel tristique. Proin congue massa massa, a malesuada dolor ullamcorper a. Nulla eget leo vel orci venenatis placerat. Donec semper condimentum justo, vel sollicitudin dolor consequat id. Nunc sed aliquet felis, eget congue nisi. Mauris eu justo suscipit, elementum turpis ut, molestie tellus. Mauris ornare rutrum fringilla. Nulla dignissim luctus pretium. Nullam nec eros hendrerit sapien pellentesque sollicitudin. Integer eget ligula dui. Mauris nec cursus nibh. Nunc interdum elementum leo, eu sagittis eros sodales nec. Duis dictum nulla sed tincidunt malesuada. Quisque in vulputate sapien. Sed sit amet tellus a est porta rhoncus sed eu metus. Mauris non pulvinar nisl, volutpat luctus enim. Suspendisse est nisi, sagittis at risus quis, ultricies rhoncus sem. Donec ullamcorper purus eget sapien facilisis, eu eleifend felis viverra. Suspendisse elit neque, semper aliquet neque sed, egestas tempus leo. Duis condimentum turpis duis.'
  const buffer = Buffer.from(longString)
  deepStrictEqual(crc32c(new DynamicBuffer(buffer)), 1796588439)
})

test('snappy compression works correctly works correctly with the bundled version', () => {
  const input = Buffer.from('test data for compression')
  const validCompressed = '196074657374206461746120666f7220636f6d7072657373696f6e'

  const compressed = snappyCompress(input)
  deepStrictEqual(compressed.toString('hex'), validCompressed)

  const decompressed = snappyDecompress(compressed)
  strictEqual(decompressed.toString(), 'test data for compression')
})

test('lz4 compression works correctly works correctly with the bundled version', () => {
  const input = Buffer.from('test data for compression')
  const validCompressed = '04224d186040821900008074657374206461746120666f7220636f6d7072657373696f6e00000000'

  const compressed = lz4Compress(input)
  deepStrictEqual(compressed.toString('hex'), validCompressed)

  const decompressed = lz4Decompress(compressed)
  strictEqual(decompressed.toString(), 'test data for compression')
})
