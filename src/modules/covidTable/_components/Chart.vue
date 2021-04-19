<template>
  <div class="chart mx-auto">
    <VueApexCharts
      v-if="data && !errorMsg"
      type="bar"
      :options="options"
      :series="series"
    />
    <div
      v-else-if="loading"
      class="text-center text-danger my-2"
    >
      <b-spinner class="align-middle" />
      <strong>Loading...</strong>
    </div>
    <div
      v-else
      class="text-danger"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import TotalsMixin from '@/modules/covidTable/_components/TotalsMixin';

export default {
  name: 'Chart',
  components: {
    VueApexCharts
  },
  mixins: [TotalsMixin],
  props: {
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
    },
    suggestion: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      options: {
        chart: {
          id: 'covid-cases'
        },
        xaxis: {
          categories: ['Cases', 'Deaths', 'Recoveries']
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return new Intl.NumberFormat().format(val);
            }
          }
        },
        colors: ['#17A2B8', '#DC3545', '#28A745'],
        title: {
          text: 'Worldwide',
          align: 'center'
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            offsetX: 10,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => {
            return new Intl.NumberFormat().format(val);
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#000000']
          }
        }
      }
    };
  },
  computed: {
    series () {
      return [{
        name: 'Cases',
        data: [this.calculateTotals('cases', this.data)]
      }, {
        name: 'Deaths',
        data: [this.calculateTotals('deaths', this.data)]
      }, {
        name: 'Recoveries',
        data: [this.calculateTotals('recoveries', this.data)]
      }];
    }
  }
};
</script>
<style scoped lang="scss">
.chart {
  max-width: 65rem;
  margin-top: 10px;
}
</style>
