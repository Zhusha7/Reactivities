import { action, makeAutoObservable, observable } from "mobx";

export default class CounterStore {
    title = "Counter store";
    count = 0;
    events: string[] = [
        `Initial count: ${this.count}`,
    ];

    constructor() {
        makeAutoObservable(this, {
            title: observable,
            count: observable,
            increment: action,
            decrement: action,
        });
    }

    increment = (amount: number = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount}. Count is now ${this.count}`);
    }

    decrement = (amount: number = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount}. Count is now ${this.count}`);
    }

    get eventsCount() {
        return this.events.length;
    }

}
