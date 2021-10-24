function generateEmail(lowDomain, highDomail){
    return `test_${Math.floor(Math.random() * 1e4) }@${lowDomain}.${highDomail}`
}

module.exports = {
    generateEmail
}
