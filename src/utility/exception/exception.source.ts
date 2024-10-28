export class ExceptionSource {
  private readonly name: string;
  private readonly methodName: string;
  private readonly separator: string;

  constructor(name: string, methodName?: string) {
    this.name = name;
    this.methodName = methodName;
  }

  getName(): string {
    return this.name;
  }

  getMethodName(): string {
    return this.methodName;
  }

  getSource(): string {
    let value = this.name;
    if (this.separator) value += this.separator;
    if (this.methodName) value += this.methodName;

    return value;
  }
}
