import { createLocalVue, shallowMount } from '@vue/test-utils';
import Chart from './Chart';

describe('Chart Component', () => {
  const localVue = createLocalVue();
  const factory = ({ propsData } = {}) => shallowMount(Chart, {
    localVue,
    stubs: {
      VueApexCharts: true,
      bSpinner: true
    },
    propsData: {
      ...propsData
    }
  });
  describe('conditional rendering', () => {
    it('should render the table if data is provided and there are no errors', () => {
      // Arrange.
      const wrapper = factory();
      // Act.
      // Assert.
      expect(wrapper.find('vueapexcharts-stub').exists()).toBe(true);
      expect(wrapper.find('b-spinner-stub').exists()).toBe(false);
      expect(wrapper.find('.error').exists()).toBe(false);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render the loading spinner if loading', () => {
      // Arrange.
      const wrapper = factory({
        propsData: {
          data: null,
          loading: true
        }
      });
      // Act.
      // Assert.
      expect(wrapper.find('vueapexcharts-stub').exists()).toBe(false);
      expect(wrapper.find('bspinner-stub').exists()).toBe(true);
      expect(wrapper.find('.error').exists()).toBe(false);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render an error if there is one', () => {
      const wrapper = factory({
        propsData: {
          errorMsg: 'error'
        }
      });
      // Act.
      // Assert.
      expect(wrapper.find('vueapexcharts-stub').exists()).toBe(false);
      expect(wrapper.find('b-spinner-stub').exists()).toBe(false);
      expect(wrapper.find('.error').exists()).toBe(true);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('computed', () => {
    describe('series', () => {
      it('should return a correct total of each dataset', () => {
        // Arrange.
        const data = [{
          cases: 1,
          deaths: 2,
          recoveries: 3
        }, {
          cases: 1,
          deaths: 2,
          recoveries: 3
        }, {
          cases: 1,
          deaths: 2,
          recoveries: 3
        }];
        const expected = [{
          name: 'Cases',
          data: [3]
        }, {
          name: 'Deaths',
          data: [6]
        }, {
          name: 'Recoveries',
          data: [9]
        }];
        const wrapper = factory({
          propsData: { data }
        });
        // Act.
        // Assert.
        expect(wrapper.vm.series).toStrictEqual(expected);
      });
    });
  });
});
