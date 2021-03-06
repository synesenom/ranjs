import Beta from './beta'
import Distribution from './_distribution'

/**
 * Generator for the [Balding-Nichols distribution]{@link https://en.wikipedia.org/wiki/Balding%E2%80%93Nichols_model}:
 *
 * $$f(x; \alpha, \beta) = \frac{x^{\alpha - 1} (1 - x)^{\beta - 1}}{\mathrm{B}(\alpha, \beta)},$$
 *
 * where $\alpha = \frac{1 - F}{F} p$, $\beta = \frac{1 - F}{F} (1 - p)$ and $F, p \in (0, 1)$.
 * Support: $x \in (0, 1)$. It is simply a re-parametrization of the [beta distribution]{@link #dist.Beta}.
 *
 * @class BaldingNichols
 * @memberof ran.dist
 * @param {number=} F Fixation index. Default value is 0.5.
 * @param {number=} p Allele frequency. Default value is 0.5.
 * @constructor
 */
export default class extends Beta {
  // Special parametrization of the beta distribution
  // Source: Balding and Nichols. A method for quantifying differentiation between populations at multi-allelic loci and
  // its implications for investigating identity and paternity. Genetica (96) 3-12, 1995.
  constructor (F = 0.5, p = 0.5) {
    Distribution.validate({ F, p }, [
      'F > 0', 'F < 1',
      'p > 0', 'p < 1'
    ])
    const f = (1 - F) / F
    super(f * p, f * (1 - p))

    // Set support
    this.s = [{
      value: 0,
      closed: false
    }, {
      value: 1,
      closed: false
    }]
  }
}
