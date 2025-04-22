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
        return (this.isLoading = true);
    }

    isIdle() {
        return (this.isLoading = false);
    }
}
