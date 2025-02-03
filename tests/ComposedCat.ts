import type { TCatEventMap } from "./TCatEventMap";

import { EventDispatcher } from "@/EventDispatcher";

export class ComposedCat{
  private _name: string;
  private _age: number;

  public constructor(name: string, age: number) {
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

  // Observer
  private readonly _observer = new EventDispatcher<TCatEventMap>();
  public readonly on = this._observer.on;
  public readonly off = this._observer.off;
  public readonly offType = this._observer.offType;
  public readonly offAll = this._observer.offAll;
  private readonly emit = this._observer.emit;
}