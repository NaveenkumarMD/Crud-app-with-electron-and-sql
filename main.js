const { ipcRenderer } = require('electron')
ipcRenderer.send('ping', "naveenkumar from html")
function hanldecreatesubmit(event) {
    var author = document.getElementById("author_name").value
    var Topic = document.getElementById("Topic").value
    var content = document.getElementById("content").value
    var Topic_id = document.getElementById('Topic_id').value
    console.log(author + Topic + content + Topic_id)
    if(!author || !Topic ||!content ||!Topic_id){
        var message=document.getElementById('message-create')
        return message.innerHTML="<div class='alert alert-warning' role='alert'>Enter all the fields</div>"
    }
    var data = {
        author, Topic, Topic_id, content
    }
    var message=document.getElementById('message-create')
    message.innerHTML="<div class='alert alert-success' role='alert'>Success</div>"
    document.getElementById('author_name').value=""
    document.getElementById('Topic').value=""
    document.getElementById('Topic_id').value=""
    document.getElementById('content').value=""
    ipcRenderer.send('createdata',data)
}
function  hanldeupdatecontent(){
    const topic_id=document.getElementById('topicid-update').value
    const content=document.getElementById('content-update').value
    console.log(topic_id,content)
    var data={
        topic_id,content
    }
    ipcRenderer.send('update-content',data)
}
ipcRenderer.on('update-reply',(e,data)=>{
    if(data){
        document.getElementById('message-update').innerHTML="<div class='alert alert-success' role='alert'>Success</div>"
        
    }
})
const uniqueid=()=>{
    const Topic_id=document.getElementById("Topic_id")
    var id=Math.floor(Math.random()*9999)     
    console.log(id)
    Topic_id.value=id

}
function handleread(){
    const searchkey=document.getElementById('searchkey').value
    var key=parseInt(searchkey)
    if(typeof(parseInt(searchkey))=='number'){
        ipcRenderer.send('readbyid',searchkey)
    }
}
ipcRenderer.on('create-reply',(e,data)=>{
    
})
ipcRenderer.on('read-reply',(e,data)=>{
    console.log(data)
    var result=document.getElementById('resultview')
    var html=""
    for(let i=0;i<data.length;i++){
        
        html+="<li>"+"<h5>"+data[i].topic+"</h5>"
        html+="<p >"+data[i].content+"</p>"
        html+="<p>"+"Author name:"+data[i].author_name+"<p>"
        html+="<p>"+"Id:"+data[i].topic_id+"<p>"
        html+"</li>"
    }
    result.innerHTML=html
})
function deleteblog(){
    const doc=document.getElementById('blogtobedeleted').value
    if(doc==""){
        return alert("Enter the id")
    }   
    console.log(doc)
    ipcRenderer.send('to-delete',doc) 
}
ipcRenderer.on('delete-reply',(e,data)=>{
    //alert(data)
    var message=document.getElementById('message')
    message.innerHTML="<div class='alert alert-success' role='alert'>Success</div>"

})