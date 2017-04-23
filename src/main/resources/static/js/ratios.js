var RatioAnalysisTable = React.createClass({
  currentRatioColor: function(){
    var cRatio = document.getElementById("currentRatio");
    var test = document.getElementById("currentRatio");
    if(cRatio.textContent < 5){
        cRatio.style.color = "red";
    }else if (cRatio.textContent > 6){
        cRatio.style.color = "green";
    }else{
        cRatio.style.color = "#efd300";
    }
  },
  quickRatioColor: function(){
    var qRatio = document.getElementById("quickRatio");
    if(qRatio === null){
        return;
    }
    else if(qRatio.textContent < 5){
      qRatio.style.color = "red";
    }else if (qRatio.textContent > 6){
      qRatio.style.color = "green";
    }else{
      qRatio.style.color = "#efd300";
    }
  },
  invWorkingCapColor: function(){
    var workingCap = document.getElementById("invWorkingCap");
    if(workingCap === null){
        return;
    }
    else if(workingCap.textContent < 5){
        workingCap.style.color = "red";
    }else if (workingCap.textContent > 6){
        workingCap.style.color = "green";
    }else{
        workingCap.style.color = "#efd300";
    }
  },
  invTurnoverColor: function(){
    var invTurnover = document.getElementById("invTurnover");
    if(invTurnover === null){
        return;
    }
    else if(invTurnover.textContent < 5){
      invTurnover.style.color = "red";
    }else if (invTurnover.textContent > 6){
      invTurnover.style.color = "green";
    }else{
      invTurnover.style.color = "#efd300";
    }
  },
  dsoColor: function(){
    var dso = document.getElementById("dso");
    if(dso === null){
        return;
    }
    else if(dso.textContent < 5){
      dso.style.color = "red";
    }else if (dso.textContent > 6){
      dso.style.color = "green";
    }else{
      dso.style.color = "#efd300";
    }
  },
  fixedAssetColor: function(){
    var fixedAsset = document.getElementById("fixedAsset");
    if(fixedAsset === null){
        return;
    }else if(fixedAsset.textContent < 5){
        fixedAsset.style.color = "red";
    }else if (fixedAsset.textContent > 6){
        fixedAsset.style.color = "green";
    }else{
        fixedAsset.style.color = "#efd300";
    }
  },
  totalAssetColor: function(){
    var totalAsset = document.getElementById("totalAsset");
    if(totalAsset === null){
        return;
    }else if(totalAsset.textContent < 5){
        totalAsset.style.color = "red";
    }else if (totalAsset.textContent > 6){
        totalAsset.style.color = "green";
    }else{
        totalAsset.style.color = "#efd300";
    }
  },
  debtRatioColor: function(){
    var debtRatio = document.getElementById("debtRatio");
    if(debtRatio === null){
        return;
    }
    else if(debtRatio.textContent < 5){
        debtRatio.style.color = "red";
    }else if (debtRatio.textContent > 6){
        debtRatio.style.color = "green";
    }else{
        debtRatio.style.color = "#efd300";
    }
  },
  longDebtEquityColor: function(){
    var longDebtEquity = document.getElementById("longDebtEquity");
    if(longDebtEquity === null){
        return;
    }
    else if(longDebtEquity.textContent < 5){
        longDebtEquity.style.color = "red";
    }else if (longDebtEquity.textContent > 6){
        longDebtEquity.style.color = "green";
    }else{
        longDebtEquity.style.color = "#efd300";
    }
  },
  tieColor: function(){
    var tie = document.getElementById("tie");
    if(tie === null){
        return;
    }
    else if(tie.textContent < 5){
      tie.style.color = "red";
    }else if (tie.textContent > 6){
      tie.style.color = "green";
    }else{
      tie.style.color = "#efd300";
    }
  },
  ecColor: function(){
     var ec = document.getElementById("ec");
    if(ec === null){
        return;
    }
    else if(ec.textContent < 5){
      ec.style.color = "red";
    }else if (ec.textContent > 6){
      ec.style.color = "green";
    }else{
      ec.style.color = "#efd300";
    }
  },
  pmColor: function(){
    var pm = document.getElementById("pm");
    if(pm === null){
        return;
    }
    else if(pm.textContent < 5){
      pm.style.color = "red";
    }else if (pm.textContent > 6){
      pm.style.color = "green";
    }else{
      pm.style.color = "#efd300";
    }
  },
  gpmColor: function(){
    var gpm = document.getElementById("gpm");
    if(gpm === null){
        return;
    }
    else if(gpm.textContent < 5){
      gpm.style.color = "red";
    }else if (gpm.textContent > 6){
      gpm.style.color = "green";
    }else{
      gpm.style.color = "#efd300";
    }
  },
  omColor: function(){
    var om = document.getElementById("om");
    if(om === null){
        return;
    }
    else if(om.textContent < 5){
      om.style.color = "red";
    }else if (om.textContent > 6){
      om.style.color = "green";
    }else{
      om.style.color = "#efd300";
    }
  },
  bepColor: function(){
    var bep = document.getElementById("bep");
    if(bep === null){
        return;
    }
    else if(bep.textContent < 5){
      bep.style.color = "red";
    }else if (bep.textContent > 6){
      bep.style.color = "green";
    }else{
      bep.style.color = "#efd300";
    }
  },
  roaColor: function(){
    var roa = document.getElementById("roa");
    if(roa === null){
        return;
    }
    else if(roa.textContent < 5){
      roa.style.color = "red";
    }else if (roa.textContent > 6){
      roa.style.color = "green";
    }else{
      roa.style.color = "#efd300";
    }
  },
  roeColor: function(){
    var roe = document.getElementById("roe");
    if(roe === null){
        return;
    }
    else if(roe.textContent < 5){
      roe.style.color = "red";
    }else if (roe.textContent > 6){
      roe.style.color = "green";
    }else{
      roe.style.color = "#efd300";
    }
  },
  interestEarnedColor: function(){
    var interestEarned = document.getElementById("interestEarned");
    if(interestEarned === null){
        return;
    }
    else if(interestEarned.textContent < 5){
      interestEarned.style.color = "red";
    }else if (interestEarned.textContent > 6){
      interestEarned.style.color = "green";
    }else{
      interestEarned.style.color = "#efd300";
    }
  },
  componentDidUpdate: function(){
    this.currentRatioColor();
    this.quickRatioColor();
    this.debtRatioColor();
    this.longDebtEquityColor();
    this.invWorkingCapColor();
    this.bepColor();
    this.invTurnoverColor();
    this.totalAssetColor();
    this.fixedAssetColor();
    this.dsoColor();
    this.roaColor();
    this.roeColor();
    this.gpmColor();
    this.omColor();
    this.pmColor();
    this.ecColor();
    this.tieColor();
    this.interestEarnedColor();
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
          <div className="col-md-2 text-right" id="currentRatio">{currentRatio.toFixed(2)}</div>
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
