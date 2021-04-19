import axios from 'axios';
import APIDataProvider from './APIDataProvider';

jest.mock('axios');

describe('APIDataProvider', () => {
  let provider;
  beforeEach(() => {
    provider = new APIDataProvider();
  });
  describe('getSearchResults', () => {
    it('should return if no search term is introduced', async () => {
      // Arrange.
      const expected = 'error';
      // Act.
      const result = await provider.getSearchResults('');
      // Assert.
      expect(result).toHaveProperty(expected);
    });
    it('should normalize the search term, build a query, and call axios', async () => {
      // Arrange.
      const expected = 'https://api.github.com/search/repositories?q=foo+bar&page=1&per_page=10&sort=stars';
      axios.get.mockResolvedValue({ data: { items: [] } });
      // Act.
      await provider.getSearchResults('foo bar');
      // Assert.
      expect(axios.get).toHaveBeenCalledWith(expected);
    });
    it('should normalize the results', async () => {
      // Arrange.
      const expected = {
        data: [{
          name: 'foo',
          url: 'bar'
        }]
      };
      axios.get.mockResolvedValue({
        data: {
          items: [{
            name: 'foo',
            html_url: 'bar',
            baz: 1
          }]
        }
      });
      // Act.
      const result = await provider.getSearchResults('foo');
      // Assert.
      expect(result).toEqual(expected);
    });
    it('should return an error message if it fails', async () => {
      // Arrange.
      const expected = 'error';
      axios.get.mockRejectedValueOnce(new Error('foo'));
      // Act.
      const result = await provider.getSearchResults('foo');
      // Assert.
      expect(result).toHaveProperty(expected);
    });
  });
});
