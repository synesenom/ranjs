import variance from './variance'

/**
 * Calculates the unbiased standard deviation of an array of values.
 *
 * @method stdev
 * @memberof ran.dispersion
 * @param {number[]} values Array of values to calculate standard deviation for.
 * @returns {(number|undefined)} Standard deviation of the values if there are more than two, undefined otherwise.
 * @example
 *
 * ran.dispersion.stdev([])
 * // => undefined
 *
 * ran.dispersion.stdev([1])
 * // => undefined
 *
 * ran.dispersion.stdev([1, 2, 3, 4, 5])
 * // => 1.5811388300841898
 */
export default function (values) {
  // TODO Check for undefined in unit test.
  const v = variance(values)
  return v && Math.abs(Math.sqrt(v))
}
