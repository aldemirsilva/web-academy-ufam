import { useFavoriteProducts } from "@/app/hooks/useFavoriteProducts";
import { useFavoritesContext } from "@/app/hooks/useFavoritesContext";
import { useFavoritesTotalValue } from "@/app/hooks/useFavoritesTotalValue";
import FavoritesList from "./FavoritesList";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockProducts } from "@/app/mocks/products";

jest.mock("../../../app/hooks/useFavoriteProducts", () => ({
  useFavoriteProducts: jest.fn(),
}));

jest.mock("../../../app/hooks/useFavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));

jest.mock("../../../app/hooks/useFavoritesTotalValue", () => ({
  useFavoritesTotalValue: jest.fn(),
}));

describe("FavoritesList", () => {
  const setFavoritesMock = jest.fn();

  beforeEach(() => {
    (useFavoriteProducts as jest.Mock).mockReturnValue([mockProducts[1]]);
    (useFavoritesContext as jest.Mock).mockReturnValue({
      setFavorites: setFavoritesMock,
    });
    (useFavoritesTotalValue as jest.Mock).mockReturnValue(2207.08);
    setFavoritesMock.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the items correctly in the favorites list page", () => {
    render(<FavoritesList />);

    expect(screen.getByText("Lista de favoritos:")).toBeInTheDocument();
    expect(screen.getByText("Smartphone")).toBeInTheDocument();
    expect(screen.getByText("Quantidade de produtos: 1")).toBeInTheDocument();
    expect(screen.getByText("Valor total: R$ 2207.08")).toBeInTheDocument();
  });

  it("should render the favorite product image correctly", () => {
    render(<FavoritesList />);

    const productImage = screen.getByRole("img", {
      name: mockProducts[1].fotos[0].titulo,
    });

    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("src", mockProducts[1].fotos[0].src);
  });

  it("should show an empty state when there are no favorite products", () => {
    (useFavoriteProducts as jest.Mock).mockReturnValueOnce([]);
    (useFavoritesTotalValue as jest.Mock).mockReturnValueOnce(0);

    render(<FavoritesList />);

    expect(
      screen.getByText("Sua lista de favoritos está vazia."),
    ).toBeInTheDocument();
    expect(screen.getByText("Quantidade de produtos: 0")).toBeInTheDocument();
    expect(screen.getByText("Valor total: R$ 0")).toBeInTheDocument();
  });

  it("should render one row per favorite product when there are multiple items", () => {
    (useFavoriteProducts as jest.Mock).mockReturnValueOnce([
      mockProducts[1],
      mockProducts[2],
    ]);

    render(<FavoritesList />);

    expect(screen.getByText("Smartphone")).toBeInTheDocument();
    expect(screen.getByText("Câmera")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Quantidade de produtos: 2")).toBeInTheDocument();
  });

  it("should render the table headers correctly", () => {
    render(<FavoritesList />);

    expect(screen.getByText("Produto")).toBeInTheDocument();
    expect(screen.getByText("Preço")).toBeInTheDocument();
    expect(screen.getByText("Desconto")).toBeInTheDocument();
    expect(screen.getByText("Opções")).toBeInTheDocument();
  });

  it("should render the product description correctly", () => {
    render(<FavoritesList />);

    expect(screen.getByText(mockProducts[1].descricao)).toBeInTheDocument();
  });

  it("should be possible to remove an item clicking on its remove button", () => {
    render(<FavoritesList />);

    fireEvent.click(screen.getByRole("button", { name: /remover/i }));

    expect(setFavoritesMock).toHaveBeenCalledTimes(1);
    expect(setFavoritesMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should not render the table when there are no favorite products", () => {
    (useFavoriteProducts as jest.Mock).mockReturnValueOnce([]);
    (useFavoritesTotalValue as jest.Mock).mockReturnValueOnce(0);

    render(<FavoritesList />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /remover/i }),
    ).not.toBeInTheDocument();
  });

  it("shoud show the correct discount value on page", () => {
    render(<FavoritesList />);

    expect(screen.getByText("8%")).toBeInTheDocument();
  });

  it("should show the correct price value on page", () => {
    render(<FavoritesList />);

    expect(screen.getByText("R$ 2207.08")).toBeInTheDocument();
  });
});
