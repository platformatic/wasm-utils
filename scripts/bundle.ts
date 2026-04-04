#!/usr/bin/env -S node

import { readFile, writeFile } from 'node:fs/promises'

async function generateBundledVersion () {
  const unbundled = await readFile(new URL('../dist/index.js', import.meta.url), 'utf-8')
  const wasm = await readFile(new URL('../dist/native.wasm', import.meta.url))

  const bundled = unbundled
    .replace("import { readFileSync } from 'node:fs';", '')
    .replace(
      "readFileSync(new URL('../dist/native.wasm', import.meta.url));",
      `Uint8Array.from(globalThis.atob('${wasm.toString('base64')}'), c => c.codePointAt(0));`
    )

  await writeFile(new URL('../dist/bundled.js', import.meta.url), bundled, 'utf-8')
}

await generateBundledVersion()
