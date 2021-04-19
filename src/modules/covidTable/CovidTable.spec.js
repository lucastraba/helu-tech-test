import { createLocalVue, shallowMount } from '@vue/test-utils';
import CovidTable from './CovidTable';

describe('CovidTable Component', () => {
  const mock$restActions = {
    getAllCountriesData: jest.fn().mockReturnValue({
      data: []
    })
  };
  const localVue = createLocalVue();
  const factory = () => shallowMount(CovidTable, {
    localVue,
    stubs: {
      FilterBar: true,
      DataTable: true,
      Chart: true
    },
    mocks: {
      $restActions: mock$restActions
    }
  });
  describe('base rendering', () => {
    it('should render the nav bar in table mode', () => {
      // Arrange.
      const wrapper = factory();
      const table = wrapper.find('datatable-stub');
      const chart = wrapper.find('chart-stub');
      // Act.
      // Assert.
      expect(wrapper.find('filterbar-stub').exists()).toBe(true);
      expect(table.exists()).toBe(true);
      expect(table.attributes('style')).toBeFalsy();
      expect(chart.exists()).toBe(true);
      expect(chart.attributes('style')).toBe('display: none;');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('conditional rendering', () => {
    it('should render the nav bar in graph mode', async () => {
      const wrapper = factory();
      const table = wrapper.find('datatable-stub');
      const chart = wrapper.find('chart-stub');
      // Act.
      await wrapper.vm.toggleView();
      // Assert.
      expect(table.attributes('style')).toBe('display: none;');
      expect(chart.attributes('style')).toBeFalsy();
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render with error message if something failed in the service', async () => {
      // Arrange.
      mock$restActions.getAllCountriesData.mockReturnValueOnce({
        error: 'error'
      });
      const wrapper = factory();
      const table = wrapper.find('datatable-stub');
      const chart = wrapper.find('chart-stub');
      // Act.
      await wrapper.vm.$nextTick();
      // Assert.
      expect(table.attributes('errormsg')).toBe('error');
      expect(chart.attributes('errormsg')).toBe('error');
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render with generic error message if no error is provided', async () => {
      // Arrange.
      mock$restActions.getAllCountriesData.mockReturnValueOnce({
        foo: 'bar'
      });
      const wrapper = factory();
      const table = wrapper.find('datatable-stub');
      const chart = wrapper.find('chart-stub');
      // Act.
      await wrapper.vm.$nextTick();
      // Assert.
      expect(table.attributes('errormsg')).toBe('Something went wrong.');
      expect(chart.attributes('errormsg')).toBe('Something went wrong.');
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should pass the data if everything went 200 OK', async () => {
      // Arrange.
      mock$restActions.getAllCountriesData.mockReturnValueOnce({
        data: ['foo']
      });
      const wrapper = factory();
      const table = wrapper.find('datatable-stub');
      const chart = wrapper.find('chart-stub');
      // Act.
      await wrapper.vm.$nextTick();
      // Assert.
      expect(table.attributes('data')).toBe('foo');
      expect(chart.attributes('data')).toBe('foo');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('methods', () => {
    describe('updateSuggestion', () => {
      it('should update the suggestion', () => {
        // Arrange.
        const wrapper = factory();
        // Act.
        // Assert.
        expect(wrapper.vm.suggestion).toBe('');
        wrapper.vm.updateSuggestion('foo');
        expect(wrapper.vm.suggestion).toBe('foo');
      });
    });
  });
});
