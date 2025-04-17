import { assertLess } from "@std/assert";

// Arrange
const weakMap: WeakMap<symbol, unknown> = new WeakMap();
const SOME_LARGE_OBJECT: Record<string, string> = {};
for (let i = 0; i < 1000; i++) {
  const key = Math.random().toString();
  const value = Math.random().toString();
  SOME_LARGE_OBJECT[key] = value;
}
function leak() {
  const span = {
    id: Symbol(),
    parent: undefined,
    attributes: structuredClone(SOME_LARGE_OBJECT),
  };
  weakMap.set(span.id, span);
}
for (let i = 0; i < 1_000; i++) {
  leak();
}
// @ts-ignore -- V8 expose GC flag is enabled
gc();

// Act
const initialHeapTotal = Deno.memoryUsage().heapTotal;
for (let i = 0; i < 5_000; i++) {
  leak();
}
// @ts-ignore -- V8 expose GC flag is enabled
gc();

// Assert
const heapIncrease = Deno.memoryUsage().heapTotal - initialHeapTotal;
assertLess(heapIncrease, 10_000_000);

console.log('Yay! No memory leaks =)');
