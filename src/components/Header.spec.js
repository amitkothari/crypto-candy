import { render, fireEvent } from '@testing-library/svelte';
import Header from './Header';
import { user } from '../store.js';

jest.mock('@onflow/fcl', () => ({
  config: jest.fn(),
  currentUser: () => ({ subscribe: jest.fn() }),
  authenticate: jest.fn(),
  unauthenticate: jest.fn(),
}));

describe('Header', () => {
  let header;

  describe('when user is not logged in', () => {
    beforeEach(() => {
      user.set({ loggedIn: false });
      header = render(Header);
    });

    it('should render login button', async () => {
      const button = header.getByText('Log in');
      await fireEvent.click(button);

      expect(user.login).toBeCalled();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      user.set({ loggedIn: true });
      header = render(Header);
    });

    it('should render logout button', async () => {
      const button = header.getByText('Log out');
      await fireEvent.click(button);

      expect(user.logout).toBeCalled();
    });
  });

  describe('Links', () => {
    beforeEach(() => {
      header = render(Header);
    });

    it('should render home page link', () => {
      header.getByText('Home');
    });

    it('should render collection page link', () => {
      header.getByText('Collection');
    });
  });
});
