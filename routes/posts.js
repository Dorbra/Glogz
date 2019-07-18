const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../authenticate');


router.get('/', (req, res) => {
    console.log("GET /posts Fetching Posts....");
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('ERROR: ' + err));

    // User.findOne({author: author}).populate("posts").exec((err, user) => { })
});

// Private POST users/add
// Creating a Post for current User.
router.post('/', /*auth */(req, res) => {
    console.log("POST /posts Creating Post....");
    const author = req.body.userId;
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ msg: 'Title and Body are required' });
    }

    const newPost = new Post({
        author,
        title,
        body,
    });

    newPost.save()
        .then((post) => {
            /* User.findOne({ author }, (err, user) => {
                if (err) return res.status(400).json({ err: 'User couldnt be found' });
                user.posts.push(post);
                user.save((err, data) => {
                    if (err) {
                        console.log(err);;
                    } else {
                        console.log("/posts data: ", data);
                        res.json("Post Saved for user: " + user.author);
                    }
                })
            }) */
            console.log(`Post Created: ${newPost.title}`);
            res.json(post);
        })
        .catch(err => res.status(400).json("catch: " + err));
});

router.get('/:id', (req, res) => {
    console.log("GET /posts/id fetch a Post....");
    Post.findById(req.params.id)
        .then(post => {
            console.log(`Fetched Post ${Post.title}`);
            res.json(post);
        })
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.delete('/delete/:id', /* auth */(req, res) => {
    console.log("DELETE /posts/id Deleting Post....");
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted Post'))     
        .catch(err => res.status(400).json("ERROR: " + err));
});

router.put('/edit/:id', (req, res) => {
    console.log("PATCH /posts/id Updating Post....");
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.body = req.body.body;
            let editedAt = new Date();
            post.createdAt = editedAt.getFullYear() + "-" + (editedAt.getMonth() + 1) + "-" + editedAt.getDate() + " " + editedAt.getHours() + ":" + editedAt.getMinutes() + ":" + editedAt.getSeconds();

            post.save()
                .then(() => res.json('Updated Post!'))
                .catch(err => res.status(400).json("ERROR: " + err));
        })
        .catch(err => res.status(400).json('ERROR: ' + err));
});

module.exports = router;