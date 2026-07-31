const {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
} = require("./validacoes");

describe("Testa a função firstName", () => {
  describe("Deve retornar o primeiro nome com uma entrada válida.", () => {
    test("Deve retornar o primeiro nome corretamente quando a entrada está sem espaços antes e depois.", () => {
      expect(firstName("Fulano da Silva")).toBe("Fulano");
    });

    test("Deve retornar o primeiro nome quando a entrada tem apenas uma palavra.", () => {
      expect(firstName("Fulano")).toBe("Fulano");
    });

    test("Deve retornar o primeiro nome quando há múltiplos espaços entre as palavras.", () => {
      expect(firstName("Fulano   da Silva")).toBe("Fulano");
    });

    test("Deve retornar string vazia quando a entrada contém apenas espaços.", () => {
      expect(firstName("   ")).toBe("");
    });

    test("Deve retornar o primeiro nome quando a entrada tem um espaço antes.", () => {
      expect(firstName(" Fulano da Silva")).toBe("Fulano");
    });

    test("Deve retornar o primeiro nome quando a entrada tem um espaço depois.", () => {
      expect(firstName("Fulano da Silva ")).toBe("Fulano");
    });

    test("Deve retornar o primeiro nome sem espaços quando a entrada tem um espaço depois.", () => {
      expect(firstName("Sicrano ")).not.toMatch(/ /);
    });

    test("Deve retornar o primeiro nome (entrada com um espaço antes).", () => {
      expect(firstName(" Beltrano")).not.toMatch(/ /);
    });

    test("Deve retornar string vazia quando a entrada for uma string vazia.", () => {
      expect(firstName("")).toBe("");
    });
  });

  describe("Deve retornar erro com uma entrada invalida.", () => {
    test("Deve retornar erro quando é passado um número", () => {
      expect(() => firstName(123456)).toThrow(TypeError);
    });

    test("Deve retornar erro quando é passado um booleano", () => {
      expect(() => firstName(true)).toThrow(TypeError);
    });

    test("Deve retornar erro quando é passado null", () => {
      expect(() => firstName(null)).toThrow(TypeError);
    });

    test("Deve retornar erro quando é passado undefined", () => {
      expect(() => firstName(undefined)).toThrow(TypeError);
    });
  });
});

describe("Testa a função checkStockAvailability", () => {
  test("Deve retornar true caso um item esteja disponível no estoque", () => {
    expect(checkStockAvailability("smartphone", 15)).toBe(true);
  });

  test("Deve retornar false caso um item não esteja disponível no estoque", () => {
    expect(checkStockAvailability("headphone", 10)).toBe(false);
  });

  test("Deve retornar true quando a quantidade desejada for zero.", () => {
    expect(checkStockAvailability("book", 0)).toBe(true);
  });

  test("Deve retornar true quando a quantidade desejada for exatamente igual ao estoque", () => {
    expect(checkStockAvailability("laptop", 10)).toBe(true);
  });

  test("Deve retornar false quando o produto não existir no estoque", () => {
    expect(checkStockAvailability("mouse", 1)).toBe(false);
  });

  test("Deve retornar false quando o produto tiver estoque zerado e for solicitada ao menos uma unidade", () => {
    expect(checkStockAvailability("book", 1)).toBe(false);
  });

  test("Deve retornar false quando o nome do produto não corresponder por diferença de maiúsculas/minúsculas", () => {
    expect(checkStockAvailability("Laptop", 5)).toBe(false);
  });

  test("Deve retornar false quando a quantidade desejada for uma fração maior que o estoque disponível", () => {
    expect(checkStockAvailability("laptop", 10.5)).toBe(false);
  });

  test("Deve retornar false quando a quantidade desejada for negativa", () => {
    expect(checkStockAvailability("laptop", -5)).toBe(false);
  });
});

describe("Testa a função calculateTotalPrice", () => {
  test("Deve retornar a soma correta com uma entrada válida.", () => {
    const prods = [
      { name: "Product 1", price: 10, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
      { name: "Product 3", price: 20, quantity: 1 },
    ];

    expect(calculateTotalPrice(prods)).toBe(70);
  });

  test("Deve retornar zero quando o array de produtos estiver vazio.", () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  test("Deve calcular corretamente com um único produto.", () => {
    expect(
      calculateTotalPrice([{ name: "Product 1", price: 12, quantity: 3 }]),
    ).toBe(36);
  });

  test("Deve retornar zero quando o produto tiver quantidade zero.", () => {
    expect(
      calculateTotalPrice([{ name: "Product 1", price: 12, quantity: 0 }]),
    ).toBe(0);
  });

  test("Deve calcular corretamente com preços decimais.", () => {
    const prods = [
      { name: "Product 1", price: 9.99, quantity: 3 },
      { name: "Product 2", price: 4.5, quantity: 2 },
    ];

    expect(calculateTotalPrice(prods)).toBeCloseTo(38.97);
  });
});
