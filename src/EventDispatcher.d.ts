type TEventMap = Record<string, any[]>;

/**
 * ### Event dispatcher implementation with strict types
 */
export class EventDispatcher<EventMap extends TEventMap> {
  /**
   * ### Add `listener` for listeners of `type`
   * @param type type of event listeners
   * @param listener void function with EventMap[type] arguments
   */
  public on<Type extends keyof EventMap>(type: Type, listener: (...args: EventMap[Type]) => void): void;

  /**
   * ### Remove `listener` from listeners of `type`
   * @param type type of event listeners
   * @param listener
   */
  public off<Type extends keyof EventMap>(type: Type, listener: (...args: EventMap[Type]) => void): void;

  /**
   * ### Remove all listeners of `type`
   * @param type type of event listeners
   */
  public offType<Type extends keyof EventMap>(type?: Type): void;

  /**
   * ### Remove all listeners
   */
  public offAll(): void;

  /**
   * ### Emit event of `type` with required `args` arguments
   *
   * @param type type of event listeners
   * @param args array from EventMap[type]
   * @protected
   */
  public emit<Type extends keyof EventMap>(type: Type, ...args: EventMap[Type]): void;
}