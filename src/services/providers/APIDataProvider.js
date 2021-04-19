import axios from 'axios';
import SearchResultsModel from '@/services/models/SearchResultsModel';

/**
 * API Data Provider
 * Queries the endpoint and manages responses
 *
 * @export
 * @class ProductReferenceFactory
 */
export default class APIDataProvider {
  constructor () {
    this.endpoint = 'https://api.covid19api.com/summary';
  }

  /**
   * @memberOf APIDataProvider
   * @return {Promise<*>|Object} - A promise that resolves into normalized data or an error object.
   * @public
   */
  async getAllCountriesData () {
    try {
      const query = this.endpoint;
      const { data } = await axios.get(query);
      return {
        data: this._normalizeResults(data.Countries)
      };
    } catch (e) {
      return { error: 'Data could not be fetched.' };
    }
  }

  /**
   *
   * @param {array} data - An array containing the data returned by the API
   * @return {array} - A normalized results object.
   * @private
   */
  _normalizeResults (data) {
    const normalized = [];
    for (const country of data) {
      normalized.push(new SearchResultsModel(country));
    }
    return normalized;
  }
}
