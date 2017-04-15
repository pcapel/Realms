export class NoRealm {
  constructor(asset){
    this.message = `${asset.name || asset.type} is not registered to a Realm`;
    this.name = "NoRealmError";
  }
}
