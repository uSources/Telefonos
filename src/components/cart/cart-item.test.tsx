import { render, screen, fireEvent } from "@testing-library/react";

import { useCart } from "@/hooks/cart/use-cart";

import { CartItem } from "./cart-item";

jest.mock("@/hooks/cart/use-cart", () => ({
  useCart: jest.fn(),
}));

const cartItemProps = {
  id: "123",
  imageUrl: "http://example.com/image.jpg",
  storage: "64GB",
  name: "Galaxy S24 Ultra",
  color: "Blue",
  price: 1200,
};

describe("CartItem", () => {
  it("should render the cart item details", () => {
    const removeItemMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({ removeItem: removeItemMock });

    render(<CartItem {...cartItemProps} />);

    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("64GB | Blue")).toBeInTheDocument();
    expect(screen.getByText("1200 EUR")).toBeInTheDocument();

    const image = screen.getByAltText("Galaxy S24 Ultra");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("image.jpg"));
  });

  it("should call removeItem when the remove button is clicked", () => {
    const removeItemMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({ removeItem: removeItemMock });

    render(<CartItem {...cartItemProps} />);

    const removeButton = screen.getByText("Remove");
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(removeItemMock).toHaveBeenCalledWith("123");
  });
});
