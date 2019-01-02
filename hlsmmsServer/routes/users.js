var express = require('express');
var router = express.Router();
//引入mysql
const mysql = require('mysql');

//配置数据库连接
const connect = mysql.createConnection({
  host: 'localhost', //数据库主机名
  user: 'root',         //数据库账号
  password: 'password',    //密码
  database: 'hlsmms'      //使用哪个数据库
})
//打开数据库连接
connect.connect((err) => {
  if (err) {
    console.log("× 数据库链接失败！", err.message);
  }
  else {
    console.log("√ 数据库链接成功！");
  }
})


router.all("*", (req, res, next) => {
  // res.header("Access-Control-Allow-Origin","*"); //携带cookie证书时，跨域不能使用通配符*
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); //允许携带cookie证书的域名
  res.header("Access-Control-Allow-Credentials", true);  //值是一个布尔值，表示是否允许发送Cookie
  if (req.body.path) {
    next();
  } else {
    //验证cookie
    if (req.cookies.username) {
      next(); //放行执行下面的路由
    } else {
      res.send("123");
    }
  }
});



//接收前端添加用户的请求
router.post("/useradd", (req, res) => {
  //添加用户的路由中接收数据
  let { username, pass, usergroup } = req.body;
  //查询是否有相同的用户名
  let sqlIsSame = "select * from userinfo where username=?";
  let sqlParmas = [username];
  connect.query(sqlIsSame, sqlParmas, (err, rest) => {
    if (err) {
      throw err;
    } else {
      if (rest.length > 0) {
        res.json({ "code": '1', "msg": "此用户已存在" })
      } else {
        console.log( username, pass, usergroup)
        //在添加用户的路由中构造sql语句和参数数组
        let sqlStr = "insert into userinfo(username,userpwd,usergroup)values(?,?,?)";
        let sqlParmas = [username, pass, usergroup];
        //执行sql语句
        connect.query(sqlStr, sqlParmas, (err, result) => {
          if (err) {
            throw err;
          } else {
            if (result.affectedRows > 0) {
              res.json({ "isOk": true, "msg": "用户添加成功" })
            } else {
              res.json({ "isOk": false, "msg": "用户添加失败" })
            }
          }
        })
      }
    }
  })

})

//删除cookie
router.post("/delcookie", (req, res) => {
  res.clearCookie("username");
  res.send("123");
})


//接收前端用户列表发送的get请求
router.get("/userlist", (req, res) => {
  //构造查询数据库的数据的sql语句
  let sqlStr = "select * from userinfo order by userid desc";
  //执行sql语句
  connect.query(sqlStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result)
    }
  })
})


//接收前端登录页面发送的post请求
router.post("/login", (req, res) => {
  let { pass, username } = req.body;
  //构造查询数据库的数据的sql语句
  let sqlStr = "select * from userinfo where username=? and userpwd=?";
  let sqlParmas = [username, pass];
  console.log(sqlStr);
  //执行sql语句
  connect.query(sqlStr, sqlParmas, (err, result) => {
    if (err) {
      throw err;
    } else {
      //如果查询出有和用户输入的名字和密码相等的这条数据
      if (result.length > 0) {
        //写入cookie
        res.cookie("username", username);
        res.send({"isOk":true,"msg":"用户登录成功！"});
      } else {
        res.send({"isOk":false,"msg":"用户登录失败！"});
      }
    }
  })
})



//接收修改密码页面发送的post请求
router.post("/pwdedit", (req, res) => {
  let { username, pass, newpass, passCheck } = req.body;
  //构造查询数据库的数据的sql语句
  let sqlStr = "select userpwd from userinfo where username=?";
  let sqlParmas = [username];
  //执行sql语句
  connect.query(sqlStr, sqlParmas, (err, result) => {
    if (err) {
      res.send("系统错误")
    } else {
      //定义变量保存查询出来的密码
      let pwd = result[0].userpwd;
      //判断前端用户输入的密码和数据库是否相等
      if (pass != pwd) {
        //不相等
        res.send("原密码错误!");
      } else {
        //相等
        let sqlUpdate = "update userinfo set userpwd =? where username =?";
        let sqlParmas = [newpass, username]
        connect.query(sqlUpdate, sqlParmas, (err, result) => {
          if (err) {
            res.send("系统错误")
          } else {
            res.send("修改成功")
          }
        })
      }
    }
  })
})


