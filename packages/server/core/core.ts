import type { PRNG } from 'seedrandom'

export class Core {
  /**
   * Retrieves a random element from an array.
   * @param array - The array to sample from.
   * @returns A random element from the array.
   */
  protected getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  /**
   * Seeded range function.
   * Given a pre-seeded PRNG, select a float between min and max, rounded to the given number of decimals.
   * @param prng
   * @param min
   * @param max
   * @param decimals
   */
  protected seededRange(
    prng: PRNG,
    min: number,
    max: number,
    decimals: number,
  ) {
    const rand = prng.quick() * (max - min) + min
    return rand.toFixed(decimals)
  }

  /**
   * Seeded sample function.
   * Given a pre-seeded PRNG, randomly select an element from the given array.
   * @param prng
   * @param arr
   */
  protected seededSample<T>(prng: PRNG, arr: T[]): T {
    return arr[Math.floor(prng.quick() * (arr.length - 1))] as T
  }
}
