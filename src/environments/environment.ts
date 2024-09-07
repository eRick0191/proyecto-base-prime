export const environment = {

    production: true,

    api :  {
      baseUrl : '/v1/api',
      authTokenName: '__token__',
      storageUrl : '/storage'
    },
    local: {
      baseUrl: 'http://localhost:3000/api',
    },
    repository: {
      baseUrl: '/s3/',
    },
    defaultLandingUrl:"/app",
    isDemo: false
};
