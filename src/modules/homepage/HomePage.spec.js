import { shallowMount } from '@vue/test-utils';
import HomePage from './HomePage';

describe('NavBar Component', () => {
  it('should render the homepage', () => {
    // Arrange.
    const wrapper = shallowMount(HomePage, {
      stubs: {
        NavBar: true,
        MainTable: true
      }
    });
    // Act.
    // Assert.
    expect(wrapper.find('navbar-stub').exists()).toBe(true);
    expect(wrapper.find('maintable-stub').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
