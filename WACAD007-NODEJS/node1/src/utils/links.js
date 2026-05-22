function createLink(filename) {
  return `<a href="/${filename}">${filename}</a><br>\n`;
}

function createBackLink() {
  return `<a href="/">Voltar</a><br>\n`;
}

module.exports = {
  createLink,
  createBackLink,
};
