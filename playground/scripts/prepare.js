const { collectParameters } = require('./collect-parameters');
const { compile } = require('./compile');
const { serve } = require('./serve');

const prepare = async () => {
  const parameters = await collectParameters();

  await compile(parameters);

  parameters.serve && serve();
};

if (require.main === module) {
  prepare().catch((error) => console.log(error));
}
