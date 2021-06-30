window.onload = function() {
    // A function that will be trigered once form is loaded
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
        throw('Something went wrong')
    })
}
const appendData=(data)=>{
    let outPut=document.getElementById('app');
 for(let item in data){
     let div=document.createElement('div');
     div.classList.add('user_cards-info');
     let btn=document.createElement('button');
     btn.textContent='Get Posts';
    
     div.innerHTML=`<div id='try'><h2>${data[item].name}</h2> <p>${data[item].email}</p></div>`
     div.setAttribute('id',data[item].id)
     div.appendChild(btn)
     outPut.appendChild(div)
     let singleUser=document.getElementById('singleUser');
     singleUser.style.display='none'
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
    let singleUser=document.getElementById('singleUser');
    let glass=document.getElementById('glass')
    outPut.innerHTML='';
    glass.style.display='none';
    postDetails.forEach(detail => {
        let li=document.createElement('li');
        let h2=document.createElement('h2');
        h2.style.textTransform='uppercase';
        let p=document.createElement('p');
        let styles = `
                    padding-top:1rem;
                    padding-bottom:1rem;
                    color:black;
                    `
        p.style=styles
        h2.textContent=detail.title
        p.textContent=detail.body
        li.appendChild(h2)
        li.appendChild(p)
        singleUser.style.display='block'
        singleUser.appendChild(li);
       });
    }).catch(err=>{
        throw('Something went wrong, Try again')
    })
}
}
//nav bar styling
window.addEventListener('scroll',()=>{
    var header=document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY>0)
})
