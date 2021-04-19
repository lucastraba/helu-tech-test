import axios from 'axios';
import APIDataProvider from './APIDataProvider';
import SearchResultsModel from '@/services/models/SearchResultsModel';

jest.mock('axios');

describe('APIDataProvider', () => {
  let provider;
  beforeEach(() => {
    provider = new APIDataProvider();
  });
  describe('getSearchResults', () => {
    it('should return an error object if there is an error', async () => {
      // Arrange.
      axios.get.mockImplementationOnce(() => throw new Error('This is an error'));
      const expected = 'error';
      // Act.
      const result = await provider.getAllCountriesData();
      // Assert.
      expect(result).toHaveProperty(expected);
    });
    it('should normalize and return the data', async () => {
      // Arrange.
      axios.get.mockResolvedValue({
        data: {
          Countries: [{
            Country: 'foo',
            TotalConfirmed: 1,
            TotalDeaths: 2,
            TotalRecovered: 3
          }, {
            Country: 'bar',
            TotalConfirmed: 4,
            TotalDeaths: 5,
            TotalRecovered: 6
          }, {
            Country: 'baz',
            TotalConfirmed: 7,
            TotalDeaths: 8,
            TotalRecovered: 9
          }]
        }
      });
      // Act.
      const result = await provider.getAllCountriesData();
      // Assert.
      expect(result.data.length).toBe(3);
      expect(result.data[0]).toBeInstanceOf(SearchResultsModel);
    });
  });
});
