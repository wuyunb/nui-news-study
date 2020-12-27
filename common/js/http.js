export default function http (options){
	const {fname,data} = options
	const dataObj = {
		user_id:'5ef5a3013e9426004de617dc',
		...data
	}
	return new Promise ((reslove,reject)=>{
		uniCloud.callFunction({
			name:fname,
			data:dataObj
		}).then((res)=>{
			if (res.result.code == 200) {
				reslove(res.result)
			} else {
				reject(res.result)
			}
			
		}).catch((err)=>{
			reject(err.result)
		})
	})
}