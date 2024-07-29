
class AccountSession {
  constructor() {
    this.accountId = null;
    this.username = null;
    this.clientId = null;
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

  setClientId(clientId) { 
    this.clientId = clientId;
  }
  getClientId() {
    return this.clientId;
  }

  clearSession() {
    this.accountId = null;
    this.username = null;
    this.clientId = null;
  }
}


export default AccountSession;