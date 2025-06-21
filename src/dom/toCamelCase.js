export default function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special chars if any
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
}
