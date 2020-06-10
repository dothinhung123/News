const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const connection = require('../config/Connection')
// parse requests of content-type - application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
const selectAllCategory = "select * from category";
selectCategoryById = "select * from category where id = ?"
const selectAllNewInCategory ="select category.id , category.category_name , news.title, news.short_intro,news.date_created, news.author_name from category inner join news on category.id = news.category_id where category.id = ?;";
router.use(bodyParser.json())
router.get('/',(req,res)=> connection.connect(function(){
    connection.query(selectAllCategory,function(err,result,fields){
        if (err) throw err;
    
     
    
      const data = JSON.parse(JSON.stringify(result))

      data.forEach(element=>element.links = `/category/${element.id}`);
  
      const value = {
        data:data,
        limit:10,
        pagination: {
          first_page: "/category?page=1",
          last_page: "/category?page=1",
          comment:1
         }
         

      }

        
        res.status(200).json(value);
        return;
    })
}))
router.get('/:id',(req,res)=>connection.connect(function(){
  const id = req.params.id ;
  connection.query(selectCategoryById,[id],function(err,result,fields){
    if(err) throw err;
    const data = JSON.parse(JSON.stringify(result))
    res.status(200).json(data);
    return;

  })
}))
router.get('/:id/news',(req,res)=>connection.connect(function(){
    const id = req.params.id;
    connection.query(selectAllNewInCategory,[id],function(err,result,fields){
        if (err) throw err;
    
     
    
        const data = JSON.parse(JSON.stringify(result))
  
        data.forEach(element=>element.links = `/news/${element.id}`);
    
        const value = {
          data:data}
  
          
          res.status(200).json(value);
        return;
    })
}))
module.exports = router;