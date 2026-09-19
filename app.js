// localStorage 的 key
const STORAGE_KEY = 'todos'

// 取得 DOM 元素
const inputEl = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const listEl = document.getElementById('todo-list')
const countEl = document.getElementById('count')
const emptyMsgEl = document.getElementById('empty-msg')

// 資料結構：陣列，每筆 { id, text, done }
let todos = []

// 讀取 localStorage
function loadTodos(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    todos = raw ? JSON.parse(raw) : []
  }catch(e){
    todos = []
  }
}

// 存回 localStorage
function saveTodos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

// 產生唯一 id（簡易）
function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,6)
}

// 渲染清單與底部資訊
function render(){
  listEl.innerHTML = ''

  if(todos.length === 0){
    emptyMsgEl.style.display = 'block'
  }else{
    emptyMsgEl.style.display = 'none'
  }

  todos.forEach(item => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.dataset.id = item.id

    const chk = document.createElement('input')
    chk.type = 'checkbox'
    chk.checked = !!item.done
    chk.setAttribute('aria-label','完成')

    const span = document.createElement('span')
    span.className = 'todo-text' + (item.done ? ' completed' : '')
    span.textContent = item.text

    const del = document.createElement('button')
    del.className = 'del-btn'
    del.textContent = '刪除'
    del.setAttribute('aria-label','刪除')

    li.appendChild(chk)
    li.appendChild(span)
    li.appendChild(del)

    listEl.appendChild(li)
  })

  // 更新未完成計數
  const incomplete = todos.filter(t => !t.done).length
  countEl.textContent = `未完成: ${incomplete} 項`
}

// 新增待辦（忽略空白）
function addTodo(text){
  const t = text.trim()
  if(!t) return
  todos.unshift({ id: uid(), text: t, done: false })
  saveTodos()
  render()
}

// 移除待辦
function removeTodo(id){
  todos = todos.filter(t => t.id !== id)
  saveTodos()
  render()
}

// 切換完成狀態
function toggleDone(id, done){
  const it = todos.find(t => t.id === id)
  if(!it) return
  it.done = !!done
  saveTodos()
  render()
}

// 事件處理：新增按鈕
addBtn.addEventListener('click', () => {
  addTodo(inputEl.value)
  inputEl.value = ''
  inputEl.focus()
})

// Enter 新增
inputEl.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    addTodo(inputEl.value)
    inputEl.value = ''
  }
})

// 事件代理處理清單內的勾選與刪除
listEl.addEventListener('click', (e) => {
  const li = e.target.closest('li')
  if(!li) return
  const id = li.dataset.id

  if(e.target.tagName === 'BUTTON'){
    // 刪除按鈕
    removeTodo(id)
    return
  }
})

// 勾選改變（因為 checkbox 是 input，需監聽 change）
listEl.addEventListener('change', (e) => {
  if(e.target && e.target.type === 'checkbox'){
    const li = e.target.closest('li')
    const id = li && li.dataset.id
    toggleDone(id, e.target.checked)
  }
})

// 初始化
function init(){
  loadTodos()
  render()
}

init()

// 註：全部程式以原生 JavaScript、localStorage 儲存資料
