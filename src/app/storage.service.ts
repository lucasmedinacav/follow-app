import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor(private storage: Storage) { }

    get(value): Promise<any> {
        return this.storage.get(value);
    }

    set(key, value) {
        this.storage.set(key, value);
    }

    clear() {
        return this.storage.clear();
    }
}