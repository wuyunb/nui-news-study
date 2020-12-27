'use strict';
const db = uniCloud.database()

// 数据库操作符，对数组，字符串 ，数字……操作
const dbCmd = db.command

exports.main = async (event, context) => {
  const {user_id,article_id} = event
  const userinfo = await db.collection('user').doc(user_id).get()
  const article_likes_ids = userinfo.data[0].article_likes_ids
  
  let dbCmdFuns = null
  if (article_likes_ids.includes(article_id)) {   //includes() 判断数组里是否有该项内容
	  dbCmdFuns=dbCmd.pull(article_id)
  } else {
	   dbCmdFuns=dbCmd.addToSet(article_id)
  }
  // // 更新
  await db.collection('user').doc(user_id).update({
	  article_likes_ids:dbCmdFuns   //addToSet() 给数组里追加内容 pull()  删除自定内容
  })
  
  //返回数据给客户端
  return {
	  code:200,
	  msg:'请求成功',
	  data:userinfo
	  
  }
};
