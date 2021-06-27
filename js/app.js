window.onload = function() {
    fetchUserData();
};
const fetchUserData=()=>{
    fetch("https://jsonplaceholder.typicode.com/users").then(response=>{
        if(!response.ok){
            throw('Something went wrong')
        }
        return response.json();
    }).then(data=>{
        appendData(data)
    }).catch(error=>{
        console.log(error)
    })
}
const appendData=(data)=>{
    let outPut=document.getElementById('app');
 for(let item in data){
     let li=document.createElement('li');
     let btn=document.createElement('button');
     btn.textContent='Get Posts'
     li.innerHTML=data[item].name + '<br />' + data[item].email
     li.setAttribute('id',data[item].id)
     li.appendChild(btn)
     outPut.appendChild(li)
     btn.addEventListener('click',e=>{getDetails(e)})
    }
}
const getDetails=(e)=>{
    let userId= e.target.parentElement.id;
    if(userId){
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then(response=>{
        return response.json();
    }).then(postDetails=>{
    let outPut=document.getElementById('app');
    outPut.innerHTML='';
    postDetails.forEach(detail => {
        let li=document.createElement('li');
        let h2=document.createElement('h2');
        let p=document.createElement('p');
        h2.textContent=detail.title
        p.textContent=detail.body
        li.appendChild(h2)
        li.appendChild(p)
        outPut.appendChild(li);
       });
    }).catch(err=>{
        throw('Something went wrong, Try again')
    })
}
}
