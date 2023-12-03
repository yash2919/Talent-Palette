const Post = require('../models/postModel');
const User =require('../models/userModel')
const bcrypt = require('bcrypt');
async function createPost(email, postName,postimgUrl) {
   // const user = await User.findOne({ email });
    if(!postName){
        throw new Error('PostName is empty');
    }
    else{
        const post = new Post({
            postName,
            email,
            postimgUrl
          });
          await post.save();
          return post;
    }
}
async function getallposts(email, postName,postimgUrl) {
    const posts = await Post.find({}, "postName email postimgUrl");
    return posts;
 }



module.exports = { createPost ,getallposts};


