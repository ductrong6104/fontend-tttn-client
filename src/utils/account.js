class AccountSession {
  constructor() {
    this.accountId = null;
    this.username = null;
  }

  static getInstance() {
    if (!AccountSession.instance) {
      AccountSession.instance = new AccountSession();
    }
    return AccountSession.instance;
  }

  setAccountId(accountId) {
    this.accountId = accountId;
  }

  getAccountId() {
    return this.accountId;
  }
  setUsername(username){
    this.username = username;
  }
  getUsername(){
    return this.username;
  }

  clearSession() {
    this.accountId = null;
    this.username = null;
  }
}


export default AccountSession;