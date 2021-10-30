import { render } from '@testing-library/svelte';
import Footer from './Footer';

describe('Footer', () => {
  it('should render github link', () => {
    const footer = render(Footer);
    expect(footer.getByText('GitHub').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/amitkothari/crypto-candy',
    );
  });
});
