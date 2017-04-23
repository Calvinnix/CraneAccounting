var RatioAnalysisTable = React.createClass({
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
    var sales = 0;
    var totalAssets = 0;
    var totalLiabilities = 0;
    var rightSideBalanceTotal = 0;
    var leftSideBalanceTotal = 0;
    var currentAssets = 0;
    var longTermDebt = 0;
    var currentLiabilities = 0;
    var currentDepreciation = 0;
    var commonEquity = 0;
    var currentRatio = 0;
    var receivables = 0;
    var quickRatio = 0;
    var fixedAsset = 0;
    var totalIncome = 0;
    var currentRetainedRevenues = 0;
    var ebit = 0;
    var invTurnover = 0;
    var intExpense = 0;
    var cogs = 0;
    var dso = 0;
    var fixedAssetRatio = 0;
    var totalAsset = 0;
    var debtRatio = 0;
    var pm = 0;
    var om = 0;
    var gpm = 0;
    var tie = 0;
    var ec = 0;
    var bep = 0;
    var roa = 0;
    var roe = 0;
    var invWorkingCap = 0;
    var currentInventories = 0;
    var debtEquity = 0;
    var longDebtEquity = 0;
    var interestEarned = 0;
    var interest = 0;
    this.props.accounts.forEach(function(account) {

      if (account.type === "Asset") {
        totalAssets += account.balance;
      }

      if(account.code  < 150 && account.type === "Asset"){
        currentAssets += account.balance;
      }

      if (account.type === "Asset" && account.name.includes("Accumulated Depreciation") === false) {
        fixedAsset += account.balance;
      }else if(account.name.includes("Accumulated Depreciation")){
        fixedAsset -= account.balance;
      }

      if(account.type === "Liabilities"){
        totalLiabilities += account.balance;
      }

      if(account.code < 250 && account.type === "Liabilities"){
        currentLiabilities += account.balance;
      }

      if(account.mGroup === "Inventories") {
        currentInventories += account.balance;
      }

      if(account.name === "Sales"){
        sales += account.balance;
      }

      if(account.name === "Interest Expense"){
        interest += account.balance;
      }

      if(account.name === "Cost Of Goods Sold"){
        cogs += account.balance;
      }

      if(account.code > 240 && account.code < 300){
        longTermDebt += account.balance;
      }

      if(account.type === "Owner's Equity"){
        commonEquity += account.balance;
      }

      if (account.type === "Dividends") {
        leftSideBalanceTotal += account.balance;
      } else if(account.type === "Revenues"){
        rightSideBalanceTotal += account.balance;
      }else if(account.type === "Operating Expenses") {
        rightSideBalanceTotal -= account.balance;
      }else if(account.name === "Retained Earnings"){
        currentRetainedRevenues += account.balance;
      }

      if(account.name.includes("Interest Expense")){
        intExpense += account.balance;
      }

      if(account.mGroup === "Receivables"){
        receivables += account.balance;
      }

      if(account.name.includes("Depreciation")){
        currentDepreciation += account.balance;
      }

      if(account.type === "Revenue"){
        ebit += account.balance;
      }else if(account.type === "Operating Expenses"){
        ebit -= account.balance;
      }

      quickRatio = (currentAssets - currentInventories)/currentLiabilities;
      currentRatio = currentAssets/currentLiabilities;
      invTurnover = sales/currentInventories;


      if(sales === 0){
        dso = 0;
        pm = 0;
        om = 0;
        gpm = 0;
      }else{
        dso = receivables/(sales/365);
        pm = totalIncome/sales;
        om = totalIncome/sales;
        gpm = (sales - cogs)/sales;
      }

      totalAsset = sales/totalAssets;
      bep = totalIncome/totalAssets;
      debtRatio = totalLiabilities/totalAssets;
      roa = totalIncome/totalAssets;
      fixedAssetRatio = sales/fixedAsset;

      if(intExpense === 0){
        tie = 0;
        ec = 0;
      }else{
        tie = ebit/intExpense;
        ec = (ebit-currentDepreciation)/intExpense;
      }

      roe = totalIncome/commonEquity;

      currentRatio = currentAssets/currentLiabilities;
      totalIncome = rightSideBalanceTotal - leftSideBalanceTotal + currentRetainedRevenues;
      invWorkingCap = currentInventories/(currentAssets - currentLiabilities);
      debtEquity = totalLiabilities/commonEquity;
      longDebtEquity = longTermDebt/commonEquity;

      if(interest === 0){
        interestEarned = 0;
      }else{
        interestEarned = totalIncome/interest;
      }
    });

    return (
      <div className="well well-lg">
        <div className="col-md-1"></div>
        <div className="col-md-5"></div>
        <div className="col-md-4 text-right"></div>
        <div className="col-md-2 text-right"></div>

        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Liquidity</b></div>
          <hr/>
        </div>

        {Math.abs(currentRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Current Ratio</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="currentRatio" >{currentRatio.toFixed(2)}</div>
        </div>
        }

        {Math.abs(quickRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Quick Ratio</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="quickRatio" >{quickRatio.toFixed(2)}</div>
        </div>
        }

        {Math.abs(invWorkingCap) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Inventory to Net Working Capital</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="invWorkingCap" >{invWorkingCap.toFixed(2)}</div>
        </div>
        }

        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Asset Management</b></div>
          <hr/>
        </div>

        {Math.abs(invTurnover) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Inventory Turnover</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="invTurnover">{invTurnover.toFixed(2)}</div>
        </div>
        }

        {Math.abs(dso) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Days Sales Outstanding (DSO)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="dso">{dso.toFixed(2)}</div>
        </div>
        }

        {Math.abs(fixedAssetRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Fixed Asset Turnover</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="fixedAsset">{fixedAssetRatio.toFixed(2)}</div>
        </div>
        }

        {Math.abs(totalAsset) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Total Asset Turnover</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="totalAsset">{totalAsset.toFixed(2)}</div>
        </div>
        }


        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Debt Management</b></div>
          <hr/>
        </div>

        {Math.abs(debtRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Debt-to-Asset Ratio</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="debtRatio">{debtRatio.toFixed(2)}</div>
        </div>
        }

        {Math.abs(longDebtEquity) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Debt-to-Equity Ratio</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="longDebtEquity">{longDebtEquity.toFixed(2)}</div>
        </div>
        }

        {Math.abs(interestEarned) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Times-interest-earned Ratio</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="interestEarned">{interestEarned.toFixed(2)}</div>
        </div>
        }

        {Math.abs(tie) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Times Interest Earned (TIE)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="tie">{tie.toFixed(2)}</div>
        </div>
        }

        {Math.abs(ec) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Economic Capital (EC)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="ec">{ec.toFixed(2)}</div>
        </div>
        }


        <div className="row">
          <hr/>
          <div className="col-md-12"><b>Profitability</b></div>
          <hr/>
        </div>

        {Math.abs(pm) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Net Profit Margin (PM)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="pm">{pm.toFixed(2)}</div>
        </div>
        }

        {Math.abs(om) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Operating Profit Margin (OM)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="om">{om.toFixed(2)}</div>
        </div>
        }

        {Math.abs(gpm) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Gross Profit Margin (GPM)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="gpm">{gpm.toFixed(2)}</div>
        </div>
        }

        {Math.abs(bep) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Basic Earning Power (BEP)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="bep">{bep.toFixed(2)}</div>
        </div>
        }

        {Math.abs(roa) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Return on Assets (ROA)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="roa">{roa.toFixed(2)}</div>
        </div>
        }

        {Math.abs(currentRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Return on Equity (ROE)</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right" id="roe">{roe.toFixed(2)}</div>
        </div>
        }
      </div>
    );
  }
});

var RatioAnalysis = React.createClass({
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
      <h3>Ratio Analysis</h3>
      <h3 id="date">{today}</h3>
      <RatioAnalysisTable accounts={this.state.accounts} />
      </div>
    );
  }
});

if (document.getElementById('RatioAnalysis') != null) {
  ReactDOM.render(<RatioAnalysis/>, document.getElementById('RatioAnalysis'));
}