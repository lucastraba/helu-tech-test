import { createLocalVue, shallowMount } from '@vue/test-utils';
import DataTable from './DataTable';

describe('DataTable Component', () => {
  const mock$emit = jest.fn();
  const localVue = createLocalVue();
  const factory = ({ propsData } = {}) => shallowMount(DataTable, {
    localVue,
    stubs: {
      bTable: true
    },
    mocks: {
      $emit: mock$emit
    },
    propsData: {
      ...propsData
    }
  });
  describe('conditional rendering', () => {
    it('should render the table provided there is data and there are no errors', () => {
      // Arrange.
      const wrapper = factory({
        propsData: {
          data: [1]
        }
      });
      // Act.
      // Assert.
      expect(wrapper.find('btable-stub').exists()).toBe(true);
      expect(wrapper.find('.error').exists()).toBe(false);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render the table provided it is loading and there are no errors', () => {
      // Arrange.
      const wrapper = factory({
        propsData: {
          loading: true
        }
      });
      // Act.
      // Assert.
      expect(wrapper.find('btable-stub').exists()).toBe(true);
      expect(wrapper.find('.error').exists()).toBe(false);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render the table provided it is loading and there are no errors', () => {
      // Arrange.
      const wrapper = factory({
        propsData: {
          errorMsg: 'foo'
        }
      });
      // Act.
      // Assert.
      expect(wrapper.find('btable-stub').exists()).toBe(false);
      expect(wrapper.find('.error').exists()).toBe(true);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('watch', () => {
    it('should emit a suggestion after a tick if it has value', async () => {
      // Arrange.
      const wrapper = factory();
      // Act.
      wrapper.vm.setFilterResults([{ countryName: 'foo' }]);
      await wrapper.setProps({
        filter: 'foo'
      });
      // Assert.
      expect(mock$emit).toHaveBeenCalledWith('suggestion', 'foo');
    });
    it('should not emit a suggestion after a tick if it doesn\'t have value', async () => {
      // Arrange.
      const wrapper = factory({
        setProps: {
          filter: 'foo'
        }
      });
      // Act.
      wrapper.vm.setFilterResults([{ countryName: 'foo' }]);
      await wrapper.setProps({
        filter: ''
      });
      // Assert.
      expect(mock$emit).not.toHaveBeenCalled();
    });
  });
  describe('computed', () => {
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
    describe('totalCases', () => {
      it('should return the sum of the cases in the dataset', () => {
        // Arrange.
        const expected = 3;
        const wrapper = factory({
          propsData: { data }
        });
        // Act.
        // Assert.
        expect(wrapper.vm.totalCases).toStrictEqual(expected);
      });
      it('should return the sum of the deaths in the dataset', () => {
        // Arrange.
        const expected = 6;
        const wrapper = factory({
          propsData: { data }
        });
        // Act.
        // Assert.
        expect(wrapper.vm.totalDeaths).toStrictEqual(expected);
      });
      it('should return the sum of the recoveries in the dataset', () => {
        // Arrange.
        const expected = 9;
        const wrapper = factory({
          propsData: { data }
        });
        // Act.
        // Assert.
        expect(wrapper.vm.totalRecoveries).toStrictEqual(expected);
      });
    });
    it('should set the correct filter regex', async () => {
      // Arrange.
      const wrapper = factory({
        propsData: {
          filter: 'foo'
        }
      });
      // Act.
      // Assert.
      expect(wrapper.vm.filterRegEx).toEqual(/^foo/i);
      await wrapper.setProps({
        filter: 'bar'
      });
      expect(wrapper.vm.filterRegEx).toEqual(/^bar/i);
    });
  });
});
