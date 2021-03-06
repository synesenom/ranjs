import fnBeta from '../special/beta'
import { regularizedBetaIncomplete } from '../special/beta-incomplete'
import { beta as rBeta } from './_core'
import Distribution from './_distribution'

/**
 * Generator for the [beta distribution]{@link https://en.wikipedia.org/wiki/Beta_distribution}:
 *
 * $$f(x; \alpha, \beta) = \frac{x^{\alpha - 1}(1 - x)^{\beta - 1}}{\mathrm{B}(\alpha, \beta)},$$
 *
 * with $\alpha, \beta > 0$ and $\mathrm{B}(\alpha, \beta)$ is the beta function.
 * Support: $x \in (0, 1)$.
 *
 * @class Beta
 * @memberof ran.dist
 * @param {number=} alpha First shape parameter. Default value is 1.
 * @param {number=} beta Second shape parameter. Default value is 1.
 * @constructor
 */
export default class extends Distribution {
  constructor (alpha = 1, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { alpha, beta }
    Distribution.validate({ alpha, beta }, [
      'alpha > 0',
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: 0,
      closed: alpha >= 1
    }, {
      value: 1,
      closed: beta >= 1
    }]

    // Speed-up constants
    this.c = [
      fnBeta(alpha, beta),
      alpha - 1,
      beta - 1
    ]
  }

  _generator () {
    // Direct generation
    return rBeta(this.r, this.p.alpha, this.p.beta)
  }

  _pdf (x) {
    const a = Math.pow(x, this.c[1])

    const b = Math.pow(1 - x, this.c[2])

    // Handle x = 0 and x = 1 cases
    return Number.isFinite(a) && Number.isFinite(b)
      ? a * b / this.c[0]
      : 0
  }

  _cdf (x) {
    return regularizedBetaIncomplete(this.p.alpha, this.p.beta, x)
  }
}
