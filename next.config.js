module.exports = {	
	webpack: (config, options) => {
	    config.module.rules.push({
	      test: /\.(png|jpe?g|gif)$/i,
	      use: [
	        options.defaultLoaders.babel,
	        {
	          loader: 'file-loader',
	          options: {
	          	publicPath: '/',
	          	name: '[folder]/[name].[ext]',
	          },
	        },
	      ],
	    });
	    return config;
	}	
}