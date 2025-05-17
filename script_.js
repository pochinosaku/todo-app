const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  // タスクの要素を作成
  const li = document.createElement('li');
  li.textContent = taskText;

  // 完了ボタンを作成
  const completeBtn = document.createElement('button');
  completeBtn.textContent = '完了';
  completeBtn.style.marginLeft = '10px';

  // 削除ボタンを作成
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.style.marginLeft = '10px';

  // 完了ボタンの処理
  completeBtn.addEventListener('click', () => {
    const isCompleted = li.classList.contains('completed');

    if (!isCompleted) {
      li.classList.add('completed');
      completeBtn.textContent = '未完了に戻す';
      taskList.appendChild(li); // 一番下に移動（完了タスクは下に）
    } else {
      li.classList.remove('completed');
      completeBtn.textContent = '完了';
      taskList.insertBefore(li, getFirstCompletedTask()); // 未完了の位置へ移動
    }
  });

  // 削除ボタンの処理
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  // 要素にボタンを追加
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  // タスクリストに追加
  taskList.insertBefore(li, getFirstCompletedTask());

  taskInput.value = ""; // 入力をクリア
});

// 最初の完了タスクを探して返す関数
function getFirstCompletedTask() {
  const items = [...taskList.children];
  return items.find(item => item.classList.contains('completed')) || null;
}
