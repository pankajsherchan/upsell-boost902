const express = require('express');

const router = express.Router();

router.use(express.json());

let DUMMY_POSTS = [
    {
        id: 'p1',
        date: '01.07.18',
        confNum: '69321565',
        RTC: 'GDX',
        upgradedTo: 'Z1CLC',
        unitPrice: 500,
        numNights:1,
        revenue: 500,
        commission: 50,
        colleague: 'Tereza',
        remark: ''
    },
    {
        id: 'p2',
        date: '01.07.18',
        confNum: '69321565',
        RTC: 'GDX',
        upgradedTo: 'Z1CLC',
        unitPrice: 500,
        numNights:1,
        revenue: 500,
        commission: 50,
        colleague: 'Angelique',
        remark: ''
    }
]

let allPosts = DUMMY_POSTS;

//Get All Posts
router.get('/', (req, res, next) => {
    const posts = allPosts;
    res.json({posts});
})

//Create Post
router.post('/', (req,res,next) => {

    console.log(req.body.id);

    const number = DUMMY_POSTS.length + 1;

    const post = {
        id: 'p'+number,
        date : Date.now().toString(),
        confNum : req.body.confNum,
        RTC: req.body.RTC,
        unitPrice: req.body.unitPrice,
        numNights: req.body.numNights,
        revenue: req.body.revenue,
        commission: req.body.commission,
        colleague: req.body.colleague,
        remark:''
    };
    DUMMY_POSTS.push(post);

    res.json({post});
})

//Get Post by id
router.get('/:pid', (req, res, next) => {
    const postId = req.params.pid;
   // console.log(postId);
    let posts = allPosts;
   // console.log(users);
    const post = posts.find(p=> p.id === postId);
   // console.log(user);

    if(!post){
        const error = new Error('Post not found.');
        error.code = 404;
        return next(error);
    }

    res.json({post});
})

//Edit Post
router.put('/', (req, res, next) => {
    const postId = req.body.id;

    const post = DUMMY_POSTS.find(p=> {
        return p.id === postId;
    })

    if(!post){
        const error = new Error('Post not found.');
        error.code = 404;
        return next(error);
    }else{
        post.confNum = req.body.confNum, //Updated Email
        post.RTC=req.body.RTC, //Updated First Name
        post.upgradedTo = req.body.upgradedTo,  // Updated Last Name
        post.unitPrice = req.body.unitPrice, // Updated Password
        post.numNights = req.body.numNights, //Updated Phone Number
        post.revenue = req.body.revenue,
        post.commission = req.body.commission,
        post.colleague = req.body.colleague,
        post.remark = req.body.remark
    }

    res.json({post});
});

//DELETE Post
router.delete('/:pid', (req, res, next) => {
    const postId = req.params.uid;

    const post = DUMMY_POSTS.find(p=> {
        return p.id === postId;
    })

    if(!post){
        const error = new Error('User not found.');
        error.code = 404;
        return next(error);
    }else{
       allPosts= allPosts.filter(p=>p.id!=postId);
    }

    res.json({allPosts});
})
module.exports = router;