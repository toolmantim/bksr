const pkg = require('../package')
const checkForUpdate = require('update-check')

const updateCommand = () => {
  if (pkg.installationMethod === 'homebrew') {
    return 'brew upgrade bksr'
  } else {
    return 'npm install -g bksr'
  }
}

module.exports = async () => {
  const update = await checkForUpdate(pkg)

  if (update) {
    console.log(`The latest version of bksr is ${update.latest} (you’re running ${pkg.version}). Please update:\n${updateCommand()}`)
  }
}
