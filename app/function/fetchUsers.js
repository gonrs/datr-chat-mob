import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export function fetchUsers(currentUser, setUsers) {
	if (currentUser) {
		try {
			// let users = '#18147f'
			const unsubscribe = onSnapshot(
				doc(db, 'users', currentUser && currentUser.uid),
				doc => {
					if (doc.exists()) {
						setUsers(doc.data().theme)
					}
				}
			)
			return unsubscribe
		} catch (err) {}
	} else {
		return setColor(null)
	}
}
