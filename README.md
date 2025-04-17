# Deno Memory Leak Reproduction

Between Deno v2.1.12 and Deno v2.2.0 a memory leak seems to have been introduced.

To replicate the memory leak, run `deno upgrade 2.2.0` then `./test.sh`.

To replicate the memory being freed correctly, run `deno upgrade 2.1.12` then `./test.sh`.
