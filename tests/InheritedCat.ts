import type { TCatEventMap } from "./TCatEventMap";

import { EventDispatcher } from "@/EventDispatcher";

export class InheritedCat extends EventDispatcher<TCatEventMap> {
  private _name: string;
  private _age: number;

  public constructor(name: string, age: number) {
    super();

    this._name = name;
    this._age = age;
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
    this.emit("nameChange", value);
    this.emit("change", value, this._age);
  }

  public get age() {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
    this.emit("ageChange", value);
    this.emit("change", this._name, value);
  }
}