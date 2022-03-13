document.getElementById('add-button').addEventListener('click', () => onClickAdd());


const onClickAdd = () => {
  // 入力値取得、入力欄初期化
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';
  
  // 戻すボタンと、新規作成がほとんど一緒なので関数化
  createIncompleteList(inputText);
  
}

// リスト削除関数
const deleteFromIncompleteList = (target) => {
  document.getElementById('incomplete-list').removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // 追加ボタン押下時、リスト生成
  const div = document.createElement('div');
  div.className = 'list-row';
  const li = document.createElement('li');
  li.innerText = text;

  const completeButton = document.createElement('button');
  completeButton.innerText = '完了';
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';

  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  document.getElementById('incomplete-list').appendChild(div);


  // 削除ボタン押下時の親要素のdivを削除 
  deleteButton.addEventListener('click', () => {
    deleteFromIncompleteList(deleteButton.parentNode);
  });
  
  
  // 完了ボタン押下時リスト削除と移動
  completeButton.addEventListener('click', () => {
    
    // 押下時のリスト削除
    deleteFromIncompleteList(completeButton.parentNode);
    
    // divを使い回して完了エリアに移動
    // 親のdiv取得
    const addTarget = completeButton.parentNode;
    // <li>text</li>
    const text = addTarget.firstElementChild.innerText;
    // div配下を空にする
    addTarget.textContent = null;
    // liタグ生成
    const li = document.createElement('li');
    li.innerText = text;
    // 戻すボタン生成
    const backButton = document.createElement('button');
    backButton.innerText = '戻す';


    backButton.addEventListener('click', ()=> {
      // 親のdiv取得して削除
      const deleteTarget = backButton.parentNode;
      document.getElementById('complete-list').removeChild(deleteTarget);

      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });
    
    // 完了枠へ移動
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);
    document.getElementById('complete-list').appendChild(addTarget);

  });
};