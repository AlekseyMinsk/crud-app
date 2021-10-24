import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Footer from './Footer'
import Login from './Login';

describe('Footer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer/>, div);
  });
});

describe('Input', () => {
  it('check insert email', () => {
    render(<Login />);
    const input = screen.getByPlaceholderText(/email/i);
    userEvent.type(input, 'alice@example.com');
    expect(input).toHaveValue('alice@example.com');
  })
})