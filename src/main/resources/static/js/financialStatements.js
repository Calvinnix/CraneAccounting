var TrialBalanceAccount = React.createClass({
  getInitialState: function() {
    return {
      balance: -1
    };
  },
  componentDidMount: function () {
    this.formatBalance();
  },
  formatBalance: function() {
    //This is used to format the initial balance as a number
    var formattedBalance = this.props.account.balance;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    this.setState({
      balance: formattedBalance
    });
  },
  render: function () {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">{this.props.account.code} - {this.props.account.name}</div>
        {this.props.account.leftNormalSide ? (
            <div className="col-md-4 text-right">{this.props.first ? '$' : ''} {this.state.balance}</div>
          ) : (
            <div className="col-md-6 text-right">{this.props.first ? '$' : ''} {this.state.balance}</div>
          )
        }
        {this.props.account.leftNormalSide &&
          <div className="col-md-2"></div>
        }
      </div>
    );
  }
});

var TrialBalanceTable = React.createClass({
  formatBalance: function(number) {
    //This is used to format the initial balance as a number
    var formattedBalance = number;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    return formattedBalance;
  },
  render: function() {
    var self = this;
    var currentAssets = [];
    var longTermAssets = [];
    var currentLiabilities = [];
    var longTermLiabilities = [];
    var ownersEquity = [];
    var dividends = [];
    var revenues = [];
    var expenses = [];
    var leftSideBalanceTotal = 0;
    var rightSideBalanceTotal = 0;

    var firstShortTermAsset = true;
    var firstLongTermAsset = true;

    this.props.accounts.forEach(function(account) {
      if (account.leftNormalSide) {
        leftSideBalanceTotal += account.balance;
      } else {
        rightSideBalanceTotal += account.balance;
      }

      //don't show accounts that don't have a balance
      if (account.balance === 0) {
        return;
      }

      if (account.type === "Asset" && account.code < 150 && account.code >= 100) {
        currentAssets.push(<TrialBalanceAccount first={firstShortTermAsset} account={account} key={account.publicId} />);
        firstShortTermAsset = false;
      }else if (account.type === "Asset" && account.code < 200 && account.code >= 150) {
        longTermAssets.push(<TrialBalanceAccount first={firstLongTermAsset} account={account} key={account.publicId} />);
        firstLongTermAsset = false;
      }else if (account.type === "Liabilities" && account.code < 240 && account.code >= 200)   {
        currentLiabilities.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Liabilities" && account.code < 300 && account.code >= 240)   {
         longTermLiabilities.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Owner's Equity")   {
        ownersEquity.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Revenues")   {
        revenues.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Operating Expenses")   {
        expenses.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Dividends")   {
        dividends.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else {
        //do nothing
      }

    });

    return (
      <div className="well well-lg">
        <div className="col-md-8">Accounts</div>
        <div className="col-md-2 text-right">Debit</div>
        <div className="col-md-2 text-right">Credit</div>
        {currentAssets.length > 0 &&
          <div className="row">
            <hr/>
            <div className="col-md-12"><b>Current Assets</b></div>
            <hr/>
          </div>
        }
        {currentAssets}

        {longTermAssets.length > 0 &&
          <div className="row">
            <hr/>
            <div className="col-md-12"><b>Long Term Assets</b></div>
            <hr/>
          </div>
        }
        {longTermAssets}

        {expenses.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Expenses</b></div>
          <hr/>
        </div>
        }
        {expenses}

        {dividends.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Dividends</b></div>
          <hr/>
        </div>
        }
        {dividends}

        {currentLiabilities.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Current Liabilities</b></div>
          <hr/>
        </div>
        }
        {currentLiabilities}

        {longTermLiabilities.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Long Term Liabilities</b></div>
          <hr/>
        </div>
        }
        {longTermLiabilities}

        {ownersEquity.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Owner's Equity</b></div>
          <hr/>
        </div>
        }
        {ownersEquity}

        {revenues.length > 0 &&
          <div className="row">
            <hr/>
            <div className="col-md-12"><b>Revenues</b></div>
            <hr/>
          </div>
        }
        {revenues}
        <hr/>
        <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
        </div>
        <div className="row text-primary">
          <div className="col-md-8 text-right">Total:</div>
          <div className="col-md-2 text-right">{this.formatBalance(leftSideBalanceTotal)}</div>
          <div className="col-md-2 text-right">{this.formatBalance(rightSideBalanceTotal)}</div>
        </div>
      </div>
    );
  }
});

var TrialBalance = React.createClass({
  getInitialState: function() {
    return {
      accounts: []
    };
  },
  componentDidMount: function () {
    this.loadAccountsFromServer();
  },
  loadAccountsFromServer: function() {
    var self = this;
      $.ajax({
      url: "http://localhost:8080/api/accounts"
    }).then(function (data) {
      self.setState({accounts: data._embedded.accounts});
    });
  },
  render: function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var date = document.getElementById("date");
    today = mm+'/'+dd+'/'+yyyy;

    return (
      <div className="container">
      <h3>Crane Accounting</h3>
      <h3>Trial Balance</h3>
      <h3>{today}</h3>
      <TrialBalanceTable accounts={this.state.accounts} />
      </div>
    );
  }
});

