export class IUser {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public walletBalance: Number,
    public country: string
  ) {}
}
