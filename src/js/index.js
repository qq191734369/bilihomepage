//初始化下拉菜单
tab('#ani-tab')
tab('#ani-rank-tab')
tab('#fan-tab')

//初始化侧边导航
scrollNav('#scroll-nav')

//卡片类型3初始化样式
let card3GroupArr = document.querySelectorAll('.card3-group')
//便利每个组内卡片，千把个添加pink类
card3GroupArr.forEach((item,index)=>{
  let arr = item.querySelectorAll('.card3')

  console.log(arr)
  arr = Array.from(arr)
  arr.forEach((elem,i)=>{
    if(i<=7) elem.classList.add('pink')
  })
})

//搜索历史显示逻辑
let input = document.querySelector('#search-input')
let historyList = document.querySelector('#history')
input.addEventListener('focus',(e)=>{
  historyList.classList.add('active')
})
input.addEventListener('blur',(e)=>{
  historyList.classList.remove('active')
})

//登陆框显示
let img1,img2,w,timer,isLogin = false
let alreadyLogin = document.querySelector('.already-login')
let avatar = document.querySelector('.avatar')

let loginDiv = document.querySelector('.login')
loginDiv.addEventListener('mouseenter',()=>{
  if(!isLogin){
    loginDiv.classList.add('hover')
    initDanmu()
  }else{
    alreadyLogin.classList.add('active')
    avatar.classList.add('active')
  }
  
})
loginDiv.addEventListener('mouseleave',()=>{
    loginDiv.classList.remove('hover')
    clearDanmu()
    if(isLogin){
      clearLogout()
    }
})

function clearLogout(){
  alreadyLogin.classList.remove('active')
  avatar.classList.remove('active')
}

// 弹幕滚动
function initDanmu() {
  [img1,img2] = Array.from(document.querySelectorAll('.img img'));  //ES6写法
  w = getPosition(img1).width
  img1.style.left = 0
  img2.style.left = getPosition(img1).width + 'px'
  
  function getPosition(elem){
    return elem.getBoundingClientRect()
  }
  
  function damuMove(elem1,elem2,speed) {
    elem1.style.left = parseInt(elem1.style.left) - speed + 'px'
    elem2.style.left = parseInt(elem2.style.left) - speed + 'px'
    if(parseInt(elem1.style.left) + w < 0) {
      elem1.style.left = w + 'px'
    }else if(parseInt(elem2.style.left) + w < 0){
      elem2.style.left = w + 'px'
    }
  }

  timer = setInterval(()=>{
    damuMove(img1,img2,5)
  },100)
}
//清除滚动
function clearDanmu(){
  clearInterval(timer)
}

//登陆框表单验证
let canLogin = false
let userOk = false
let passOk = false
let userRegx = /^\S{6,12}$/
let passwordRegx1 = /[a-zA-Z]+/
let passwordRegx2 = /[0-9]+/
let passwordRegx3 = /^[\S]{6,12}$/
let $userName = document.querySelector('#username')
let $password = document.querySelector('#password')
let $userVeri = document.querySelector('.username-veri')
let $passVeri = document.querySelector('.password-veri')

function checkCanLogin() {
  canLogin = userOk&&passOk
}

$userName.addEventListener('input',(e)=>{
  let val = $userName.value
  userOk = userRegx.test(val)
  console.log(userOk)
  if(userOk) {
    $userVeri.classList.remove('active')
  }
  else {
    $userVeri.classList.add('active')
  }
  checkCanLogin()
})

$password.addEventListener('input',(e)=>{
  let val = $password.value
  passOk = passwordRegx1.test(val)&&passwordRegx2.test(val)&&passwordRegx3.test(val)
  console.log(passOk)
  if(passOk) {
    $passVeri.classList.remove('active')
  }
  else {
    $passVeri.classList.add('active')
  }
  checkCanLogin()
})

// 登陆弹窗
let dialogDiv = document.querySelector('#login-dialog')
let diaLogCon
let mask = document.querySelector('#login-dialog .mask')


loginDiv.addEventListener('click',(e)=>{
  if(!isLogin){
    dialogDiv.classList.add('active')
    diaLogCon = dialogDiv.querySelector('.dialog-container')
  }
})
mask.addEventListener('click', clearLoginAvtive)

function clearLoginAvtive(){
  dialogDiv.classList.remove('active')
}

function onLogin(){
  if(canLogin){
    clearLoginAvtive()
    isLogin = true
  }
}

//退出登陆
function logOut(){
  isLogin = false
  clearLogout()
}
