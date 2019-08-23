 const mongoose = require('mongoose');
 const ObjectId = mongoose.Types.ObjectId;
 const  userPosts =  require('./../models/post_schema.js');

 
 const PostController={
   // READ OPERATION
    getlist: async function(req,res){
      const search_text= req.query.search_text
      const regex = new RegExp(search_text,'i');
    
      const pageNo = req.query.pageNo ? parseInt(req.query.pageNo) :1
      const size_fixed = 20   
     const query = {}
     
      query.skip = size_fixed * (pageNo - 1)
      query.limit = size_fixed
         
        
       mongoose.connection.collection('posts').find({$or : [{body : regex},{title : regex}]},query).toArray(function(err,data) {
       // Mongo command to fetch all data from collection.
           if(err) {
                return res.json({message:'false', error : err })
            } 
            response = {"error" : false,"message" : data}; 
         res.json(response);
        });
          
    },

       //CREATE OPERATION
      postlist: async function(req,res){
       const  postData= new userPosts ({
           userId: ObjectId(req.currentUser._id),
           title: req.body.title,
           body:  req.body.body
        });
        if(!req.body.title && !req.body.body){
           return res.json({error:'title and body is require first'});
          }
        else{
        const postResult = await mongoose.connection.collection('posts').insertOne(postData);
        return res.json({ success: true, data: postResult.ops });
        }

      },
     
       //UPDATE OPERATION
      updatelist: async function(req,res){
    
        try{
          
            if(!req.body.title && !req.body.body)
            {
              res.json({Error:'title and body is required'});
            }
              const updateFind = {userId: ObjectId(req.currentUser._id)};                                                              
              const updateObject = {                                
              $set: {                                
                  title: req.body.title,                                
                  body: req.body.body                                
                   }                                
                 }                                 
           const updateddata= await mongoose.connection.collection('posts').updateOne(updateFind, updateObject);
        
           return res.json({ success: true, data: updateddata.ops});
       }
        catch(error) {
           console.log('PostController -> updatelist', error);
           res.json({ success: false, error: error.message });
          }

        },

        //DELETE OPERATION 
    
     deletelist:   function(req,res){
             if(!req.body.userId && req.body.userId === null){
                  return res.json({success : false , error : 'please provide userId first'});
              } 
              else{
                const inputKey = ObjectId(req.body.userId);
                
                 mongoose.connection.collection('users').findOne({_id : inputKey},function(err , data){
                 if(err){
                     return res.json({success: false, error:err})
                 }  
              if(data){
                const deleteFind =  mongoose.connection.collection('users').findOne({_id : inputKey});               
                const deleteddata = mongoose.connection.collection('posts').deleteOne(deleteFind);
                    res.json({ success: true, data: deleteddata.ops});
                }
                if(res.status===200){
                 
                  mongoose.connection.collection.remove('comments');
                res.send(res.status);
                  res.json({success:true, message:'All the comments related to post are deleted'});
                }
              // if(deleteddata && deleteddata !==null){
              //   const commentController = require('./../controllers/comment.controller');
              //   commentController.delete.mongoose.connection.collection('comments').deleteMany(deleteFind);
              // }  
          });
        }
    },

 }
    module.exports= PostController;
   
   
