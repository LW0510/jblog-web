//模拟评论数据
const comment = {
    status: "成功",
    code: 200,
    data: [
      {
        id: 'comment0001', //主键id
        date: '2020-05-14 08:30',  //评论时间
        ownerId: 'talents100020', //文章的id
        fromId: 'errhefe232213',  //评论者id
        fromName: '一点点梵',   //评论者昵称
        fromAvatar: 'http://localhost:8080/profile/avatar/girl.png', //评论者头像
        likeNum: 3, //点赞人数
        content: '我们的孤独就像天空中漂浮的城市，仿佛是一个秘密，却无从述说。——《天空之城》',  //评论内容
        reply: [  //回复，或子评论
          {
            id: '34523244545',  //主键id
            commentId: 'comment0001',  //父评论id，即父亲的id
            fromId: 'observer223432',  //评论者id
            fromName: 'Shadow',  //评论者昵称
            fromAvatar: 'http://localhost:8080/profile/avatar/boy.png', //评论者头像
            toId: 'errhefe232213',  //被评论者id
            toName: '一点点梵',  //被评论者昵称
            toAvatar: 'http://localhost:8080/profile/avatar/girl.png',  //被评论者头像
            content: '^-^',  //评论内容
            date: '2020-05-15 08:35'   //评论时间
          },
          {
            id: '34523244545',
            commentId: 'comment0001',
            fromId: 'observer567422',
            fromName: '清晨一缕阳光',
            fromAvatar: 'http://localhost:8080/profile/avatar/avatar.png',
            toId: 'observer223432',
            toName: '彭于晏',
            toAvatar: 'http://localhost:8080/profile/avatar/girl.png',
            content: '踩一个脚印哈哈！',
            date: '2020-05-15 10:35'
          }
        ]
      },
      {
        id: 'comment0002',
        date: '2020-05-15 12:35',
        ownerId: 'talents100020',
        fromId: 'errhefe232213',
        fromName: 'Shadow',
        fromAvatar: 'http://localhost:8080/profile/avatar/boy.png',
        likeNum: 0,
        content: '我到现在都想不起自己的名字。可是真是不可思议，我居然还记得你的名字。',
        reply: []
      }
    ]
  };
  
  export {comment}
  