<template>
  <div class="row">
    <div class="col-6">
      <b-form-group
        v-if="!isInGraphView"
        class="mb-0 filter-field"
      >
        <b-input-group size="sm">
          <b-form-input
            :value="ghostSuggestion"
            type="text"
            class="input ghost-complete"
            tabindex="-1"
            disabled
            placeholder="Filter by country"
          />
          <b-form-input
            v-model="filter"
            type="search"
            class="main-input"
            placeholder="Filter by country"
            @keyup.enter="fillSuggestion"
            @keydown.tab="fillSuggestion"
          />
          <b-input-group-append>
            <b-button
              class="clear-filter"
              :disabled="!filter"
              @click="clearFilter"
            >
              Clear
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <div class="col d-inline-flex flex-row-reverse">
      <b-button
        class="toggle-view"
        variant="success"
        @click="toggleView"
      >
        {{ viewLabel }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { TABLE_VIEWS } from '@/modules/covidTable/constants/tableConstants';

export default {
  name: 'FilterBar',
  props: {
    isInGraphView: {
      type: Boolean,
      required: true
    },
    suggestion: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      filter: ''
    };
  },
  computed: {
    viewLabel () {
      return (this.isInGraphView) ? TABLE_VIEWS[0] : TABLE_VIEWS[1];
    },
    ghostSuggestion () {
      if (this.filter) {
        return this.filter.substr(0, this.filter.length) + this.suggestion.substr(this.filter.length, this.suggestion.length);
      }
      return '';
    }
  },
  watch: {
    filter (value) {
      this.$emit('filtered', value);
    }
  },
  methods: {
    toggleView () {
      this.$emit('toggle-view');
    },
    fillSuggestion () {
      this.filter = this.suggestion;
    },
    clearFilter () {
      this.filter = '';
    }
  }
};
</script>
<style scoped lang="scss">
.main-input, .main-input:focus {
  background-color: transparent;
}

.ghost-complete {
  position: absolute !important;
  color: #b4b4b4;
  background-color: white !important;
  width: 100% !important;
  right: 1px;
}
</style>
