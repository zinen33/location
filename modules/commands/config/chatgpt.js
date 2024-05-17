const NodeCache = require('node-cache')

const config = {
    openaikey: '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',
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    ratelimit: new Map(),
    commands: new Map(),
    aliases: new Map()
}

module.exports = config