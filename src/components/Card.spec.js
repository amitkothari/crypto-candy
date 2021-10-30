import { render, fireEvent } from '@testing-library/svelte';
import Card from './Card';

jest.mock('../flow/flow');

describe('Card', () => {
  const candy = {
    name: 'Candy A',
    price: '1',
    varietyId: '1',
  };
  const mockHandleBuyCandy = jest.fn();

  let card;
  describe('when handleBuyCandy is set', () => {
    beforeEach(() => {
      card = render(Card, {
        ...candy,
        handleBuyCandy: mockHandleBuyCandy,
      });
    });

    it('should render variety id', () => {
      const varietyId = card.queryByText(candy.varietyId);
      expect(varietyId).toBeInTheDocument();
    });

    it('should render name', () => {
      const name = card.getByText(candy.name);
      expect(name).toBeInTheDocument();
    });

    it('should render price', () => {
      const price = card.getByText(candy.price);
      expect(price).toBeInTheDocument();
    });

    it('should render buy button', () => {
      const button = card.queryByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle button click', async () => {
      const button = card.queryByRole('button');
      await fireEvent.click(button);
      expect(mockHandleBuyCandy).toBeCalledWith(candy.varietyId, candy.price);
    });
  });

  describe('when handleBuyCandy is not set', () => {
    let button;
    beforeEach(() => {
      card = render(Card, { ...candy, handleBuyCandy: null });
      button = card.queryByRole('button');
    });

    it('should not render buy button', () => {
      expect(button).not.toBeInTheDocument();
    });
  });
});
