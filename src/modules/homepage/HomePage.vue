<template>
  <div class="home-page">
    <NavBar />
    <MainTable />
  </div>
</template>

<script>
import MainTable from '@/modules/covidTable/CovidTable';
import NavBar from '@/modules/ui/NavBar';

export default {
  name: 'HomePage',
  components: {
    NavBar,
    MainTable
  },
  data () {
    return {
      searchTerm: null
    };
  }
};
</script>
