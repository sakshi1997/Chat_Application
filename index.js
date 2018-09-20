
var app=require('express')();

var http=require('http').Server(app);

var io=require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})
users=[];
io.on('connection',function(socket){
    console.log('user is connected');
    socket.on('setUsername',function(data){
        
        console.log(data);
        if(users.indexOf(data)>-1){
            socket.emit('userAlreadyExists',data+'Already exist..Try with some other Name!!');
        }else{
            users.push(data);
            socket.emit('newUserSet',{username: data});
        }
    });
    socket.on('msg',function(data){
          io.sockets.emit('NewMessage',data);
    })
})

http.listen(3000,function(){
    console.log('Server is ready at port 3000');
})