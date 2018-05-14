const isRunnableStep = s => {
  // 'wait' etc
  if (typeof s === 'string') {
    return false
  }
  if (s.wait !== undefined || s.trigger !== undefined || s.block !== undefined) {
    return false
  }
  return true
}

module.exports = isRunnableStep
