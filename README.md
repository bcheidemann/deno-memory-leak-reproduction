# Deno (v8?) Memory Leak Reproduction

| [!WARNING]
| This may not be a Deno issue. I tried waiting for 1 second before asserting the memory
| usage and it resolved the issue. It may be that the `gc` function exposed by v8 is not
| working correctly. Run with `DO_SLEEP=yes` to reproduce this case.

Between Deno v2.1.12 and Deno v2.2.0 a memory leak seems to have been introduced.

To replicate the memory leak, run `deno upgrade 2.2.0` then `./test.sh`.

To replicate the memory being freed correctly, run `deno upgrade 2.1.12` then `./test.sh`.
