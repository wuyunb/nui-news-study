'use strict';
// 创建数据库应用
const db = uniCloud.database()

// 声明聚合操作符合
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		name,
		user_id,
		page = 1,
		pageSize = 5,
	} 
	= event
	// 聚合：更极细化去处理数据 求和，分组，指定字段
	
	let matchObject = {}
	if (name !== '全部'){
		matchObject={
			classify:name
		}
	}
	
	//获取用户表
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	console.log(21312,$._id,$.in(['$_id',article_likes_ids]))
	// 获取数据表
	const list = await db.collection('article')
	.aggregate()
	// 最加一个字段
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])  // $.in([1,2]) 判断当前数组里是否包含里某个字段  1、数组是否包含某个值 2、目标数组
		
	})
	.match(matchObject)
	.project({
		content:false
	})
	// 要跳过多少数据
	.skip(pageSize * (page - 1))
	// 输出多少条数据
	.limit(pageSize)
	.end()
	// field 返回指定的内容
  // const list = await db.collection('article').field({
	 //  content:false
  // }).get() 
  return {
	  code:200,
	  msg:'数据请求成功',
	  data:list.data
	  
	  
  }
};
