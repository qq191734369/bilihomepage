function tab(id) {
  let tab = document.querySelector(id)
  let currentContent
  let currentTab
  if(tab){
    // 初始化
    currentTab = tab.querySelector('.tab-item')
    currentContentId = tab.querySelector('.tab-item').dataset.tar
    if(currentContentId) {
      currentTab.classList.add('active')
      // 根据id查找元素
      currentContent = document.querySelector(currentContentId)
      currentContent.classList.add('active')
    }
    // 绑定点击事件
    tab.addEventListener('click', (e)=>{
      let target = e.target
      if(target.classList.contains('tab-item')) {
        let emitTar = document.querySelector(target.dataset.tar)
        console.log(emitTar)

        //当前点击元素已激活，那么直接返回
        if(currentTab == target) return

        currentTab.classList.remove('active')
        currentTab = target
        currentTab.classList.add('active')

        currentContent.classList.remove('active')
        currentContent = emitTar
        currentContent.classList.add('active')
      }
    })
  }
}