import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

export function useAuth() {
  const user = getAuth().currentUser

  return {
    user
  }
}

export function useFirestore() {
  const db = getFirestore()

  return {
    db
  }
}

export function useStorage() {
  const storage = getStorage()

  return {
    storage,
    ref
  }
}
