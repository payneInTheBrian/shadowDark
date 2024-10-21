const mongoose = require('mongoose')
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const { userIdOrName } = req.params;
      const isObjectId = mongoose.Types.ObjectId.isValid(userIdOrName);
      const user = await User.findOne(isObjectId ? { _id: userIdOrName } : { userName: userIdOrName}).populate({
        path: "following",
        populate: { path: 'receiver' }
      }).populate({
        path: "followers",
        populate: { path: 'sender' }
      });
      if (!user) return res.json({ user: null, posts: [] })

      const posts = await Post.find({ user: user.id, deletedAt: { $exists: false } }).populate('likes').lean();
      res.json({ user: user.toObject(), posts });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    const { type } = req.params;
    try {
      const filter = { deletedAt: { $exists: false } }
      if (type === 'following') {
        filter.user = { $in: req.user.following.map(follow => follow.receiver._id) }
      }
      const posts = await Post.find(filter).sort({ createdAt: "desc" }).populate('likes').lean();
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        match: { deletedAt: { $exists: false } },
        populate: { path: 'user' }
      })
      if (post.deletedAt) return res.status(404).end();

      const comments = post.toObject().comments
      res.json({ post: post.toObject() || null, comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      
      
       
      
        let result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "auto",
          
        })
        let post = await Post.create({
          name: req.body.name,
          ancestry: req.body.ancestry,
          str: req.body.str,
          int: req.body.int,
          class: req.body.class,
          level: req.body.level,
          xp: req.body.xp,
          maxXp: req.body.maxXp,
          dex: req.body.dex,
          wis: req.body.wis,
          title: req.body.title,
          alignment: req.body.alignment,
          con: req.body.con,
          cha: req.body.cha,
          background: req.body.background,
          deity: req.body.deity,
          hp: req.body.hp,
          maxHp: req.body.maxHp,
          ac: req.body.ac,
          attack1: req.body.attack1,
          attack2: req.body.attack2,
          attack3: req.body.attack3,
          attack4: req.body.attack4,
          talent1: req.body.talent1,
          talent2: req.body.talent2,
          talent3: req.body.talent3,
          talent4: req.body.talent4,
          talent5: req.body.talent5,
          talent6: req.body.talent6,
          talent7: req.body.talent7,
          talent8: req.body.talent8,
          spell1: req.body.spell1,
          spell2: req.body.spell2,
          spell3: req.body.spell3,
          spell4: req.body.spell4,
          spell5: req.body.spell5,
          spell6: req.body.spell5,
          spell7: req.body.spell7,
          spell8: req.body.spell8,
          spell9: req.body.spell9,
          spell10: req.body.spell10,
          spell11: req.body.spell11,
          spell12: req.body.spell12,
          spell13: req.body.spell13,
          spell14: req.body.spell14,
          spell15: req.body.spell15,
          spell16: req.body.spell16,
          gear1: req.body.gear1,
          gear2: req.body.gear2,
          gear3: req.body.gear3,
          gear4: req.body.gear4,
          gear5: req.body.gear5,
          gear6: req.body.gear6,
          gear7: req.body.gear7,
          gear8: req.body.gear8,
          gear9: req.body.gear9,
          gear10: req.body.gear10,
          gear11: req.body.gear11,
          gear12: req.body.gear12,
          gear13: req.body.gear13,
          gear14: req.body.gear14,
          gear15: req.body.gear15,
          gear16: req.body.gear16,
          gear17: req.body.gear17,
          gear18: req.body.gear18,
          gear19: req.body.gear19,
          gear20: req.body.gear20,
          gp: req.body.gp,
          sp: req.body.sp,
          cp: req.body.cp,
          media: result.secure_url,
          cloudinaryId: result.public_id,
          user: req.user.id,
        })
       
      
      console.log("Post has been added!");
      res.json({ post });
      
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
    
  },
  likePost: async (req, res) => {
    try {
      const obj = { user: req.user.id, post: req.params.id };
      if ((await Like.deleteOne(obj)).deletedCount) {
        console.log("Likes -1");
        return res.json(-1)
      }
      await Like.create(obj);
      console.log("Likes +1");
      res.json(1)
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id }).populate('likes').populate({
        path: 'comments',
        match: { deletedAt: { $exists: false } }
      });

      if (process.env.SOFT_DELETES === 'true') {
        post.deletedAt = Date.now();
        await post.save();
        console.log("Post has been soft deleted!");
        return res.json({ post });
      }

      // Delete image from cloudinary
      if (req.file) {
      await cloudinary.uploader.destroy(post.cloudinaryId);
      }
      // Delete post from db
      const commentIDs = [];
      const comments = post.comments;
      while (comments.length) {
        const comment = comments.pop();
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }
      await Comment.deleteMany({ _id: { $in: commentIDs}});
      await Like.deleteMany({ post: req.params.id });
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  editPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        match: { deletedAt: { $exists: false } },
        populate: { path: 'user' }
      });
      if (post.deletedAt) return res.status(404).end();
      for (const key of ['name', 'ancestry', 'str', 'int', 'class', 'level', 'xp', 'maxXp', 'dex', 'wis', 'title', 'alignment', 'con', 'cha', 'background', 'deity', 'hp', 'maxHp', 'ac', 'attack1', 'attack2', 'attack3', 'attack4', 'talent1',  'talent2', 'talent3', 'talent4', 'talent5', 'talent6', 'talent7', 'talent8', 'spell1', 'spell2', 'spell3', 'spell4', 'spell5', 'spell6', 'spell7', 'spell8', 'spell9', 'spell10', 'spell11', 'spell12', 'spell13', 'spell14', 'spell15', 'spell16', 'gear1', 'gear2', 'gear3', 'gear4', 'gear5', 'gear6', 'gear7', 'gear8', 'gear9', 'gear10', 'gear11', 'gear12', 'gear13', 'gear14', 'gear15', 'gear16', 'gear17', 'gear18', 'gear19', 'gear20', 'gp', 'sp', 'cp'   ]){
        if (req.body[key] === post[key]) continue;
        post[key] = req.body[key];
        post.edited = true;
      }

      if (req.file) {
        post.edited = true;
        await cloudinary.uploader.destroy(post.cloudinaryId);
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "auto",
        });
        post.media = result.secure_url;
        post.cloudinaryId = result.public_id;
      }

      const updatedPost = await post.save();
      console.log("Post has been updated!");
      res.json({ post: updatedPost.toObject() });
    } catch (err) {
      res.redirect("/profile");
    }
  }
};
