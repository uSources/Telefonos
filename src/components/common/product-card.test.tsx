import { render, screen } from "@testing-library/react";

import { ProductCard } from "./product-card";

const defaultProps = {
  imageUrl: "/path/to/image.jpg",
  name: "Product Name",
  basePrice: 199.99,
  brand: "BrandName",
};

describe("ProductCard", () => {
  it("renders the product card with correct information", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText("Product Name")).toBeInTheDocument();

    expect(screen.getByText("BrandName")).toBeInTheDocument();

    expect(screen.getByText("199.99 EUR")).toBeInTheDocument();

    const imageElement = screen.getByAltText("Product Name");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      expect.stringContaining("image.jpg")
    );
  });
});
