'use strict';
// 创建数据库应用
const db = uniCloud.database()
const $ = db.command.aggregate  // 获取聚合操作符合
exports.main = async (event, context) => {
	const {user_id,type} = event
	let matchObj = {}
	if (type !== "all") {
		matchObj = {
			current:true
		}
	}
 // 获取用户表
	let userinfor = await db.collection('user').doc(user_id).get()
	userinfor = userinfor.data[0]
	// 获取label 表
	const label = await db.collection('label')
	.aggregate()
	.addFields({
	 current:$.in(['$_id',$.ifNull([userinfor.label_ids,[]])])
 })
 .match(matchObj)
 .end()

 console.log(userinfor)
  //返回数据给客户端
  return {
	  code:200,
	  msg:'请求成功',
	  data:label.data
  }
};

