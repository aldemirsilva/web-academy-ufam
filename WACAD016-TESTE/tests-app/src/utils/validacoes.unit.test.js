const {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
} = require("./validacoes");

describe("Testa a função firstName", () => {
  describe("Dada uma entrada válida deve retornar o primeiro nome.", () => {
    test("Verifica se está retornando o primeiro nome corretamente.", () => {
      expect(firstName("Fulano da Silva")).toBe("Fulano");
    });

    test("Verifica se está retornando o primeiro nome corretamente (entrada com um espaço antes).", () => {
      expect(firstName(" Fulano da Silva")).toBe("Fulano");
    });

    test("Verifica se está retornando o primeiro nome corretamente (entrada com um espaço após).", () => {
      expect(firstName("Fulano da Silva ")).toBe("Fulano");
    });

    test("Verifica que na string de retorno não há o caracter de espaço (entrada com um espaço antes).", () => {
      expect(firstName("Sicrano ")).not.toMatch(/ /);
    });

    test("Verifica que na string de retorno não há o caracter de espaço (entrada com um espaço após).", () => {
      expect(firstName(" Beltrano")).not.toMatch(/ /);
    });
  });

  describe("Dada uma entrada invalida verifica se retorna erro.", () => {
    test("Verifica o retorno da função quando é passado um número", () => {
      expect(() => firstName(123456)).toThrow(TypeError);
    });

    test("Verifica o retorno da função quando é passado um booleano", () => {
      expect(() => firstName(true)).toThrow(TypeError);
    });
  });
});

describe("Testa a função checkStockAvailability", () => {
  test("A função deve retornar true caso um item esteja disponível no estoque", () => {
    expect(checkStockAvailability("smartphone", 15)).toBe(true);
  });

  test("A função deve retornar false caso um item não esteja disponível no estoque", () => {
    expect(checkStockAvailability("headphone", 10)).toBe(false);
  });
});

describe("Testa a função calculateTotalPrice", () => {
  test("Dada uma entrada válida verifica se o resultados da soma dos itens está correta.", () => {
    const prods = [
      { name: "Product 1", price: 10, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
      { name: "Product 3", price: 20, quantity: 1 },
    ];

    expect(calculateTotalPrice(prods)).toBe(70);
  });
});
