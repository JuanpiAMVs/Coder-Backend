const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = () => {
    const MONGO_URL = process.env.MONGO_URL
    return{
        mongoUrl: MONGO_URL,
        ttl: 3600,
        mongoOptions: getMongoConfig()
    }
}

module.exports = {
    getMongoConfig,
    getStoreConfig
}