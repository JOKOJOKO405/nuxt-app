import firebase from 'firebase/app'
import 'firebase/app'

// .envからfirebaseのIDを取得
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

// 初期化作業
if(!firebase.apps.length){
  firebase.initializeApp(config)
}

export default firebase