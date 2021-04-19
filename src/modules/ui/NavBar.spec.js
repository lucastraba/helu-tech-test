import { shallowMount } from '@vue/test-utils';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  it('should render the nav bar', () => {
    // Arrange.
    const wrapper = shallowMount(NavBar, {
      stubs: {
        bNavbar: true,
        bNavbarBrand: true
      }
    });
    // Act.
    // Assert.
    expect(wrapper.html()).toMatchSnapshot();
  });
});
