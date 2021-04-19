<template>
  <div
    class="overflow-auto"
  >
    <b-table
      v-if="(data.length || loading) && !errorMsg"
      sticky-header="100vh"
      striped
      show-empty
      foot-clone
      sort-direction="desc"
      no-footer-sorting
      :fields="fields"
      :items="data"
      :busy="loading"
      :filter="filterRegEx"
      :filter-included-fields="['countryName']"
      @filtered="setFilterResults"
    >
      <template #cell(cases)="column">
        {{ column.value | formatNumber }}
      </template>
      <template #cell(deaths)="column">
        {{ column.value | formatNumber }}
      </template>
      <template #cell(recoveries)="column">
        {{ column.value | formatNumber }}
      </template>
      <template #foot(countryName)="">
        <span class="text-dark">TOTALS</span>
      </template>
      <template #foot(cases)="">
        <span class="text-info">{{ totalCases | formatNumber }}</span>
      </template>
      <template #foot(deaths)="">
        <span class="text-danger">{{ totalDeaths | formatNumber }}</span>
      </template>
      <template #foot(recoveries)="">
        <span class="text-success">{{ totalRecoveries | formatNumber }}</span>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <div
      v-else
      class="text-danger"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<script>
import TotalsMixin from '@/modules/covidTable/_components/TotalsMixin';

export default {
  name: 'DataTable',
  filters: {
    formatNumber (num) {
      return new Intl.NumberFormat().format(num);
    }
  },
  mixins: [TotalsMixin],
  props: {
    filter: {
      type: String,
      required: false,
      default: ''
    },
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    errorMsg: {
      type: String,
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      fields: [{
        key: 'countryName',
        label: 'Country',
        sortable: true,
        sortDirection: 'asc'
      }, {
        key: 'cases',
        label: 'Cases',
        sortable: true
      }, {
        key: 'deaths',
        label: 'Deaths',
        sortable: true
      }, {
        key: 'recoveries',
        label: 'Recoveries',
        sortable: true
      }],
      filterResults: null
    };
  },
  computed: {
    totalCases () {
      return this.calculateTotals('cases', this.filterResults || this.data);
    },
    totalDeaths () {
      return this.calculateTotals('deaths', this.filterResults || this.data);
    },
    totalRecoveries () {
      return this.calculateTotals('recoveries', this.filterResults || this.data);
    },
    filterRegEx () {
      return new RegExp(`^${this.filter}`, 'i');
    }
  },
  watch: {
    filter (value) {
      if (value) {
        this.$nextTick(() => {
          this.$emit('suggestion', this.filterResults[0] && this.filterResults[0].countryName);
        });
      }
    }
  },
  methods: {
    setFilterResults (results) {
      this.filterResults = results;
    }
  }
};
</script>
