
export const html = ([first, ...strings], ...values) =>
    values.reduce((acc, curr) => acc.concat(curr, strings.shift()), [first])
        .filter(x => x && x !== true || x === 0)
        .join('')

export const js = (value) => `"${value}"`

export const bool = bool => !!bool + "";

export default html