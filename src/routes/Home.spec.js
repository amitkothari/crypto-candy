import { render, fireEvent } from '@testing-library/svelte';
import Home from './Home';
import { user } from '../store.js';
import { navigate } from 'svelte-routing';

import * as fcl from '@onflow/fcl';
import { getVarieties, getCollection, mintCandy } from '../flow/flow';

jest.mock('svelte-routing');
jest.mock('../flow/flow');

jest.mock('@onflow/fcl', () => ({
  config: jest.fn(),
  currentUser: () => ({ subscribe: jest.fn() }),
  authenticate: jest.fn(),
  unauthenticate: jest.fn(),
}));

describe('Home', () => {
  const varieties = [
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

  let home;

  beforeEach(() => {
    getVarieties.mockReturnValue(varieties);
    user.set({ addr: 'test-user-addr' });
    home = render(Home);
  });

  it('should render heading', () => {
    const heading = home.getByTestId('heading');
    expect(heading).toHaveTextContent('Crypto Candy');
  });

  it('should render sub-heading', () => {
    const subHeading = home.getByTestId('sub-heading');
    expect(subHeading).toHaveTextContent(
      'Collect and trade crypto candy on Flow blockchain',
    );
  });

  it('should render candy varieties', () => {
    varieties.forEach(({ name }) => {
      const candyCard = home.getByText(name);
      expect(candyCard).toBeInTheDocument();
    });
  });

  describe('when buy candy button is clicked', () => {
    const candy = varieties[0];

    let buyCandyButton;
    beforeEach(() => {
      buyCandyButton = home.getByTestId(`buy-candy-${candy.varietyId}`);
    });

    describe('and user does not have a collection', () => {
      beforeEach(async () => {
        getCollection.mockReturnValue(false);
        await fireEvent.click(buyCandyButton);
      });

      it('should authenticate user', () => {
        expect(fcl.authenticate).toBeCalled();
      });

      it('should get user collection', () => {
        expect(getCollection).toBeCalled();
      });

      it('should navigate to collection route', () => {
        expect(navigate).toBeCalledWith('/collection', { replace: true });
      });
    });

    describe('and user has a collection', () => {
      describe('and candy minted successfully', () => {
        beforeEach(async () => {
          getCollection.mockReturnValue(true);
          await fireEvent.click(buyCandyButton);
        });

        it('should authenticate user', () => {
          expect(fcl.authenticate).toBeCalled();
        });

        it('should get user collection', () => {
          expect(getCollection).toBeCalled();
        });

        it('should mint candy', () => {
          expect(mintCandy).toBeCalledWith(candy.varietyId, candy.price);
        });
      });

      describe('and failed to mint candy', () => {
        beforeEach(async () => {
          mintCandy.mockRejectedValue(new Error());
          getCollection.mockReturnValue(true);
          await fireEvent.click(buyCandyButton);
        });

        it('should render error message', () => {
          expect(home.getByTestId('error-alert')).toBeInTheDocument();
        });
      });
    });
  });
});
