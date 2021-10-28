import { render } from '@testing-library/svelte';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert', () => {
  const message = 'Error message';

  let errorAlert;
  beforeEach(() => {
    errorAlert = render(ErrorAlert, { message, handleCloseAlert: jest.fn() });
  });

  it('should render message', () => {
    expect(errorAlert.queryByText(message)).toBeInTheDocument();
  });
});
