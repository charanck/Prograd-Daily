const http = require("http");
const PORT = 3000;

let posts = [
    {
        id:1,
        title:"Title -1",
        content:"Random description 1"
    },
    {
        id:2,
        title:"Title -2",
        content:"Random description 2"
    },
    {
        id:3,
        title:"Title -3",
        content:"Random description 3"
    },
]

const server = http.createServer(handleServer);

server.listen(PORT,(err)=> console.log(`Server started on ${PORT}...`));

function handleServer(request,response){
    if(request.url === '/posts' && request.method === "GET"){
        return getAllPosts(request,response);
    }else if(/\/post\/[0-9]+/.test(request.url) && request.method === "GET"){
        return getOnePost(request,response);
    }else if(request.url === '/posts' && request.method === "POST"){
        createPost(request,response);
    }else if(/\/post\/[0-9]+/.test(request.url) && request.method === "DELETE"){
        deletePost(request,response);
    }else if(/\/post\/[0-9]+/.test(request.url) && request.method === "PUT"){
        updatePost(request,response);
    }else{
        response.end("dum");
    }
}

function getAllPosts(request,response){
    response.setHeader('Content-Type','application/json');
    response.end(JSON.stringify(posts));
    return;
}

function getOnePost(request,response){
    const path = request.url.split('/');
    const id = Number(path[path.length - 1]);
    const post = posts.find(post => post.id == id);
    response.setHeader('Content-Type','application/json');
    response.end(JSON.stringify(post));
    return;
}

function createPost(request,response){
    try{
        let body = '';
        request.on('data',(dataChunk)=>{
            body += dataChunk;
        });
        request.on('end',()=>{
            body = JSON.parse(body);
            posts.push({id:posts.length,...body});
            response.setHeader('Content-Type','application/json');
            response.end(JSON.stringify(posts[posts.length - 1]));
            ;
        });
    }catch(err){
        response.status = 500;
        response.end('SERVER ERROR!!!');
        return
    }
}

function deletePost(request,response){
    const path = request.url.split('/');
    const id = Number(path[path.length - 1]);
    const post = posts.find(post => post.id == id);
    posts = posts.filter(post => post.id !== id);
    response.setHeader('Content-Type','application/json');
    response.end(JSON.stringify(post));
    return;
}

function updatePost(request,response){
    const path = request.url.split('/');
    const id = Number(path[path.length - 1]);
    const newList = [];
    posts.forEach(post =>{
        if(post.id == id){
            try{
                let body = '';
                request.on('data',(dataChunk)=>{
                    body += dataChunk;
                });
                request.on('end',()=>{
                    body = JSON.parse(body);
                    post.title = body.title;
                    post.content = body.content;
                });
            }catch(err){
                response.status = 500;
                response.end('SERVER ERROR!!!');
                return
            }
        }
        newList.push(post);
    });
    posts = newList;
    response.setHeader('Content-Type','application/json');
    response.end(JSON.stringify(posts.find(post => post.id == id)));
    return;
}
