const { collectParameters } = require('./collect-parameters');
const { compile } = require('./compile');

const prepare = async () => {
  const parameters = await collectParameters();

  await compile(parameters);
};

module.exports = {
  prepare,
};

if (require.main === module) {
  prepare().catch((error) => console.log(error));
}
