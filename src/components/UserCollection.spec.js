import { render } from '@testing-library/svelte';
import UserCollection from './UserCollection';
import { getUserCandies } from '../flow/flow';

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

  let userCollection;

  describe('when user collection is empty', () => {
    beforeEach(() => {
      getUserCandies.mockReturnValue([]);
      userCollection = render(UserCollection);
    });
    it('should render empty collection message', () => {
      expect(
        userCollection.getByText('Your collection is empty.'),
      ).toBeInTheDocument();
    });
  });

  describe('when user collection is not empty', () => {
    beforeEach(() => {
      getUserCandies.mockReturnValue(candies);
      userCollection = render(UserCollection);
    });

    it('should display candies', () => {
      candies.forEach(({ name }) => {
        const candyCard = userCollection.getByText(name);
        expect(candyCard).toBeInTheDocument();
      });
    });
  });
});
