import { BehaviorSubject } from "rxjs";

class Counter {
  state: BehaviorSubject<number>;
  changes = () => this.state.asObservable();
  update = (value: number) => this.state.next(value);;
  constructor(initialCount: number) {
    this.state = new BehaviorSubject<number>(initialCount);
  }
}

export default Counter