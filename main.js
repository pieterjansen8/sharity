const first = localStorage.getItem("name")
if(first==null){
  window.location.replace("/setnickname.html")
}
else{}
const device = localStorage.getItem("device")
if(device==null){
  window.location.replace("/select.html")
}
console.log(device)
const l = 
"<h1>Here you can chat with eachother💬</h1>"+
"<input id='room_inp'>"+
"<h1></h1>"+
"<button onclick='put_server()'>upload</button>"+
"<div id='chat'>"+
"<h2 id='ar'></h2>"+
"<h2 id='las'></h2>"+
"<h2 id='last'></h2>"+
"</div>"+
"<button onclick='reload()'>reload</button>"+
"<h1></h1>"+
"<a title='click to copy room url' id='copy_btn' onclick='copy_url()' id='share'>share room</a>"
const rooms = document.getElementById("rooms")
function set_name(){
    const l_name = document.getElementById("name").value
    localStorage.setItem("name",l_name)
    alert("nickname is set succesfully")
    window.location.reload()
}
function css_inp_an(){
    const main_comp = document.getElementById("code")
    main_comp.style = "font-size:30px"
}
async function create_room(){
    const num_1 = Math.floor(Math.random() * 100000);
    const url = "https://test-fac11-default-rtdb.europe-west1.firebasedatabase.app/rooms/"+num_1+".json"
    const f = await fetch(url,{

        headers:
      {
          'Accept': 'application/json',
          'Content-Type': "application/json",
      },
        method: "PUT",
        body: JSON.stringify({code: num_1})
    })
    if (f.status=="200"){
        const room_stat = document.getElementById("room_stat")
        room_stat.innerHTML = "<h1 id='down'>Room is created code: "+num_1+"</h1>"
        room_stat.value = num_1
        const roombtn = document.getElementById("join_room_id").style.display = "block"
    }
}
async function code_put(){
    const get_name = localStorage.getItem("name")
    if (get_name==null){
        alert("please set nickname first.")
        return
    }
    const code = document.getElementById("code").value
    const url = "https://test-fac11-default-rtdb.europe-west1.firebasedatabase.app/rooms/"+code
    const r = await fetch(url+".json")
    const out = await r.json()
    if (out==null){
        alert("false code.")
        return
    }
    if (out.code==code){
        alert("correct code")
        localStorage.setItem("url", url)
        localStorage.setItem("url_code", code)
    }
    else{
        alert("false code.")
        return
    }
    const al = document.getElementById("all")
    const rest = document.getElementById("code_insert")
    rest.innerHTML = ""
    al.innerHTML = l
    const ar = document.getElementById("ar")
    const cr = await fetch(url+"/main/putted.json")
    const bp = await cr.json()
    auto_reload()
    setenter()
}

async function put_server(){
    const naem = localStorage.getItem("name")
    const num = Math.floor(Math.random() * 100);
    const put = document.getElementById("room_inp").value
    const put_store = localStorage.getItem("url")
    const f = await fetch(put_store+"/main/putted.json",{
        headers:
      {
          'Accept': 'application/json',
          'Content-Type': "application/json",
      },
        method: "PUT",
        body: JSON.stringify({putted: naem+":  "+ put})
    })


  
    if (f.status=="200"){
    }
    const id = document.getElementById("room_inp")
    id.value = ""
}
function alert_spam(){
  alert("je bent gebant.")
  alert_spam()
}

async function reload(){
    const last_sent = localStorage.getItem("last")
    const third = localStorage.getItem("third")
    const las = document.getElementById("las")
    const url_rel = localStorage.getItem("url")
    const cr_rel  = await fetch(url_rel+"/main/putted.json")
    const cb_rel = await cr_rel.json()
    const mess = cb_rel.putted
    const last_div = document.getElementById("last")
    if(mess==last_sent){}
    else{
        last_div.innerHTML = third
        localStorage.setItem("third", last_sent)
        localStorage.setItem("last", mess)
        las.innerHTML = last_sent
        send_not()
    }

    const ar = document.getElementById("ar")
    ar.innerHTML = "<h2>"+mess+"</h2>"

    auto_reload()
}
function plus(){
    const al = document.getElementById("vis")
    const se = localStorage.getItem("room-name")
    const sen = localStorage.getItem("room-code")
    if(se==null){
    }
    else{
      al.innerHTML = "room-name: "+se+", room-code: "+sen
    }
    const div_vis = document.getElementById("room-code").style = "display:initial"
    const div_viss = document.getElementById("room-codes").style='display:initial'
    const btn = document.getElementById("btn").style='display:initial'
    const room_name_t = document.getElementById("room-name").style = "display:initial;"
    const room_name = document.getElementById("room-names").style = "display:initial;"
}
function set_room(){
  const code = document.getElementById("room-code").value
  const name = document.getElementById("room-name").value
  localStorage.setItem("room-name", name)
  localStorage.setItem("room-code",code)
}
function auto_reload(){
  setTimeout(reload,1000)
}   
function send_not(){
    Notification.requestPermission()
    var check = Notification.permission
    if(check=="denied"){
        return
    }
    const notify = localStorage.getItem("last")
    new Notification(notify)
}
function setenter(){
  const wage = document.getElementById('room_inp');
  wage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          put_server()
      }
  });
}
function check_web(){
  const win = window.location.href;
  if(win=="https://room.pieterjansen1.repl.co/"){
    window.location.replace("https://sharity.pieterjansen1.repl.co/")
  }
}
function join_title(){
  const title = document.getElementById("title")
  title.innerHTML = "checking database..."
  setTimeout(reset_title,1000)
}
function reset_title(){
  const title = document.getElementById("title")
  title.innerHTML = "sharity (in room)"
  setTimeout(join_title,1000)
}
check_web()
function join_created_room(code){
  window.location.replace("/joinroom.html?code="+code)
}
function copy_url(){
  var copy_btn = document.getElementById("copy_btn")
  var code = localStorage.getItem("url_code")
  var url = "https://sharity.netlify.app/joinroom?code="+code
  navigator.clipboard.writeText(url)
  copy_btn.innerHTML = "Url succesfully coppied!"
}