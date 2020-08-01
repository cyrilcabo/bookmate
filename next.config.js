module.exports = {	
	webpack: (config, options) => {
	    config.module.rules.push(...[
		    {
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
		      ]
	     	},
	     	{
	     		test: /\.svg$/,
			  	use: [
			    	options.defaultLoaders.babel,
			    	{
			      		loader: "react-svg-loader",
			      		options: {
			        		jsx: true 
			      		}
			    	}
			  	]
	     	}
	    ]);
	    return config;
	}	
}