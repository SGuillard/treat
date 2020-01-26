const API = {
    API_URL: 'http://localhost/api',
    LOGIN: '/login',
    REGISTRATION: '/register',
    TEAM_ALL: '/team/getAll',
    TEAM_CREATE: (id: number) => `team/${id}/create`,
};

export default API;
