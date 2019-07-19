import logBeta from '../special/log-beta'
import Distribution from './_distribution'
import PreComputed from './_pre-computed'
import { gamma } from './_core'

/**
 * Generator for the [beta-geometric distribution]{@link https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/bgepdf.htm}:
 *
 * $$f(k; \alpha, \beta) = \frac{\mathrm{B}(\alpha + 1, \beta + k - 1)}{\mathrm{B}(\alpha, \beta)},$$
 *
 * with \(\alpha, \beta > 0\). Support: \(k \in \{0, ..., n\}\).
 *
 * @class BetaGeometric
 * @memberOf ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @constructor
 */
export default class extends PreComputed {
  constructor (alpha = 1, beta = 1) {
    // TODO Use log PDF
    super()

    // Validate parameters
    this.p = { alpha, beta }
    Distribution._validate({ alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 1,
      closed: true
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _pk (k) {
    if (k < 1) {
      return 0
    }

    return Math.exp(logBeta(this.p.alpha + 1, this.p.beta + k - 1) - logBeta(this.p.alpha, this.p.beta))
  }

  _generator () {
    // TODO Use core beta generator
    let x = gamma(this.r, this.p.alpha, 1)
    let y = gamma(this.r, this.p.beta, 1)
    let z = x / (x + y)
    let p = z === 1 ? 1 - y / x : z
    return Math.floor(Math.log(1 - this.r.next()) / Math.log(1 - p)) + 1
  }
}