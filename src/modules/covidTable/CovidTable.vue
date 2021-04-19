<template>
  <div class="results-table">
    <FilterBar
      :is-in-graph-view="isInGraphView"
      :suggestion="suggestion"
      @toggle-view="toggleView"
      @filtered="filter = arguments[0]"
    />
    <DataTable
      v-show="!isInGraphView"
      :data="data"
      :filter="filter"
      :loading="loading"
      :error-msg="errorMsg"
      @suggestion="updateSuggestion"
    />
    <Chart
      v-show="isInGraphView"
      :data="data"
      :filter="filter"
      :loading="loading"
      :error-msg="errorMsg"
    />
  </div>
</template>

<script>
import DataTable from './_components/DataTable';
import FilterBar from './_components/FilterBar';
import Chart from './_components/Chart';

export default {
  name: 'MainTable',
  components: {
    DataTable,
    FilterBar,
    Chart
  },
  data () {
    return {
      data: [],
      loading: false,
      errorMsg: '',
      filter: '',
      isInGraphView: false,
      suggestion: ''
    };
  },
  created () {
    this._performSearch();
  },
  methods: {
    toggleView () {
      this.isInGraphView = !this.isInGraphView;
    },
    updateSuggestion (suggestion) {
      this.suggestion = suggestion;
    },
    async _performSearch () {
      this.errorMsg = '';
      this.loading = true;
      const results = await this.$restActions.getAllCountriesData();
      if (results.error) {
        this.errorMsg = results.error;
      } else if (results && results.data && results.data.length) {
        this.data = results.data;
      } else {
        this.errorMsg = 'Something went wrong.';
      }
      this.loading = false;
    }
  }
};
</script>
