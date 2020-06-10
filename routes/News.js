const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router()
const connection = require('../config/Connection')
// parse requests of content-type - application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
const getEachCommentofNews="select * from comment where id =? and news_id =?;"
const addComment ="INSERT INTO `iws`.`comment` ( `comment`, `username`, `news_id`) VALUES (?,?,?) ;"
const deleteComment = "delete from comment where id =? and news_id=?";
const selectAllTags = "select tag.tag_name from tag inner join tag_has_news on tag.id = tag_has_news.tag_id where tag_has_news.news_id = ?;"
const selectAllCommentsOfNews = "select comment.id ,comment.comment,comment.username,comment.date_created from comment  where comment.news_id=?;"
const selectAllNews = "select news.id , news.title, news.content,news.short_intro, category.category_name,news.author_name,news.date_created from news inner join category on category.id = news.category_id ;"
const selectNewsById = "select news.id , news.title, news.content, news.date_created, category.category_name,news.author_name from news inner join category on category.id = news.category_id where news.id = ?;"

router.use(bodyParser.json())

router.get('/',(req,res)=>connection.connect(function() {
    connection.query(selectAllNews, function (err, result, fields) {
        if (err) throw err;
    
     
    
      const data = JSON.parse(JSON.stringify(result))

      data.forEach(element=>element.links = `/news/${element.id}`);
  
      const value = {
        data:data,
        limit:10,
        pagination: {
          first_page: "/news?page=1",
          last_page: "/news?page=1",
          comment:1
         }
         

      }

        
        res.status(200).json(value);
        return ;

    })
}) )
router.get('/:id',(req,res)=>connection.connect(function(){
    const id = req.params.id;
    connection.query(selectNewsById,[id],function(err,result,fields){
        if (err) throw err;
    
     
    
        const data = JSON.parse(JSON.stringify(result))
  
        data.forEach(element=>element.links = `/news/${element.id}`);
    
    
          
          res.status(200).json(data);
        return;
    })
}))
router.get('/:id/comments',(req,res)=>connection.connect(function(){
    const id = req.params.id;
    connection.query(selectAllCommentsOfNews,[id],function(err,result,fields){
        if (err) throw err;
    
     
    
        const data = JSON.parse(JSON.stringify(result))
  
        data.forEach(element=>element.links = `/news/${element.id}/comments`);
    
        const value = {
          data:data
        }
  
          
          res.status(200).json(value);
        return;
    })
}))
router.get('/:news_id/comments/:comment_id',(req,res)=>connection.connect(function(){
  const news_id = req.params.news_id;
    const comment_id =req.params.comment_id;
  connection.query(getEachCommentofNews,[comment_id,news_id],function(err,result,fields){
    if(err) throw err;
    const data = JSON.parse(JSON.stringify(result))
    res.status(200).send(data)
    return;

  })
}))
router.delete('/:news_id/comments/:comment_id',(req,res)=>connection.connect(function(){
    const news_id = req.params.news_id;
    const comment_id =req.params.comment_id;
    connection.query(deleteComment,[comment_id,news_id],function(err,result,fields){
        if(err) throw err;
        const data ={
          sucess:"True",
          delete_id : comment_id
        }
        res.status(200).send(data)
        return;
    })
}))
router.post('/:id/comments',(req,res)=>connection.connect(function(){
    const news_id = req.params.id;
    const username = req.body.username;
    const comment = req.body.comment;


    connection.query(addComment,[comment,username,news_id],function(err,result,fields){
        if(err) throw err;
        res.status(201).redirect(`/news/${news_id}/comments/${result.insertId}`)


        return;
    })
}))
router.get('/:news_id/tags',(req,res)=>connection.connect(function(){
    const news_id =req.params.news_id;
    connection.query(selectAllTags,[news_id],function(err,result,fields){
        if(err) throw err;
        const data = JSON.parse(JSON.stringify(result))


          
          res.status(200).json(data);
        return;
    })
}))

module.exports = router;