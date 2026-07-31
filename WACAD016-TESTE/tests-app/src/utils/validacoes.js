/**
 * Extrai o primeiro nome de uma string de nome completo.
 *
 * @param {string} fullName - O nome completo do usuário, separado por espaços.
 * @returns {string} - O primeiro nome extraído do nome completo ou o próprio nome caso não haja espaços.
 */
function firstName(fullName) {
  fullName = fullName.trim();
  const whitespace = fullName.indexOf(" ");

  if (whitespace === -1) return fullName;
  else return fullName.slice(0, whitespace);
}
/**
 * A função firstName estava falhando devido o método utilizado (lastIndexOf) retornar o índice do último caracter de espaço.
 * O correto seria retornar o primeiro caracter de espaço, por isso o método correto é o indexOf.
 * Também foi aplicado o método trim() na string para remover os espaços antes e após as palavras.
 */

/**
 * Verifica a disponibilidade de um produto em estoque com base no tipo e na quantidade desejada.
 *
 * @param {string} productType - O tipo do produto a ser verificado no estoque.
 * @param {number} quantity - A quantidade desejada do produto a ser verificada.
 * @returns {boolean} - Retorna true se a quantidade desejada do tipo de produto especificado estiver disponível
 *                      no estoque, caso contrário retorna false.
 */
function checkStockAvailability(productType, quantity) {
  const stock = {
    laptop: 10,
    smartphone: 20,
    headphone: 5,
    tablet: 15,
    book: 0,
  };

  const availableStock = stock[productType];
  if (availableStock === undefined) return false;
  if (quantity < 0) return false;
  if (availableStock < quantity) return false;
  else return true;
}
/**
 * A função checkStockAvailability só estava retornando false quando o item estivesse com estoque igual a zero.
 * Com a correção a função retorna false quando o item estiver com o estoque menor que a quantidade passada à função.
 * Também foi necessário adicionar uma comparação com undefined caso seja pesqusado um produto que não existe no estoque.
 * Além disso, foi adicionada uma verificação para retornar false quando a quantidade desejada for negativa,
 * já que uma quantidade negativa não representa uma solicitação válida de estoque.
 */

/**
 * Calcula o preço total de um array de produtos em uma aplicação de e-commerce.
 *
 * @param {Array} products - Um array de objetos de produtos, cada um contendo as propriedades 'price' e 'quantity'.
 * @returns {number} - O preço total obtido multiplicando o preço de cada produto pela sua quantidade
 *                     e somando os preços individuais dos produtos.
 *
 * Exemplo de array de produtos:
 *   [
 *     { name: 'Product 1', price: 10, quantity: 2 },
 *     { name: 'Product 2', price: 15, quantity: 2 },
 *     { name: 'Product 3', price: 20, quantity: 1 }
 *   ]
 */
function calculateTotalPrice(products) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  return total;
}
/**
 * A função calculateTotalPrice não estava acumulando os valores a cada iteração e não estava multiplicando a quantidade de cada produto pelo preço.
 * Assim, retornava apenas o preço do último item iterado.
 * A função foi corrigida multiplicando o preço de cada item pela quantidade e acumulando o resultado na variável total.
 */

module.exports = {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
};
