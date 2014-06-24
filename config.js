module.exports = {
    env: {
        port: "3000"
    },
    jira: {
        host: "issuetracker.sicap.com",
        path: "/jira/rest/api/2/search",
        port: 443,
        certificateLocation: "./certificat/issuetracker.sicap.com.cer"
    },
    credentials: {
        username: "<USER>",
        password: "<PASSWORD>"
    }

};