module.exports = {
	//选项
	publicPath:'./',
	outputDir:'dist',
	assetsDir:'./',
	indexPath:'index.html',
	devServer: {
		proxy:{
				'/EzaYun': {
					target:'https://www.zxyyxxzx.com/EzaYun',			//请求的目标地址的BaseURL
					ws:true,
					changeOrigin:true,							//是否开启跨域
					pathRewrite:{
					'^/EzaYun':''									//规定请求地址以什么作为开头
				}
			}
		}
	}
}