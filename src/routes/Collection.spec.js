import { render } from '@testing-library/svelte';
import Collection from './Collection';
import { user } from '../store.js';
import { getCollection } from '../flow/flow';

jest.mock('../flow/flow');

describe('Home', () => {
  const candies = [
    {
      name: 'Candy Variety 1',
      price: '1.00',
      varietyId: '1',
    },
    {
      name: 'Candy Variety 2',
      price: '2.00',
      varietyId: '2',
    },
  ];

  let collection;

  describe('when user is not logged in', () => {
    beforeEach(() => {
      user.set({ loggedIn: false });
      collection = render(Collection);
    });
    it('should render message to login', () => {
      expect(
        collection.getByText('Please login to view your collection.'),
      ).toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      user.set({ loggedIn: true });
    });

    describe('when user does not have a collection', () => {
      it('should render create collection button', () => {
        getCollection.mockReturnValue(false);
        collection = render(Collection);
        expect(collection.getByText('Create collection')).toBeInTheDocument();
      });
    });

    describe('when user has collection', () => {
      it('should render user collection', () => {
        getCollection.mockReturnValue(true);
        collection = render(Collection);
        expect(collection.getByTestId('user-collection')).toBeInTheDocument();
      });
    });
  });
});