//接收前端删除用户信息的get请求
router.get("/deluser", (req, res) => {
  //接收传递过来的id
  let userid = req.query.userid

  //构造删除sql语句
  let sqlStr = "delete from userinfo where userid=" + userid;

  //执行sql语句
  connect.query(sqlStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      //判断数据库是否删除
      if (result.affectedRows > 0) {
        res.json({ "isOk": true,"msg": "删除成功" })
      } else {
        res.json({ "isOk": false,"msg": "删除失败" })
      }
    }
  })
})


//接收前端修改用户信息的请求
router.get("/getusermsg", (req, res) => {
  //接收传递过来的id
  let userid = req.query.userid
  //构造查询sql语句
  let sqlStr = "select * from userinfo where userid=" + userid;
  //执行sql语句
  connect.query(sqlStr, (err, olddata) => {
    if (err) {
      throw err;
    } else {
      res.send(olddata)
    }
  })
})




// 接收前端保存修改用户信息的请求
router.post("/savenewdata", (req, res) => {
  //接收修改后的新数据
  let { userpwd, username, usergroup, userid } = req.body;
  //创建sql语句
  let sqlStr = "update userinfo set userpwd=?,username=?,usergroup=? where userid = ?"
  let sqlParmas = [userpwd, username, usergroup, userid]
  //执行sql语句
  connect.query(sqlStr, sqlParmas, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.affectedRows > 0) {
        res.json({ "isOk": true, "msg": "用户修改成功" })
      } else {
        res.json({ "isOk": true, "msg": "用户修改失败" })
      }
    }
  })
})



//新增类型
router.post("/addClassify", (req, res) => {
  //接收修改后的新数据
  let { addclassify, classifyname, status } = req.body;
  //创建sql语句
  let sqlStr = "insert into classifyManage (name,status,type,parType)values(?,?,?,?)"
  let sqlParmas = [classifyname, status, addclassify + "1", addclassify]
  //执行sql语句
  connect.query(sqlStr, sqlParmas, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.affectedRows > 0) {
        res.json({ "isOk": true, "msg": "新增类型成功" })
      } else {
        res.json({ "isOk": true, "msg": "新增类型失败" })
      }
    }
  })
})





//初始化分类
router.post("/initClassify", (req, res) => {
  //接收修改后的新数据
  let { addclassify, classifyname, status } = req.body;
  //创建sql语句
  let sqlStr = "select * from classifyManage where parType = ''"
  //执行sql语句
  connect.query(sqlStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length > 0) {
        res.json({ "isOk": true, 'data': result })
      } else {
        res.json({ "isOk": true, "msg": "初始化类型失败" })
      }
    }
  })
})




//初始化所有类型
router.post("/initAllClassify", (req, res) => {
  //接收修改后的新数据
  let { addclassify, classifyname, status } = req.body;
  //创建sql语句
  let sqlStr = "select * from classifyManage order by type"
  //执行sql语句
  connect.query(sqlStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      if (result.length > 0) {
        res.json({ "isOk": true,'data': result })
      } else {
        res.json({ "isOk": true, "msg": "初始化类型失败" })
      }
    }
  })
})

//修改类型管理
router.post("/updateClassify", (req, res) => {
  //接收修改后的新数据
  let { id, name, status, type, parType } = req.body;
  //创建sql语句
  let sqlStr = "update classifyManage set name=?,status=? where id=?"
  let sqlParmas = [name, status, id];
  //执行sql语句
  connect.query(sqlStr, sqlParmas, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.affectedRows > 0) {
        res.json({ "isOk": true, "code": 1, "msg": "类型修改成功" })
      } else {
        res.json({ "isOk": false, "code": -1, "msg": "类型修改失败" })
      }
    }
  })
})


//添加商品的请求
//修改类型管理
router.post("/addgoods", (req, res) => {
  //创建sql语句
  let sqlStr = "insert into goodsinfo()value()"
  
  //执行sql语句
  connect.query(sqlStr, sqlParmas, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.affectedRows > 0) {
        res.json({ "isOk": true, "code": 1, "msg": "类型修改成功" })
      } else {
        res.json({ "isOk": false, "code": -1, "msg": "类型修改失败" })
      }
    }
  })
})








module.exports = router;
