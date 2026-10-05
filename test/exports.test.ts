import { strictEqual } from 'node:assert'
import { execFileSync } from 'node:child_process'
import test from 'node:test'

function resolveMainExport (conditions: string[] = []): string {
  return execFileSync(
    process.execPath,
    [
      ...conditions.map(condition => `--conditions=${condition}`),
      '--input-type=module',
      '--eval',
      "console.log(import.meta.resolve('@platformatic/wasm-utils'))"
    ],
    { cwd: new URL('..', import.meta.url), encoding: 'utf-8' }
  ).trim()
}

test('the main export resolves to the unbundled version by default', () => {
  strictEqual(resolveMainExport(), new URL('../dist/index.js', import.meta.url).href)
})

test('the main export resolves to the bundled version under the bun condition', () => {
  strictEqual(resolveMainExport(['bun']), new URL('../dist/bundled.js', import.meta.url).href)
})
