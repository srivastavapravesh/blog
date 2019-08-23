const mongoose = require('mongoose');
const UserController = {
    getList: async function(req, res) {
        try {
            const admin= req.body.admin;
            const password= req.body.password;
            if(!admin && !password){
              return  res.json({message:'please provide admin credentials'});
            }
            if(admin!=='gomedii' && password!=='gomedii@123'){
             return    res.json({message:'please provide correct admin credentials'});
            }
            let  userList = await mongoose.connection.collection('users').find({}).toArray();
            console.log('userList', userList);
            userList = userList.map((_item) => {
                return {
                    firstName: _item.firstName,
                    lastName :_item.lastName,
                };
            });
            return res.json({ success: true, data: userList });
        
        }
       catch(error) {
            console.log('UserController -> getList', error);
            res.json({ success: false, error: error.message });
        }         
    },
};
module.exports = UserController;
