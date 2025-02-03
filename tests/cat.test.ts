import { describe, expect, test } from "bun:test";
import { ComposedCat } from "./ComposedCat";
import { InheritedCat } from "./InheritedCat";

const testCase = (cat: InheritedCat | ComposedCat) => {
  let nameEmitCount = 0;
  let ageEmitCount = 0;
  let changeEmitCount = 0;

  const onNameChange = (...args: unknown[]) => {
    expect(args.length).toBe(1);

    const [name] = args;
    expect(typeof name).toBe("string");

    nameEmitCount++;
  };

  const onAgeChange = (...args: unknown[]) => {
    expect(args.length).toBe(1);

    const [age] = args;
    expect(typeof age).toBe("number");

    ageEmitCount++;
  };

  const onChange = (...args: unknown[]) => {
    expect(args.length).toBe(2);

    const [name, age] = args;

    expect(typeof name).toBe("string");
    expect(typeof age).toBe("number");

    changeEmitCount++;
  };

  test("simple name event", () => {
    cat.on("nameChange", onNameChange);
    cat.name = "Murka2";

    expect(nameEmitCount).toBe(1);
    expect(ageEmitCount).toBe(0);
    expect(changeEmitCount).toBe(0);
  });

  test("double change event", () => {
    cat.on("change", onChange);
    cat.name = "Murka3";
    cat.age = 6;

    expect(nameEmitCount).toBe(2);
    expect(ageEmitCount).toBe(0);
    expect(changeEmitCount).toBe(2);
  });

  test("invalid function link", () => {
    cat.off("nameChange", onChange);
    cat.name = "Murka4";

    expect(nameEmitCount).toBe(3);
    expect(ageEmitCount).toBe(0);
    expect(changeEmitCount).toBe(3);
  });

  test("remove name listeners group", () => {
    cat.offType("nameChange");
    cat.name = "A";
    cat.name = "B";

    expect(nameEmitCount).toBe(3);
    expect(ageEmitCount).toBe(0);
    expect(changeEmitCount).toBe(5);
  });

  test("add age event and off all", () => {
    cat.on("ageChange", onAgeChange);
    cat.age = 6;
    cat.age = 7;

    cat.offAll();

    cat.name = "meow";
    cat.age = 2;

    expect(nameEmitCount).toBe(3);
    expect(ageEmitCount).toBe(2);
    expect(changeEmitCount).toBe(7);
  });

  test("multiple event add should be single event", () => {
    cat.on("nameChange", onNameChange);
    cat.on("nameChange", onNameChange);
    cat.on("nameChange", onNameChange);

    cat.name = "TripleMurka";
    cat.name = "SixtyMurka";

    expect(nameEmitCount).toBe(5);
    expect(ageEmitCount).toBe(2);
    expect(changeEmitCount).toBe(7);
  });
}

describe("composed cat test", () => {
  const cat = new ComposedCat("Murka", 1);
  testCase(cat);
});

describe("inherited cat test", () => {
  const cat = new InheritedCat("Murka", 1);
  testCase(cat);
});