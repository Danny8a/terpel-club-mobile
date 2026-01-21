export const TERPEL = {
  baseUrl: 'https://api-qa.terpel.com',
  appPath: '/appterpel-pruebatecnica-temp',
  token: {
    path: '/oauth/accesstoken',
    grantType: 'client_credentials',
    clientId: 'TMoiuMvvKoUHdJnVNlqmQdMwafQthxb3siXTH4IBiJgUqOgL',
    clientSecret: '1cUrtYGgKUpSfQ6j5AxLhn2Q1ochoWxYph4LGqRxCVksZRY5NZvZE71n8K6rCPmd',
  },
  customer: {
    tip: 'CC' as const,
    docEncoded: 'HfEmh0dDdtpw9yKetdnZ7Q%3D%3D',
  },
  catalog: {
    path: '/catalogo/catalogoDatalake/v1.0/catalogoproductos',
    username: 'TestTerpel',
    password: 'PruebaTecnica.25*',
  },
};
