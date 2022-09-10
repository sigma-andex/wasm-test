import { init, WASI } from "@wasmer/wasi";
import { WasmFs } from "@wasmer/wasmfs";

import fs from "fs";
await init();

let wasi = new WASI({
  env: {
    // 'ENVVAR1': '1',
    // 'ENVVAR2': '2'
  },
  args: [
    // 'command', 'arg1', 'arg2'
  ],
});

const buf = fs.readFileSync('test.wasm');

const module = await WebAssembly.compile(
  new Uint8Array(buf)
);
// Instantiate the WASI module
await wasi.instantiate(module, {});

// Run the start function
let exitCode = wasi.start();
//let stdout = wasi.getStdoutString();

// This should print "hello world (exit code: 0)"
//console.log(`${stdout}(exit code: ${exitCode})`);
