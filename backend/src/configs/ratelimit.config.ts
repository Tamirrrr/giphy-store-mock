const config = {
    auth: {
        login: {
            limit: 10, // 10 attempts
            ttl: 60 * 10, // 10 minutes
            method: 'auth_login',
        },
    }
}

export default config;