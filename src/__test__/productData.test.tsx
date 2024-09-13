import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductModel } from "../interface/ProductModel";
import { AuthProvider } from "../context/AuthContext";
import SidebarProvider from "../context/sideBarContext";
import Product from "../component/productlist";

const mockProduct: ProductModel = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "Test description",
  category: {
    id: 1,
    name: "Test Category",
    image: "https://example.com/category-image.jpg",
    creationAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  images: ["https://example.com/image1.jpg"],
};


const renderProductComponent = () => {
  return render(
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Product data={mockProduct} />
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
};

describe("Product Component Render Test", () => {
test("renders the product", () => {
    renderProductComponent();

    const imgElement = screen.getByAltText("");
    expect(imgElement).toHaveAttribute("src", "https://example.com/image1.jpg");

    const titleElement = screen.getByText("Test Product");
    expect(titleElement).toBeInTheDocument();

    const priceElement = screen.getByText("$ 100");
    expect(priceElement).toBeInTheDocument();

    const categoryElement = screen.getByText("Test Category");
    expect(categoryElement).toBeInTheDocument();

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();
  });
});
