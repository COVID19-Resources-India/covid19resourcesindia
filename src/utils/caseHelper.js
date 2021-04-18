const toKebabCase = (i) => (!i ? "" : i.toLowerCase().split(" ").join("-"))
const toTitleCase = (i) =>
  !i
    ? ""
    : i
        .toString()
        .replace(/([a-z])([A-Z])/g, function (a, firstMatch, secondMatch) {
          return firstMatch + " " + secondMatch
        })
        .toLowerCase()
        .replace(/([ -_]|^)(.)/g, function (a, firstMatch, secondMatch) {
          return (firstMatch ? " " : "") + secondMatch.toUpperCase()
        })

export { toTitleCase, toKebabCase }
