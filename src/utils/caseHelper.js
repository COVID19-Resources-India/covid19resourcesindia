const toKebabCase = (i) => (!i ? "" : i.toLowerCase().split(" ").join("-"))

export { toKebabCase }