if (document.getElementById('TrialBalance') != null) {
  ReactDOM.render(<TrialBalance />, document.getElementById('TrialBalance'));
}

var BalanceSheetAccount = React.createClass({
  getInitialState: function() {
    return {
      balance: -1
    };
  },
  componentDidMount: function () {
    this.formatBalance();
  },
  formatBalance: function() {
    //This is used to format the initial balance as a number
    var formattedBalance = this.props.account.balance;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    this.setState({
      balance: formattedBalance
    });
  },
  render: function () {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">{this.props.account.code} - {this.props.account.name}</div>
        {this.props.account.leftNormalSide ? (
            <div className="col-md-4 text-right">{this.state.balance}</div>
          ) : (
            <div className="col-md-6 text-right">{this.state.balance}</div>
          )
        }
        {this.props.account.leftNormalSide &&
          <div className="col-md-2"></div>
        }
      </div>
    );
  }
});

var BalanceSheetTable = React.createClass({
  formatBalance: function(number) {
    //This is used to format the initial balance as a number
    var formattedBalance = number;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    return formattedBalance;
  },
  render: function() {
    var self = this;
    var currentAssets = [];
    var longTermAssets = [];
    var currentLiabilities = [];
    var longTermLiabilities = [];
    var ownersEquity = [];
    var leftSideBalanceTotal = 0;
    var rightSideBalanceTotal = 0;
    var rev = 0;
    var expenses = 0;
    var totalIncome = 0;
    var ownEquity = 0;
    var liability = 0;
    this.props.accounts.forEach(function(account) {
      if (account.type === "Asset") {
        leftSideBalanceTotal += account.balance;
      }else if(account.type === "Owner's Equity" || account.type === "Liabilities" ){
        rightSideBalanceTotal += account.balance;
      }


      if(account.type === "Revenues"){
        rev += account.balance;
      } else if(account.type === "Operating Expenses")   {
        expenses += account.balance;
      } else {

      }

      /*if(account.name === "Retained Earnings"){
        account.balance = totalIncome;
      }*/

      //don't show accounts that don't have a balance
      if (account.balance === 0) {
        return;
      }

      if (account.type === "Asset" && account.code < 150 && account.code >= 100) {
        currentAssets.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Asset" && account.code < 200 && account.code >= 150) {
        longTermAssets.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Liabilities" && account.code < 240 && account.code >= 200)   {
        currentLiabilities.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Liabilities" && account.code < 300 && account.code >= 240)   {
         longTermLiabilities.push(<TrialBalanceAccount account={account} key={account.publicId} />);
      }else if (account.type === "Owner's Equity")   {
        ownersEquity.push(<BalanceSheetAccount account={account} key={account.publicId} />);
      }
      else {
        //do nothing
      }

      totalIncome = rev - expenses;
    });

    return (
      <div className="well well-lg">
        <div className="col-md-8">Account</div>
        <div className="col-md-2 text-right"></div>
        <div className="col-md-2 text-right"></div>
        {currentAssets.length > 0 &&
          <div className="row">
            <hr/>
            <div className="col-md-12"><b>Current Assets</b></div>
            <hr/>
          </div>
        }
        {currentAssets}

        {longTermAssets.length > 0 &&
          <div className="row">
            <hr/>
            <div className="col-md-12"><b>Long Term Assets</b></div>
            <hr/>
          </div>
        }
        {longTermAssets}

        {currentLiabilities.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Current Liabilities</b></div>
          <hr/>
        </div>
        }
        {currentLiabilities}

        {longTermLiabilities.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Long Term Liabilities</b></div>
          <hr/>
        </div>
        }
        {longTermLiabilities}

        {ownersEquity.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Owner's Equity</b></div>
          <hr/>
        </div>
        }
        {ownersEquity}

        <hr/>
        <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
        </div>
        <div className="row text-primary">
          <div className="col-md-8 text-right">Total:</div>
          <div className="col-md-2 text-right">{this.formatBalance(leftSideBalanceTotal)}</div>
          <div className="col-md-2 text-right">{this.formatBalance(rightSideBalanceTotal)}</div>
        </div>
      </div>
    );
  }
});

