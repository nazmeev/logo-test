import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore: AngularFirestore) { }

	getAllData(table): Observable<any> {
		return this.firestore.collection(table).valueChanges()
	}
	createData(primaryKey, data: {}, table: string): Promise<{}> {
		return this.firestore
			.collection(table)
			.add(data)
			.then(docRef => ({ ...data, [primaryKey]: docRef.id }))
	}
	updateData(dataID: string, data: {}, table: string): Promise<void> {
		return this.firestore.doc(`${table}/${dataID}`).update(data)
	}
	getDataById(id: string, table: string): Observable<any> {
		return this.firestore.collection(table).doc(id).valueChanges()
	}
	deleteData(dataID: string, table: string): Promise<void> {
		return this.firestore.doc(`${table}/${dataID}`).delete();
	}
}
