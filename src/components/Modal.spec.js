import { render } from '@testing-library/svelte';
import Modal from './Modal';

describe('Modal', () => {
  let modal;

  const message = 'Test message';

  beforeEach(() => {
    modal = render(Modal, { message });
  });

  it('should render message', () => {
    expect(modal.queryByText(message)).toBeInTheDocument();
  });

  it('should render loader', () => {
    expect(modal.getByTestId('loader')).toBeInTheDocument();
  });
});
