function scrollNav(id) {
  let nav = document.querySelector(id)
  let scrollContents = Array.from(document.querySelectorAll('.scroll-content'))
  let currentNav

  nav.addEventListener('click',(e)=>{
    let target = e.target

    if(target.classList.contains('side-nav-item')){
      //高亮点击元素
      
      lightClick(target)

      let to = document.querySelector(target.dataset.to)
      if(to){
        animateScroll(to,30)
      }
    }
  })

  window.addEventListener('scroll',(e)=>{
    scrollContents.forEach((item)=>{
      if(item.getBoundingClientRect().top>30 && item.getBoundingClientRect().top<100) {
        let current = document.querySelector('[data-to="#'+item.id+'"]')
        console.log(current)
        lightClick(current)
      }
    })
  })

  //高亮点击元素
  function lightClick(target){
    if(currentNav){
      currentNav.classList.remove('active')
      currentNav = target
      currentNav.classList.add('active')
    }else{
      target.classList.add('active')
      currentNav = target
    }

  }

  // 滚动函数
  function animateScroll(element,speed) {
    let rect=element.getBoundingClientRect();
    //获取元素相对窗口的top值，此处应加上窗口本身的偏移
    let top=window.pageYOffset+rect.top;
    let currentTop=0;
    let requestId;
    //采用requestAnimationFrame，平滑动画
    function step(timestamp) {
      currentTop+=speed;
      if(currentTop<=top){
        window.scrollTo(0,currentTop);
        requestId=window.requestAnimationFrame(step);
      }else{
        window.cancelAnimationFrame(requestId);
      }
    }
    window.requestAnimationFrame(step);
  }
}