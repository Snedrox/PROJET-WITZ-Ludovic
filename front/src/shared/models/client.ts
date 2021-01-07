export class Client {
  name: string;
  surname: string;
  address: string;
  cp: string;
  city: string;
  phone: string;
  email: string;
  civility: string;
  login: string;
  password: string;
  constructor(name: string,
              surname: string,
              address: string,
              cp: string,
              city: string,
              phone: string,
              email: string,
              civility: string,
              login: string,
              password: string) {
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.cp = cp;
    this.city = city;
    this.phone = phone;
    this.email = email;
    this.civility = civility;
    this.login = login;
    this.password = password;
  }
}
