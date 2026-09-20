// localStorage 的 key
const STORAGE_KEY = 'todos'
const THEME_STORAGE_KEY = 'todo-theme'

// 取得 DOM 元素
const inputEl = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const listEl = document.getElementById('todo-list')
const countEl = document.getElementById('count')
const emptyMsgEl = document.getElementById('empty-msg')
const clearCompletedEl = document.getElementById('clear-completed')
const themeToggleEl = document.getElementById('theme-toggle')
const filterButtons = document.querySelectorAll('.filter-btn')

// 資料結構：陣列，每筆 { id, text, done }
let todos = []
let currentFilter = 'all'
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

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

// 取得使用者選擇或作業系統偏好的主題
function getPreferredTheme(){
  return localStorage.getItem(THEME_STORAGE_KEY) || (systemThemeQuery.matches ? 'dark' : 'light')
}

// 套用主題並更新切換按鈕文字
function applyTheme(theme){
  document.documentElement.dataset.theme = theme
  const isDark = theme === 'dark'
  themeToggleEl.textContent = isDark ? '☀️ 淺色模式' : '🌙 深色模式'
  themeToggleEl.setAttribute('aria-pressed', String(isDark))
}

// 取得目前篩選條件下要顯示的待辦
function getFilteredTodos(){
  if(currentFilter === 'active') return todos.filter(item => !item.done)
  if(currentFilter === 'completed') return todos.filter(item => item.done)
  return todos
}

// 取得清單為空時的對應提示
function getEmptyMessage(){
  if(todos.length === 0) return '還沒有任何待辦事項,新增一個吧!'
  if(currentFilter === 'active') return '目前沒有未完成的待辦事項，其他項目可能已被目前篩選條件過濾。'
  if(currentFilter === 'completed') return '目前沒有已完成的待辦事項，其他項目可能已被目前篩選條件過濾。'
  return '目前沒有符合條件的待辦事項。'
}
// 產生唯一 id（簡易）
function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,6)
}

// 渲染清單與底部資訊
function render(){
  listEl.innerHTML = ''
  const visibleTodos = getFilteredTodos()

  emptyMsgEl.textContent = getEmptyMessage()
  emptyMsgEl.style.display = visibleTodos.length === 0 ? 'block' : 'none'

  visibleTodos.forEach(item => {
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
  const completedCount = todos.filter(t => t.done).length
  countEl.textContent = `未完成: ${incomplete} 項`
  clearCompletedEl.disabled = completedCount === 0
}

// 切換目前篩選條件
function setFilter(filter){
  currentFilter = filter
  filterButtons.forEach(button => {
    const isActive = button.dataset.filter === filter
    button.classList.toggle('active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
  render()
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

// 清除所有已完成待辦
function clearCompleted(){
  const completedCount = todos.filter(t => t.done).length
  if(completedCount === 0) return
  if(!confirm('確定要清除所有已完成的待辦事項嗎？')) return
  todos = todos.filter(t => !t.done)
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

// 篩選按鈕事件
filterButtons.forEach(button => {
  button.addEventListener('click', () => setFilter(button.dataset.filter))
})

// 清除已完成按鈕事件
clearCompletedEl.addEventListener('click', clearCompleted)

// 主題切換事件，手動選擇會覆蓋作業系統偏好
themeToggleEl.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  applyTheme(nextTheme)
})

// 尚未手動選擇主題時，作業系統設定變更也會同步
systemThemeQuery.addEventListener('change', (event) => {
  if(!localStorage.getItem(THEME_STORAGE_KEY)){
    applyTheme(event.matches ? 'dark' : 'light')
  }
})

// 初始化
function init(){
  applyTheme(getPreferredTheme())
  loadTodos()
  render()
}

init()

// 註：全部程式以原生 JavaScript、localStorage 儲存資料
