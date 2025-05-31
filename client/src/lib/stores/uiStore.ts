// noinspection JSUnusedGlobalSymbols

import { makeAutoObservable } from "mobx";

export class UiStore {
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    isBusy() {
        this.isLoading = true
    }

    isIdle() {
        this.isLoading = false
    }
}
