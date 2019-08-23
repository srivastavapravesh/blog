const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const  userComments =  require('./../models/comment_schema.js');


const commentController={

     //CREATE OPERATION
     create:  function(req,res){
      const inputKey = ObjectId(req.body.postId);

      const commentData = new userComments({
         postId: req.body.postId,
         userId: req.currentUser._id, 
          comment : req.body.comment,
          createdAt : new Date(),
          updated : new Date(),
      });
     
   //  console.log('commentData',commentData);
      if(req.body.postId && req.body.postId !== null){
          mongoose.connection.collection('posts').findOne({_id : inputKey},function(err , data){

              if(err){
                  return res.json({success : false , error : err});
              } 
              
              if(data !== null){
                
                mongoose.connection.collection('comments').insertOne(commentData);
                  return res.json({success : true , data : commentData});
              } 
              return res.json({success : false , message : "PostId is incorrect"});
          });
      }
    },
      // READ OPERATION 
     read: async function(req,res){
             try{
            const  listofcomments = await mongoose.connection.collection('comments').find({}).toArray();
          
            return res.json({ success: true, data: listofcomments});
          }
          catch(error)
          {
            console.log('commentController -> read', error);
            res.json({ success: false, error: error.message });  
          }
        },

        //UPDATE OPERATION 

        update: async function(req,res){
            try{
              if(!req.body.comment)
              {
                res.json({Error:'comment is required'});
              }
              const updateFind = {userId: ObjectId(req.currentUser._id)};                                                              
              const updateObject = {                                
              $set: {                                
                  comment: req.body.comment,                                                               
                   }                                
                 }                                 
           const updateddata= await mongoose.connection.collection('comments').updateOne(updateFind, updateObject);
        
           return res.json({ success: true, data: updateddata.ops});
       }
          
        catch(error){
            console.log('commentController -> update', error);
            res.json({ success: false, error: error.message }); 
            }
        },

        //DELETE OPERATION

        delete: async function(req,res){
          const inputKey = req.body.postId;
         
          console.log('deleteFind',deleteFind);
          if(req.body.postId && req.body.postId !== null){
            mongoose.connection.collection('posts').findOne({_id : inputKey},function(err , data){
                if(err){
                    return res.json({success : false , error : err});
                } 
                if(data !== null){
                  const deleteFind = mongoose.connection.collection('posts').findOne({_id : inputKey});
                  const deleteddata=  mongoose.connection.collection('comments').deleteOne(deleteFind);
                        return res.json({ success: true, data: deleteddata.ops});
                  
                 
                }
            });
        }
      },
        
      }
    module.exports= commentController;