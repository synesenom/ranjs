import Distribution from './_distribution'

/**
 * Generator for the [Gumbel distribution]{@link https://en.wikipedia.org/wiki/Gumbel_distribution}:
 *
 * $$f(x; \mu, \beta) = \frac{1}{\beta} e^{-(z + e^{-z})},$$
 *
 * with $z = \frac{x - \mu}{\beta}$ and $\mu \in \mathbb{R}$, $\beta > 0$. Support: $x \in \mathbb{R}$.
 *
 * @class Gumbel
 * @memberof ran.dist
 * @param {number=} mu Location parameter. Default value is 0.
 * @param {number=} beta Scale parameter. Default value is 1.
 * @constructor
 */
export default class extends Distribution {
  constructor (mu = 0, beta = 1) {
    super('continuous', arguments.length)

    // Validate parameters
    this.p = { mu, beta }
    Distribution.validate({ mu, beta }, [
      'beta > 0'
    ])

    // Set support
    this.s = [{
      value: -Infinity,
      closed: false
    }, {
      value: Infinity,
      closed: false
    }]
  }

  _generator () {
    // Inverse transform sampling
    return this._q(this.r.next())
  }

  _pdf (x) {
    const z = (x - this.p.mu) / this.p.beta
    return Math.exp(-(z + Math.exp(-z))) / this.p.beta
  }

  _cdf (x) {
    return Math.exp(-Math.exp(-(x - this.p.mu) / this.p.beta))
  }

  _q (p) {
    return this.p.mu - this.p.beta * Math.log(-Math.log(p))
  }
}
