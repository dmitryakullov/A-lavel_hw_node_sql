const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
var express = require('express');
var app = express();

var schema = buildSchema(`
    type Query {
        getPost(id: String!): Post
        getPosts: [Post]
        getComments(id: Int!): [Comment]
        getSubComments(id: Int!): [Comment]
    }
    type Mutation {
        createPost(title: String!, text: String!): Post
        createComment(postID: Int!, text: String!): Post
    }

    type Post {
        id: Int
        title: String
        text:  String
        age:   String
        tagz:  [String]
        comments: [Comment]
        timestamp: Int
        key: String
    }
    type Comment {
        id: Int
        text:  String
        age:   String
        commentId: Int
    }
`);

async function getPost({id}){
    return await Post.findById(id)
}

async function getPosts(){
    return await Post.findAll({})
}

var root = {//объект соответствия названий в type Query и type Mutation с функциями-резолверами из JS-кода
    getPost,
    getPosts,
    getPostComments,
    getSubComments,
    createPost,
    createComment,
};


app.use(cors())

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// app.use('/graphql', express_graphql( (req, res) => { //объект не подойдет, так как контекст разный от запроса к запросу.
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//     context: {user: req.user, session: req.session} //сразу для JWT и cookie-session
// }));
async function savePost({text, title}, {user: {userId}}){ //второй параметр + вложенная деструктуризация
    let post = await Post.create({text, title, ownerId: userId})
    return post;
}

async function updatePost({id, text, title}, {user: {userId}}){ //второй параметр + вложенная деструктуризация
    let post = await Post.findById(id)
    if (post.ownerId === userId){
        post.text = text
        post.title = title
        await post.save()
        return post   
    }
    return post;
};

import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} });

gql.request(`query getPost($postID: String!){
        getPost(id:$postID){
        id
        title
        timestamp
        tagz
        }
    }`, {postID: this.props.match.params.id}) 
.then(data => store.dispatch({type: "DATA", data}))









// //get all the libraries needed
// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const {GraphQLSchema} = require('graphql');

// const {queryType} = require('./query.js');

// //setting up the port number and express app
// const port = 5000;
// const app = express();

//  // Define the Schema
// const schema = new GraphQLSchema({ query: queryType });

// //Setup the nodejs GraphQL server
// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     graphiql: true,
// }));

// app.listen(port);
// console.log(`GraphQL Server Running at localhost:${port}`);