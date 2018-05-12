const branchMatches = (branch, pattern) => {
  if (branch === pattern) {
    return true
  } else if (pattern.indexOf('*') !== -1) {
    const starOnEndMatch = pattern.match(/(.*)\*$/)
    const starOnStartMatch = pattern.match(/^\*(.*)/)

    if (starOnEndMatch) {
      return branch.startsWith(starOnEndMatch[1])
    } else if (starOnStartMatch) {
      return branch.endsWith(starOnStartMatch[1])
    } else {
      return false
    }
  }
}

const stepMatchesBranchFilter = (step, branch) => {
  if (!step.branches) {
    return false
  }

  const branches = step.branches.split(' ')

  return branches.findIndex(pattern => branchMatches(branch, pattern)) !== -1
}

module.exports = stepMatchesBranchFilter
