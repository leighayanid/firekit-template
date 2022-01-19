import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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
