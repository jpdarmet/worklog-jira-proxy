module.exports = {
    env: {
        port: "3000"
    },
    jira: {
        host: "issuetracker.sicap.com",
        path: "/jira/rest/api/2/search",
        port: 443,
        certificateLocation: "./certificat/developer.sicap.com.cer"
    },
    credentials: {
        username: "ext_norsys_darmet",
        password: "p0p0lita"
    }

};