const Post = require('../models/postModel');
const User =require('../models/userModel')
const bcrypt = require('bcrypt');
async function createPost(email, postName,postimgUrl,postType) {
   // const user = await User.findOne({ email });
    if(!postName){
        throw new Error('PostName is empty');
    }
    else{
        const post = new Post({
            postName,
            email,
            postimgUrl,
            postType
          });
          await post.save();
          return post;
    }
}
async function getallposts(email, postName,postimgUrl,postType) {
    const posts = await Post.find({}, "postName email postimgUrl postType");
    return posts;
 }



module.exports = { createPost ,getallposts};


