<script>
export default {
  name: 'TotalsMixin',
  methods: {
    calculateTotals (key, dataSet = []) {
      let total = 0;
      for (const element of dataSet) {
        total += parseInt(element[key]);
      }
      return total;
    }
  }
};
</script>
