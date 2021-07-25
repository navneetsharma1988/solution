export class QueryParamsUtil {
  static getQuerySearchParams(location: Location) {
    const querySearchParams = new URLSearchParams(location.search);
    return {
      searchInput: querySearchParams.get('searchInput') ?? ''
    };
  }

  static updateURL(searchInput: string) {
    const querySearchParams = new URLSearchParams();
    querySearchParams.set('searchInput', searchInput);
    window.history.pushState(null, '', `?${querySearchParams.toString()}`);
  }
}
