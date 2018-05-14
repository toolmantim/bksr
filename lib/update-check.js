const pkg = require('../package')
const checkForUpdate = require('update-check')

module.exports = async () => {
  const update = await checkForUpdate(pkg)

  if (update) {
    console.log(`The latest version is ${update.latest}. Please update:\nnpm install -g bksr`)
  }
}