var BalanceSheet = React.createClass({
  getInitialState: function() {
    return {
      accounts: []
    };
  },
  componentDidMount: function () {
    this.loadAccountsFromServer();
  },
  loadAccountsFromServer: function() {
    var self = this;
      $.ajax({
      url: "http://localhost:8080/api/accounts"
    }).then(function (data) {
      self.setState({accounts: data._embedded.accounts});
    });
  },
  render: function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var date = document.getElementById("date");
    today = mm+'/'+dd+'/'+yyyy;


    return (
      <div className="container">
      <h3>Crane Accounting</h3>
      <h3>Balance Sheet</h3>
      <h3 id="date">{today}</h3>
      <BalanceSheetTable accounts={this.state.accounts} />
      </div>
    );
  }
});

if (document.getElementById('balanceSheet') != null) {
  ReactDOM.render(<BalanceSheet />, document.getElementById('balanceSheet'));
}

var IncomeStatementAccount = React.createClass({
  getInitialState: function() {
    return {
      balance: -1
    };
  },
  componentDidMount: function () {
    this.formatBalance();
  },
  formatBalance: function() {
    //This is used to format the initial balance as a number
    var formattedBalance = this.props.account.balance;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    this.setState({
      balance: formattedBalance
    });
  },
  render: function () {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">{this.props.account.code} - {this.props.account.name}</div>
            <div className="col-md-6 text-right">{this.state.balance}</div>
      </div>
    );
  }
});

var IncomeStatementTable = React.createClass({
  formatBalance: function(number) {
    //This is used to format the initial balance as a number
    var formattedBalance = number;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    return formattedBalance;
  },
  render: function() {
    var self = this;
    var assets = [];
    var liabilities = [];
    var ownersEquity = [];
    var revenues = [];
    var expenses = [];
    var leftSideBalanceTotal = 0;
    var rightSideBalanceTotal = 0;
    var totalIncome = 0;
    this.props.accounts.forEach(function(account) {
      if (account.type === "Operating Expenses") {
        leftSideBalanceTotal += account.balance;
      } else if(account.type === "Revenues"){
        rightSideBalanceTotal += account.balance;
      }

      //don't show accounts that don't have a balance
      if (account.balance === 0) {
        return;
      }

      if (account.type === "Revenues")   {
        revenues.push(<IncomeStatementAccount account={account} key={account.publicId} />);
      } else if (account.type === "Operating Expenses")   {
        expenses.push(<IncomeStatementAccount account={account} key={account.publicId} />);
      } else {
        //do nothing
      }

      totalIncome = rightSideBalanceTotal - leftSideBalanceTotal;

    });

    return (


      <div className="well well-lg">
        <div className="col-md-8">Accounts</div>
        <div className="col-md-2 text-right"></div>
        <div className="col-md-2 text-right">Balance</div>
        {expenses.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Expenses</b></div>
          <hr/>
        </div>
        }
        {expenses}

        {revenues.length > 0 &&
          <div className="row">
            <hr/>
            <div className="col-md-12"><b>Revenues</b></div>
            <hr/>
          </div>
        }
        {revenues}

        <hr/>
        <hr className="bar"/>
        <div className="row text-primary">
          <div className="col-md-1"></div>
          <div className="col-md-5">Net Income(Loss):</div>
          <div className="col-md-6 text-right">{this.formatBalance(totalIncome)}</div>
        </div>
      </div>
    );
  }
});

var IncomeStatement = React.createClass({
  getInitialState: function() {
    return {
      accounts: []
    };
  },
  componentDidMount: function () {
    this.loadAccountsFromServer();
  },
  loadAccountsFromServer: function() {
    var self = this;
      $.ajax({
      url: "http://localhost:8080/api/accounts"
    }).then(function (data) {
      self.setState({accounts: data._embedded.accounts});
    });
  },
  render: function () {

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      var date = document.getElementById("date");
      today = mm+'/'+dd+'/'+yyyy;

    return (
      <div className="container">
      <h3>Crane Accounting</h3>
      <h3>Income Statement</h3>
      <h3>{today}</h3>
      <IncomeStatementTable accounts={this.state.accounts} />
      </div>
    );
  }
});

