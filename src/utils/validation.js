export const isValidNumber = (number) =>
  // eslint-disable-next-line no-useless-escape
  /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(
    number
  )
