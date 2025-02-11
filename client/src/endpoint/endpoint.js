export const endpoints = {

    auth: {
        register: "auth/register",
        login: "auth/login",
        dashboard: "auth/dashboard"
    },

    cms: {
        addblog: "api/postblog",
        allblog: "api/blog",
        allcomment: "api/showcomment",
        addcomment: "api/addcomment",
        recentblog: "api/recentblog",
        authorwiseblog: "api/authorwiseblog",
    },

}

export const myendpoints = [
    endpoints.auth.register, //Index number 0
    endpoints.auth.login, //Index number 1
    endpoints.cms.allblog, //Index number 2
    endpoints.cms.addblog, // Index number 3
    endpoints.cms.allcomment, // Index number 4
    endpoints.cms.addcomment, // Index number 5
    endpoints.cms.recentblog, // Index number 6
    endpoints.cms.authorwiseblog, // Index number 7
]