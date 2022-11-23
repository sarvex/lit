/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, {isServer, nextRuntime, webpack}) => {
    // console.log(config.module.rules[2].oneOf);
    // console.log('isServer', isServer);
    // console.log('nextRuntime', nextRuntime);
    // console.log(config.entry().then(console.log));
    // if (isServer) {
    //   config.module.rules.unshift({
    //     test: /next-dev\.js|next\.js|_app/,
    //     exclude: /ssr-react/,
    //     loader: 'imports-loader',
    //     options: {
    //       imports: [
    //         'side-effects @lit-labs/ssr/lib/install-global-dom-shim.js',
    //       ],
    //     },
    //   });
    // }
    config.module.rules.unshift({
      test: /_app/,
      // exclude: /ssr-react/,
      loader: 'imports-loader',
      options: {
        imports: ['side-effects @lit-labs/ssr-react'],
      },
    });

    // if (isServer && nextRuntime === 'nodejs') {
    //   // console.log(config.externals[0].toString());
    //   const nextHandleExternals = config.externals[0];
    //   config.externals = [
    //     ({context, request, dependencyType, getResolve}) => {
    //       // console.log('request', request);
    //       if (
    //         request === 'react/jsx-dev-runtime' ||
    //         request === 'react/jsx-runtime'
    //       ) {
    //         // eslint-disable-next-line no-undef
    //         return Promise.resolve();
    //       }
    //       return nextHandleExternals({
    //         context,
    //         request,
    //         dependencyType,
    //         getResolve,
    //       });
    //     },
    //   ];
    // }

    // config.plugins.push(
    //   new webpack.NormalModuleReplacementPlugin(/react/, function (resource) {
    //     // console.log('resource', resource);
    //     if (
    //       resource.request === 'react/jsx-runtime' &&
    //       !/labs\/ssr-react/.test(resource.context)
    //     ) {
    //       resource.request = '@lit-labs/ssr-react/jsx-runtime';
    //     }
    //     if (
    //       resource.request === 'react/jsx-dev-runtime' &&
    //       !/labs\/ssr-react/.test(resource.context)
    //     ) {
    //       // console.log('resource', resource);
    //       resource.request = '@lit-labs/ssr-react/jsx-dev-runtime';
    //     }
    //   })
    // );

    return config;
  },
};

module.exports = nextConfig;
