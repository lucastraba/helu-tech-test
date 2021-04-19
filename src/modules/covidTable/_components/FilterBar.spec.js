import { createLocalVue, shallowMount } from '@vue/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar Component', () => {
  const mock$emit = jest.fn();
  const localVue = createLocalVue();
  const factory = ({ propsData } = {}) => shallowMount(FilterBar, {
    localVue,
    stubs: {
      bFormGroup: true,
      bInputGroup: true,
      bFormInput: true,
      bButton: true,
      bInputGroupAppend: true
    },
    mocks: {
      $emit: mock$emit
    },
    propsData: {
      isInGraphView: false,
      ...propsData
    }
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('base rendering', () => {
    it('should render the filter if not in graph view and button should show graph view', () => {
      // Arrange.
      const wrapper = factory();
      // Act.
      // Assert.
      expect(wrapper.find('.filter-field').exists()).toBe(true);
      expect(wrapper.find('.clear-filter').exists()).toBe(true);
      expect(wrapper.find('.toggle-view').text()).toBe('Show Graph');
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should not render the filter if in graph view and button should show table view', () => {
      // Arrange.
      const wrapper = factory({
        propsData: {
          isInGraphView: true
        }
      });
      // Act.
      // Assert.
      expect(wrapper.find('.filter-field').exists()).toBe(false);
      expect(wrapper.find('.clear-filter').exists()).toBe(false);
      expect(wrapper.find('.toggle-view').text()).toBe('Show Table');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('computed', () => {
    describe('ghostSuggestion', () => {
      it('should return an adapted ghost suggestion', async () => {
        // Arrange.
        const wrapper = factory({
          propsData: {
            suggestion: 'Foobar'
          }
        });
        // Act.
        await wrapper.setData({
          filter: 'fo'
        });

        // Assert.
        expect(wrapper.vm.ghostSuggestion).toBe('foobar');
      });
    });
  });
  describe('watchers', () => {
    describe('filter', () => {
      it('should emit the filter to parent component', async () => {
        // Arrange.
        const wrapper = factory();
        // Act.
        await wrapper.setData({
          filter: 'foo'
        });
        // Assert.
        expect(mock$emit).toHaveBeenCalledWith('filtered', 'foo');

        await wrapper.setData({
          filter: 'bar'
        });
        expect(mock$emit).toHaveBeenCalledTimes(2);
      });
    });
  });
  describe('methods', () => {
    describe('toggleView', () => {
      it('should emit the toggle-view event to parent', async () => {
        // Arrange.
        const wrapper = factory();
        // Act.
        wrapper.vm.toggleView();
        // Assert.
        expect(mock$emit).toHaveBeenLastCalledWith('toggle-view');
      });
    });
    describe('fillSuggestion', () => {
      it('should update the filter with the suggestion', async () => {
        // Arrange.
        const wrapper = factory({
          propsData: {
            suggestion: 'Barfoobaz'
          }
        });
        // Act.
        await wrapper.setData({
          filter: 'bar'
        });
        wrapper.vm.fillSuggestion();
        // Assert.
        expect(wrapper.vm.filter).toBe('Barfoobaz');
      });
    });
    describe('clearFilter', () => {
      it('should clear the filter', async () => {
        // Arrange.
        const wrapper = factory();
        // Act.
        await wrapper.setData({
          filter: 'foo'
        });
        wrapper.vm.clearFilter();
        // Assert.
        expect(wrapper.vm.filter).toBe('');
      });
    });
  });
});
