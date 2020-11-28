import firebase from '@/plugins/firebase'
import { firestoreAction } from 'vuexfire'

// データベース
const db = firebase.firestore();
const todoRef = db.collection('my-todos')

export const state = function(){
  todos: []
}

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todoRef)
  }),
  add: firestoreAction((action, [task, limit]) => {
    if(task.trim().length && limit !==''){
      todoRef.add({
        task: task,
        done: false,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        modify: false,
        limit: limit
      })
    }
  }),
  delete: firestoreAction((action, id) =>{
    if(confirm('削除しますか？')){
      todoRef.doc(id).delete();
    }
  }),
  toggled: firestoreAction((action, todo) => {
    todoRef.doc(todo.id).update({
      done: !todo.done
    })
  }),
  modify: firestoreAction((action, [id, newTask, newLimit]) => {
    if(newTask.trim().length && newLimit !== ''){
      todoRef.doc(id).update({
        task: newTask,
        modify: false,
        limit: newLimit,
      })
    }
  }),
  show: firestoreAction((action, todo) => {
    todoRef.doc(todo.id).update({
      modify: !todo.modify
    })
  }),
}

export const getters = {
  orderedDate: state => {
    return _.sortBy(state.todos, 'date')
  },
  orderedLimit: state => {
    return _.sortBy(state.todos, 'limit')
  },
}