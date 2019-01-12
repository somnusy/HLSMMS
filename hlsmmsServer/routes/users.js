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
  res.header("Access-Control-Allow-Origin", "http://172.16.4.164:8080"); //允许携带cookie证书的域名
  res.header("Access-Control-Allow-Credentials", true);  //值是一个布尔值，表示是否允许发送Cookie
    next();
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
         res.cookie("userid",result[0].userid)
        res.cookie("username", username);
        res.send({"isOk":true,"msg":"用户登录成功！"});
      } else {
        res.send({"isOk":false,"msg":"用户登录失败！"});
      }
    }
  })
})


//验证cookie是否存在
router.get("/getCookie",(req,res)=>{
  let userid=req.cookies.userid;
  let username=req.cookies.username;
  //如果存在就有cookie就合法
  if(userid && username){
      res.send({"isOk":true});
  }
  else{
      res.send({"isOk":false});
  }
});



//清除cookie的路由
router.get("/loginOut",(req,res)=>{
  res.clearCookie("userid");
  res.clearCookie("username");
  res.send({"isOk":true});
});


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
 router.post("/addgoods", (req, res) => {
  //接收数据
  let {classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details}=req.body;
  //构造sql语句
  let sqlStr="insert into goodsinfo(classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details) values(?,?,?,?,?,?,?,?,?,?,?,?)";
  let sqlParams=[classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details];
  connect.query(sqlStr,sqlParams,(err,result)=>{
      if(err){
          throw err;
      }
      else{
          if(result.affectedRows>0){
              res.json({"isOk":true,"msg":"商品添加成功!"});
          }
          else{
              res.json({"isOk":false,"msg":"商品添加失败!"});
          }
      }
  })
})



//获取商品列表的路由
router.get("/getgoods",(req,res)=>{
  //接收 商品分类和关键词
    let {classname,keywords}=req.query;
    //构造sql语句,查询全部
    let sqlStr="select * from goodsinfo where 1=1"; //where 1=1永远成立，全表查询
  //判断 商品分类和关键词 是否是有效的值，商品分类有值就执行拼接,然后在拼接sql语句
    if(classname){
        sqlStr+=` and classname='${classname}'`; //字符串加引号
    }
    //关键词有值就执行拼接
    if(keywords){
        sqlStr+=` and (goodsname like '%${keywords}%' or barcode like '%${keywords}%')`; //商品名和条码二选一
    }
    //拼接排序的语句
    sqlStr+=" order by goodsid DESC";

    //执行查询获取总的满足条件的记录数
    let total=0;
    connect.query(sqlStr,(err,goodsTotal)=>{
        if(err){
            throw err;
        }
        else{
            total=goodsTotal.length;
        }
    });
    //接收分页参数
    let {pagesize,currentpage}=req.query;
    console.log('pagesize',pagesize,'currentpage',currentpage);

    //拼接分页的sql语句
    if(pagesize && currentpage){
        let skip=(currentpage-1)*pagesize;
        sqlStr+=` limit ${skip},${pagesize}`;
    }

    //执行sql查询,并把结果返回前端
    connect.query(sqlStr,(err,goodsArray)=>{
        if(err){
            throw err;
        }
        else{
            res.send({"total":total,"goodsArray":goodsArray}); //如果没有数据就是空数组，有数据就是数组对象
        }
  });
});


//删除商品列表的路由
router.get("/delgoods",(req,res)=>{
  //接收 商品分类和关键词
    let {id}=req.query;
    //构造sql语句,查询全部
    let sqlStr="delete from goodsinfo where goodsid="+id;
    connect.query(sqlStr,(err,goodsTotal)=>{
        if(err){
            throw err;
        }
        else{
          res.send({"isOk":true,"message":"删除成功"});
        }
    });
});


// 接收前端保存修改商品信息的请求
router.post("/editGoods", (req, res) => {
  //接收修改后的新数据
  let {goodsid,classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details}=req.body;
  //创建sql语句
  let sqlStr="update goodsinfo set classname=?,barcode=?,goodsname=?,saleprice=?,marketprice=?,costprice=?,stocknum=?,weight=?,unit=?,isdiscount=?,ispromotion=?,details=? where goodsid=?";
  let sqlParams=[classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details,goodsid];
  //执行sql语句
  connect.query(sqlStr, sqlParams, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.affectedRows > 0) {
        res.json({ "isOk": true, "msg": "商品修改成功" })
      } else {
        res.json({ "isOk": false, "msg": "商品修改失败" })
      }
    }
  })
})








module.exports = router;
