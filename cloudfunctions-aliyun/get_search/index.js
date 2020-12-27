'use strict';
// 创建数据库应用
const db = uniCloud.database()

// 声明聚合操作符合
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		value,
		user_id,
	} 
	= event
	//获取用户表
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	
	// 获取数据表
	const list = await db.collection('article')
	.aggregate()
	// 最加一个字段
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])  // $.in([1,2]) 判断当前数组里是否包含里某个字段  1、数组是否包含某个值 2、目标数组
		
	})
	.project({
		content:false
	})
	.match({
		title:new RegExp(value)
	})
	
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
