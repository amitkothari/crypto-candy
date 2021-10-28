import { render, fireEvent } from '@testing-library/svelte';
import Collection from './Collection';
import { user } from '../store.js';
import { getCollection, createCollection } from '../flow/flow';

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
  const userAddress = 'mock-address';

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
      user.set({ loggedIn: true, addr: userAddress });
    });

    describe('when user does not have a collection', () => {
      let createCollectionButton;

      beforeEach(async () => {
        getCollection.mockReturnValue(false);
        collection = render(Collection);
        createCollectionButton = collection.getByText('Create collection');
      });

      it('should render create collection button', () => {
        expect(createCollectionButton).toBeInTheDocument();
      });

      it('should create collection when the button is clicked', async () => {
        await fireEvent.click(createCollectionButton);
        expect(createCollection).toBeCalledWith(userAddress);
      });
    });

    describe('when user has collection', () => {
      it('should render user collection', () => {
        getCollection.mockReturnValue(true);
        collection = render(Collection);
        expect(collection.getByTestId('user-collection')).toBeInTheDocument();
      });
    });

    describe('when failed to create collectiom', () => {
      let createCollectionButton;

      beforeEach(async () => {
        getCollection.mockReturnValue(false);
        createCollection.mockRejectedValue(new Error());
        collection = render(Collection);
        createCollectionButton = collection.getByText('Create collection');
        await fireEvent.click(createCollectionButton);
      });

      it('should display error message', () => {
        expect(collection.getByTestId('error-alert')).toBeInTheDocument();
      });
    });
  });
});
