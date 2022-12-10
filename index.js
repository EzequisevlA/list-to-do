const texto = document.querySelector('input')
const btnInsert = document.querySelector('.insert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = [] 
  updateDB()
}
texto.addEventListener('keypress' , e =>{
    if( e.key == 'Enter' && texto.value != '') {
        setitensDB()
    }
})
btnInsert.onclick =() => {
    if(texto.value!='') {
        setitensDB()
    }
}

function setitensDB(){
    if(itensDB.length >=20){
        alert('Limite de 20 caracteres atingidos!')
        return
    }
    itensDB.push({
        'item': texto.value, 'status':''})
    updateDB()
}
function updateDB(){
    localStorage.setItem('todolist', JSON.stringify(itensDB))
    loaditensdb()
}

function loaditensdb() {
    ul.innerHTML="";
    itensDB=JSON.parse(localStorage.getItem('todolist')) ??[]
    itensDB.forEach((item, i) => {
        inserttela(item.item, item.status, i)
        
    });
}
function inserttela( text, status, i){
    const li=document.createElement('li')

    li.innerHTML = `
        <div class="divli">
            <input type="checkbox" ${status} data-i=${i} onchange="done(this,${i});"/>
            <span style=color:#ffc300; data-si=${i}>${text}</span>
            <button style=background-color: transparent, border=none; onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
        </div>
        `
    


    ul.appendChild(li)
    if (status){
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')}
        else{
            document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')}
        
            texto.value=''

    
}
function done(chk, i){
    if(chk.checked) {
        itensDB[i].status='checked'
    }else{
        itensDB[i].status=''
    }
    updateDB()

    
}
function removeItem(i){
    itensDB.splice(i, 1)
    updateDB()
}
loaditensdb()