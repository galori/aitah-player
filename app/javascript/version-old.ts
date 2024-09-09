class VersionOld {

  private readonly version: string;

  constructor() {
    this.version = '1.0.0';
  }

  logVersion() {
    console.log(`Version: ${this.version}`);
  }
}

export default VersionOld;
