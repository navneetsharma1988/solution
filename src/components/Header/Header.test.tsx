import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe('Header component', () => {
  test('renders Header text', () => {
    // Arrange
    render(<Header />);

    // Assert
    const headerElement = screen.getByText('George Fx Test');
    expect(headerElement).toBeInTheDocument();
  })
})