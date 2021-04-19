export default class SearchResultsModel {
  constructor (searchResults) {
    this.countryName = searchResults.Country;
    // this.cases = new Intl.NumberFormat().format(searchResults.TotalConfirmed);
    this.cases = searchResults.TotalConfirmed;
    // this.deaths = new Intl.NumberFormat().format(searchResults.TotalDeaths);
    this.deaths = searchResults.TotalDeaths;
    // this.recoveries = new Intl.NumberFormat().format(searchResults.TotalRecovered);
    this.recoveries = searchResults.TotalRecovered;
  }
}
