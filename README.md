# @platformatic/wasm-utils

High-performance WebAssembly utilities for Node.js.

This package provides fast native-style primitives implemented in Rust and shipped as a `.wasm` module:

- CRC32C checksums
- LZ4 frame compression/decompression
- Snappy compression/decompression

## Requirements

- Node.js `>= 22.19.0`

## Installation

```bash
npm i @platformatic/wasm-utils
```

## Usage

```js
import { crc32c, lz4Compress, lz4Decompress, snappyCompress, snappyDecompress } from '@platformatic/wasm-utils'

const input = Buffer.from('test data for compression')

const crc = crc32c(input)
console.log(crc) // 32-bit unsigned integer

const lz4 = lz4Compress(input)
const lz4Back = lz4Decompress(lz4)

const snappy = snappyCompress(input)
const snappyBack = snappyDecompress(snappy)

console.log(lz4Back.toString()) // test data for compression
console.log(snappyBack.toString()) // test data for compression
```

## API

### `crc32c(data)`

Computes CRC32C for the input.

- **Input:** `Buffer | Uint8Array | DynamicBuffer`
- **Output:** `number` (unsigned 32-bit)

### `lz4Compress(data)`

Compresses input using LZ4 frame format.

- **Input:** `Buffer | DynamicBuffer`
- **Output:** `Buffer`

### `lz4Decompress(data)`

Decompresses LZ4 frame data.

- **Input:** `Buffer | DynamicBuffer`
- **Output:** `Buffer`

### `snappyCompress(data)`

Compresses input using Snappy.

- **Input:** `Buffer | DynamicBuffer`
- **Output:** `Buffer`

### `snappyDecompress(data)`

Decompresses Snappy data.

- **Input:** `Buffer | DynamicBuffer`
- **Output:** `Buffer`

## Development

```bash
pnpm install
pnpm test
```

### Build

```bash
pnpm build
```

`pnpm build` compiles TypeScript and rebuilds the native WebAssembly module (via Docker in `native/docker-compose.yml`).

## License

Apache-2.0 - See [LICENSE](LICENSE) for more information.