if (document.getElementById('IncomeStatement') != null) {
  ReactDOM.render(<IncomeStatement />, document.getElementById('IncomeStatement'));
}

var StatementOfRetainedEarningsAccount = React.createClass({
  getInitialState: function() {
    return {
      balance: -1
    };
  },
  componentDidMount: function () {
    this.formatBalance();
  },
  formatBalance: function() {
    //This is used to format the initial balance as a number
    var formattedBalance = this.props.account.balance;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    this.setState({
      balance: formattedBalance
    });
  },
  render: function () {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">{this.props.account.code} - {this.props.account.name}</div>
        {this.props.account.leftNormalSide ? (
            <div className="col-md-4 text-right">{this.state.balance}</div>
          ) : (
            <div className="col-md-6 text-right">{this.state.balance}</div>
          )
        }
        {this.props.account.leftNormalSide &&
          <div className="col-md-2"></div>
        }
      </div>
    );
  }
});

var StatementOfRetainedEarningsTable = React.createClass({
  formatBalance: function(number) {
    //This is used to format the initial balance as a number
    var formattedBalance = number;
    if (!(/^(\d+\.\d\d)$/.test(formattedBalance))) {
      //number needs formatting
      formattedBalance = formattedBalance.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedBalance.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedBalance = parts.join(".");

    if (formattedBalance.charAt(0) === '-') {
      formattedBalance = "(" + (formattedBalance.substr(1)) + ")" //format -1000 to (1000)
    }

    return formattedBalance;
  },
  render: function() {
    var self = this;
    var assets = [];
    var liabilities = [];
    var ownersEquity = [];
    var revenues = [];
    var expenses = [];
    var dividends = [];
    var leftSideBalanceTotal = 0;
    var rightSideBalanceTotal = 0;
    var currentRetainedRevenues = 0;
    var expend = 0;
    var totalIncome = 0;
    this.props.accounts.forEach(function(account) {
      if (account.type === "Dividends") {
        leftSideBalanceTotal += account.balance;
      } else if(account.type === "Revenues"){
        rightSideBalanceTotal += account.balance;
      }else if(account.type === "Operating Expenses") {
        rightSideBalanceTotal -= account.balance;
      }else if(account.name === "Retained Earnings"){
        currentRetainedRevenues += account.balance;
      }

      //don't show accounts that don't have a balance
      if (account.balance === 0) {
        return;
      }

      if (account.type === "Dividends")   {
        dividends.push(<StatementOfRetainedEarningsAccount account={account} key={account.publicId} />);
      } else {
        //do nothing
      }

      totalIncome = rightSideBalanceTotal - leftSideBalanceTotal + currentRetainedRevenues;


    });

    return (
      <div className="well well-lg">
        <div className="col-md-1"></div>
        <div className="col-md-5"></div>
        <div className="col-md-4 text-right"></div>
        <div className="col-md-2 text-right">Balance</div>

        {Math.abs(currentRetainedRevenues) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Beginning Retained Revenues</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right">{this.formatBalance(currentRetainedRevenues)}</div>
        </div>
        }

        {Math.abs(rightSideBalanceTotal) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Current Net Income</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right">{this.formatBalance(rightSideBalanceTotal)}</div>
        </div>
        }

        {dividends.length > 0 &&
        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Dividends</b></div>
          <hr/>
        </div>
        }
        {dividends}

        <hr/>
        <hr className="bar"/>
        <div className="row text-primary">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">End Retained Earnings:</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right">{this.formatBalance(totalIncome)}</div>
        </div>
      </div>
    );
  }
});

var StatementOfRetainedEarnings = React.createClass({
  getInitialState: function() {
    return {
      accounts: []
    };
  },
  componentDidMount: function () {
    this.loadAccountsFromServer();
  },
  loadAccountsFromServer: function() {
    var self = this;
      $.ajax({
      url: "http://localhost:8080/api/accounts"
    }).then(function (data) {
      self.setState({accounts: data._embedded.accounts});
    });
  },
  render: function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var date = document.getElementById("date");
    today = mm+'/'+dd+'/'+yyyy;

    return (
      <div className="container">
      <h3>Crane Accounting</h3>
      <h3>Statement Of Retained Earnings</h3>
      <h3>{today}</h3>
      <StatementOfRetainedEarningsTable accounts={this.state.accounts} />
      </div>
    );
  }
});

if (document.getElementById('StatementOfRetainedEarnings') != null) {
  ReactDOM.render(<StatementOfRetainedEarnings />, document.getElementById('StatementOfRetainedEarnings'));
}