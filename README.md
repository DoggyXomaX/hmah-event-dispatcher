# Lightweight event dispatcher with strict types

[
  ![](https://img.shields.io/badge/hmah--event--dispatcher-npm-red)
](
  https://www.npmjs.com/package/hmah-event-dispatcher
)

## How to use

* Create an event map for the dispatcher in named-array Record
```ts
type TSomeClassEventMap = {
  "nameChange": [name: string];
};
```

* Inherit your class from `EventDispatcher` class and provide your `TSomeClassEventMap` as generic type
```ts
import { EventDispatcher } from 'hmah-event-dispatcher';

// ...

class SomeClass extends EventDispatcher<TSomeClassEventMap> {
  public _name: string;

  public constructor(name: string) {
    super()
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
    // Look! We dispatch a primitive, not an object!
    this.emit('nameChange', value);
  }
}
```

* You can also compose event dispatcher (composition over inheritance principle)
```ts
class SomeClass {
  // ...

  private readonly _observer = new EventDispatcher<TSomeClassEventMap>();
  public readonly on = this._observer.on;
  public readonly off = this._observer.off;
  private readonly emit = this._observer.emit;
}
```

* And use it in your code
```ts
const obj = new SomeClass("InitialName");

const onNameChange = (name: string) => console.log("Name changed to:", name);

obj.on("nameChange", onNameChange);
obj.name = "ChangedName"; // logs: Name changed to: ChangedName

obj.off("nameChange", onNameChange);
obj.name = "NotFiredName"; // No logs
```

## Testing

* `Bun` required
```shell
bun test
```

[See tests (src/tests/cat.test.ts)](tests/cat.test.ts)

## Types

[See types (src/EventDispatcher.d.ts)](src/EventDispatcher.d.ts)

## License

MIT
