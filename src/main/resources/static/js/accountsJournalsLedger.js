var Account = React.createClass({
    propTypes: {
            account: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <option value={this.props.account.publicId}>{this.props.account.code} - {this.props.account.name}</option>
        );
    }
});

var AccountSelect = React.createClass({
    propTypes: {
          accounts: React.PropTypes.array
    },
    render: function() {
        var accounts = [];
        this.props.accounts.forEach(function(account) {
            if (account.active != null) {
                //called from journalizing
                if (account.active) {
                    accounts.push(<Account account={account} key={account.name}/>);
                }
            } else {
                //called from chart of account NOTE: this may change if we ever make
                //chart of accounts with the ability to be disabled
                accounts.push(<Account account={account} key={account.name}/>);
            }
        });
        var id = "searchableCombo" + this.props.comboId;
        return (
            <select className="form-control" id={id} name="selectAccount" data-live-search="true" value={this.props.id} onChange={this.props.onChange}>
                {accounts}
            </select>
        );
    },
    componentDidUpdate: function(){
      this.registerSelectPicker();
    },
    componentDidMount: function(){
      this.registerSelectPicker();
    },
    registerSelectPicker: function () {
      var id = "#searchableCombo" + this.props.comboId;
      if (this.props.accounts.length > 0) {
        $(id).selectpicker({
          liveSearch: true,
          maxOptions: 1
        });
      }
    }
});

var AccountRow = React.createClass({

    getInitialState: function() {

        return { active: this.props.account.active,
                 balance: this.props.account.balance,
                 comment: this.props.account.comment,
                 canDeactivate: this.props.account.canDeactivate,
                 beforeEditComment: '',
                 editing: false};
    },
    componentDidMount: function () {
        this.formatBalance();
    },
    formatBalance: function(number) {
      //This is used to format the initial balance as a number
      var formattedBalance = this.state.balance;
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
    handleEditConfirm: function() {
        this.setState({
            editing: false
        });
        var self = this;
        $.ajax({
            url: "http://localhost:8080/editAccount",
            type: "POST",
            data: {
               name: this.props.account.name,
               code: this.props.account.code,
               type: this.props.account.type,
               mGroup: this.props.account.mGroup,
               leftNormalSide: this.props.account.leftNormalSide,
               balance: this.state.balance,
               comment: this.state.comment,
               priority: this.props.account.priority,
               active: this.state.active
            },
            success: function() {
                self.props.loadAccountsFromServer();
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully deactivated account");
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },
    handleDeactivate: function() {
        var self = this;
        self.setState({
            active: false
        });
        $.ajax({
            url: "http://localhost:8080/editAccount",
            type: "POST",
            data: {
               name: this.props.account.name,
               code: this.props.account.code,
               type: this.props.account.type,
               mGroup: this.props.account.mGroup,
               leftNormalSide: this.props.account.leftNormalSide,
               balance: this.state.balance,
               comment: this.props.account.comment,
               priority: this.props.account.priority,
               active: false
            },
            success: function() {
                self.props.loadAccountsFromServer();
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully deactivated account");
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },
    handleActivate: function() {
        var self = this;
        self.setState({
            active: true
        });
        $.ajax({
            url: "http://localhost:8080/editAccount",
            type: "POST",
            data: {
               name: this.props.account.name,
               code: this.props.account.code,
               type: this.props.account.type,
               mGroup: this.props.account.mGroup,
               leftNormalSide: this.props.account.leftNormalSide,
               balance: this.state.balance,
               comment: this.props.account.comment,
               priority: this.props.account.priority,
               active: true
            },
            success: function() {
                self.props.loadAccountsFromServer();
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully activated account");
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },
    handleEdit: function() {
        var self = this;
        this.setState({
            editing: true,
            beforeEditComment: self.state.comment
        });
    },
    handleEditCancel: function() {
        var self = this;
        this.setState({
            editing: false,
            comment: self.state.beforeEditComment
        });
    },
    updateAccountAmount: function(evt) {
        this.setState({
            balance: evt.target.value
        });
    },
    updateAccountComment: function(evt) {
        this.setState({
            comment: evt.target.value
        });
    },
    render: function() {
        return (
        <div className="row">
             <div className={this.state.active ? "thumbnail" : "thumbnail nonactive"}>
                <h3>{this.props.account.code} - {this.props.account.name}</h3>
                <hr />
                <div className="caption">
                  <div className="row">
                      <div className="col-md-4"><h4>Type: <b>{this.props.account.type}</b></h4></div> 
                      <div className="col-md-4"><h4>Sub-Group: <b>{this.props.account.mGroup}</b></h4></div> 
                      <div className="col-md-4"><h4>Active: <b>{this.props.account.active ? "True" : "False"}</b></h4></div>
                  </div>
                   <div className="row">
                        <div className="col-md-4"><h4>Priority: <b>{this.props.account.priority}</b></h4></div> 
                        <div className="col-md-4"><h4>Normal Side: <b>{this.props.account.leftNormalSide ? "Left" : "Right"}</b></h4></div>
                        <div className="col-md-4"><h4>Added On: <b>{this.props.account.addedOn}</b></h4></div> 
                   </div>
                   <div className="row">
                      <div className="col-md-4"><h4>Added by: <b>{this.props.account.addedByUsername}</b></h4></div> 
                      <div className="col-md-4"><h4>Balance: <b>{this.state.balance}</b></h4></div>
                      {this.state.editing ? ( 
                          <div className="col-md-4"><textarea type="text" className="form-control" onChange={this.updateAccountComment} placeholder="Comments" value={this.state.comment} /></div>
                        ) : (
                           <div className="col-md-4 wrap-words"><h4>Comments: <b>{this.props.account.comment}</b></h4></div> 
                        )}
                    </div>
                  <hr />
                  <div className="row">
                       <div className="col-md-4"></div>
                        <div className="col-md-4">  
                            {this.state.editing ? ( 
                                  <div>
                                  <button className={this.state.active ? "btn btn-success accountOptions" : "btn btn-success accountOptions disabled"} onClick={this.handleEditConfirm}> Confirm Changes</button>
                                  <button className="btn btn-danger accountOptions" onClick={this.handleEditCancel}> Discard Changes</button>
                                  </div> 
                            ) : (
                                  <button className={this.state.active ? "btn btn-warning accountOptions" : "btn btn-warning accountOptions disabled"} onClick={this.handleEdit}> Edit Comment</button> 
                             )}
                            {this.state.active ? ( 
                              this.state.canDeactivate ? (
                                <button className={this.state.editing ? "btn btn-danger accountOptions disabled hidden" : "btn btn-danger accountOptions"} onClick={this.handleDeactivate}> Deactivate</button> 
                              ) : (
                                <button className={this.state.editing ? "btn btn-danger accountOptions disabled hidden" : "btn btn-danger accountOptions disabled"} onClick={this.handleDeactivate}> Deactivate</button> 
                              )
                             ) : ( 
                                  <button className={this.state.editing ? "btn btn-success accountOptions disabled" : "btn btn-success accountOptions"} onClick={this.handleActivate}> Activate</button> 
                            )} 
                        </div>
                         <div className="col-md-4"> </div>
                    </div>
                </div>
              </div>
        </div>
        );
    }
});

var AccountsTable = React.createClass({
    propTypes: {
            accounts: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var rows = [];
        this.props.accounts.forEach(function(account) {
            rows.push(<AccountRow account={account} key={account.name} loadAccountsFromServer={self.props.loadAccountsFromServer}/>);
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});


var AllAccounts = React.createClass({

    getInitialState: function() {
            return {ChartOfAccounts: [],
                    accounts: [],
                    id: 1, //defaulting to 1 so that if the 1st combobox is left blank the default one is chosen
                    code: 0,
                    name: '',
                    type: '',
                    mGroup: '',
                    leftNormalSide: '',
                    initialBalance: 0,
                    comment: '',
                    priority: 0};
    },
   componentDidMount: function () {
        this.loadChartOfAccountsFromServer();
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
    loadChartOfAccountsFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/chartOfAccountses"
        }).then(function (data) {
            self.setState({ChartOfAccounts: data._embedded.chartOfAccountses});
        });
    },
    loadAccountInformationById: function() {
        var id = this.state.id;
        var username = document.getElementById("username").innerText;

        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/chartOfAccountses/"+id
        }).then(function (data) {
            self.setState(
                {code: data.code,
                 name: data.name,
                 type: data.type,
                 mGroup: data.mGroup,
                 leftNormalSide: data.leftNormalSide,
                 priority: data.priority,
                 username: username
                 },
                function () {
                    /**
                       this method calls handleAddAccount because
                        we need it to be called before the other one.
                        React does stuff asynchronously and without doing it this way
                        the state wasn't being set correctly
                    */
                    this.handleAddAccount();
                }
            )
        });
    },
    handleAddAccount: function() {
        var self = this;

        $.ajax({
            url: "http://localhost:8080/addAccount",
            type: "POST",
            data: {

                   name: this.state.name,
                   code: this.state.code,
                   type: this.state.type,
                   mGroup: this.state.mGroup,
                   leftNormalSide: this.state.leftNormalSide,
                   balance: this.state.initialBalance,
                   comment: this.state.comment,
                   priority: this.state.priority,
                   username: this.state.username

                   },
            success: function() {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully Added Account!");
                self.loadAccountsFromServer();
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },

    updateAccountId: function(evt) {
        this.setState({
            id: evt.target.value
        });
    },
    updateAccountAmount: function(evt) {
        this.setState({
            initialBalance: evt.target.value
        });
    },
    updateAccountComment: function(evt) {
        this.setState({
            comment: evt.target.value
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <div className="container">
                    <div className="row header-row">
                        <div className="col-md-6"><h5>Account Name</h5></div>
                          <div className="col-md-4"><h5>Comments</h5></div>
                          <div className="col-md-2"></div>
                        </div>
                     <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <AccountSelect onChange={this.updateAccountId} accounts={this.state.ChartOfAccounts} id={this.state.id} comboId={"main"}/>
                        </div>
                        <div className="col-md-4">
                              <textarea type="text" className="form-control" onChange={this.updateAccountComment} aria-label="Comment"/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" onClick={this.loadAccountInformationById}>Add Account</button>
                        </div>
                    </div>
                    <hr />
                    <div className="faq">
                        <input type="search" placeholder="search" id="searchBar"/>
                        <div className="faq_not_found">
                            <p>No Matches were found</p>
                        </div>
                        <AccountsTable accounts={this.state.accounts} loadAccountsFromServer={this.loadAccountsFromServer} />
                    </div>
                </div>
            </div>
        );
    }
});

if (document.getElementById('AllAccounts') != null) {
    ReactDOM.render(<AllAccounts />, document.getElementById('AllAccounts'));
}


var ChartOfAccountRow = React.createClass({

    getInitialState: function() {

        return { editing: false,
                 id: this.props.account.publicId,
                 name: this.props.account.name,
                 code: this.props.account.code,
                 type: this.props.account.type,
                 priority: this.props.account.priority,
                 mGroup: this.props.account.mGroup,
                 nameBeforeEdit: '',
                 codeBeforeEdit: '',
                 typeBeforeEdit: '',
                 priorityBeforeEdit: '',
                 mGroupBeforeEdit: ''};
    },
    handleEditConfirm: function() {
        this.setState({
            editing: false
        });
        var self = this;
        $.ajax({
            url: "http://localhost:8080/chartOfAccounts/editChartOfAccount",
            type: "POST",
            data: {
               id: this.state.id,
               name: this.state.name,
               code: this.state.code,
               type: this.state.type,
               mGroup: this.state.mGroup,
               priority: this.state.priority
            },
            success: function() {
                self.props.loadChartOfAccountsFromServer();
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully Edited account");
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },
    handleEdit: function() {
        var self = this;
        this.setState({
            editing: true,
            nameBeforeEdit: self.state.name,
            codeBeforeEdit: self.state.code,
            typeBeforeEdit: self.state.type,
            priorityBeforeEdit: self.state.priority,
            mGroupBeforeEdit: self.state.mGroup
        });
    },
    handleEditCancel: function() {
        var self = this;
        this.setState({
            editing: false,
            name: self.state.nameBeforeEdit,
            code: self.state.codeBeforeEdit,
            type: self.state.typeBeforeEdit,
            priority: self.state.priorityBeforeEdit,
            mGroup: self.state.mGroupBeforeEdit
        });
    },
    updateName: function(evt) {
        this.setState({
            name: evt.target.value
        });
    },
    updateCode: function(evt) {
        this.setState({
            code: evt.target.value
        });
    },
    updateType: function(evt) {
        this.setState({
            type: evt.target.value
        });
    },
    updateLeftNormalSide: function(evt) {
        this.setState({
            leftNormalSide: evt.target.value
        });
    },
    updatePriority: function(evt) {
        this.setState({
            priority: evt.target.value
        });
    },
    updateMGroup: function(evt) {
        this.setState({
            mGroup: evt.target.value
        });
    },
    render: function() {
        if (this.state.editing) {
            return (
                    <div className="row row-striped">
                        <div className="col-md-3">
                            <div className="input-group">
                              <label>Account Name:</label>
                              <input type="text" className="form-control" value={this.state.name} onChange={this.updateName} placeholder="Account Name"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                              <label>Account Code:</label>
                              <input type="number" className="form-control" value={this.state.code} onChange={this.updateCode} placeholder="Account Code"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                              <label>Account Type:</label>
                              <select className="form-control" name="selectAccountType" value={this.state.type} onChange={this.updateType}>
                                  <option value="Asset">Asset</option>
                                  <option value="Liabilities">Liabilities</option>
                                  <option value="Owner's Equity">Owner's Equity</option>
                                  <option value="Revenues">Revenues</option>
                                  <option value="Operating Expenses">Operating Expenses</option>
                              </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                              <label>Priority:</label>
                              <input type="number" className="form-control" value={this.state.priority} onChange={this.updatePriority}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group">
                              <label>Group:</label>
                              <input type="text" className="form-control" value={this.state.mGroup} onChange={this.updateMGroup}/>
                            </div>
                        </div>
                        <hr />
                        <hr />
                         <div className="col-md-6">  
                             <button className="btn btn-success pull-right" onClick={this.handleEditConfirm}> Confirm Changes</button> 
                         </div>
                         <div className="col-md-6">  
                              <button className="btn btn-danger" onClick={this.handleEditCancel}> Discard Changes</button> 
                          </div>
                    </div>
            );
        } else {
            return (
                    <div className="row row-striped">
                      <div className="col-md-3"><h6>Name: <b>{this.props.account.name}</b></h6></div> 
                      <div className="col-md-2"><h6>Code: <b>{this.props.account.code}</b></h6></div> 
                      <div className="col-md-2"><h6>Type: <b>{this.props.account.type}</b></h6></div> 
                      <div className="col-md-2"><h6>Priority: <b>{this.props.account.priority}</b></h6></div> 
                      <div className="col-md-2"><h6>Sub-Group: <b>{this.props.account.mGroup}</b></h6></div> 
                       <div className="col-md-1">  
                         <button className="btn btn-warning accountOptions" onClick={this.handleEdit}> Edit</button> 
                      </div>
                    </div>
            );
        }
    }
});



var ChartOfAccountsTable = React.createClass({
    propTypes: {
            chartOfAccounts: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var rows = [];
        this.props.chartOfAccounts.forEach(function(account) {
            rows.push(<ChartOfAccountRow account={account} key={account.name} loadChartOfAccountsFromServer={self.props.loadChartOfAccountsFromServer}/>);
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});

var AllChartOfAccounts = React.createClass({

    getInitialState: function() {
            return {ChartOfAccounts: [],
                    code: '',
                    name: '',
                    type: 'Asset',
                    priority: '',
                    mGroup: ''
                    };
    },
   componentDidMount: function () {
        this.loadChartOfAccountsFromServer();
    },
    loadChartOfAccountsFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/chartOfAccountses"
        }).then(function (data) {
            self.setState({ChartOfAccounts: data._embedded.chartOfAccountses});
        });
    },
    handleAddAccount: function() {
        var self = this;

        $.ajax({
            url: "http://localhost:8080/chartOfAccounts/addChartOfAccount",
            type: "POST",
            data: {
                   name: this.state.name,
                   code: this.state.code,
                   type: this.state.type,
                   mGroup: this.state.mGroup,
                   priority: this.state.priority
                   },
            success: function() {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully Added Account!");
                self.loadChartOfAccountsFromServer();
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },
    updateName: function(evt) {
        this.setState({
            name: evt.target.value
        });
    },
    updateCode: function(evt) {
        this.setState({
            code: evt.target.value
        });
    },
    updateType: function(evt) {
        this.setState({
            type: evt.target.value
        });
    },
    updateLeftNormalSide: function(evt) {
        this.setState({
            leftNormalSide: evt.target.value
        });
    },
    updatePriority: function(evt) {
        this.setState({
            priority: evt.target.value
        });
    },
    updateMGroup: function(evt) {
        this.setState({
            mGroup: evt.target.value
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <div className="container">
                    <div className="well well-lg">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="input-group">
                                  <label>Account Name:</label>
                                  <input type="text" className="form-control" value={this.state.name} onChange={this.updateName} placeholder="Account Name"/>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="input-group">
                                  <label>Account Code:</label>
                                  <input type="number" className="form-control" value={this.state.code} onChange={this.updateCode} placeholder="Account Code"/>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="input-group">
                                  <label>Account Type:</label>
                                  <select className="form-control" name="selectAccountType" value={this.state.type} onChange={this.updateType}>
                                      <option value="Asset">Asset</option>
                                      <option value="Liabilities">Liabilities</option>
                                      <option value="Owner's Equity">Owner's Equity</option>
                                      <option value="Revenues">Revenues</option>
                                      <option value="Operating Expenses">Operating Expenses</option>
                                  </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="input-group">
                                  <label>Priority:</label>
                                  <input type="number" className="form-control" value={this.state.priority} onChange={this.updatePriority}/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                  <label>Group:</label>
                                  <input type="text" className="form-control" value={this.state.mGroup} onChange={this.updateMGroup}/>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <button className="btn btn-primary pull-right" onClick={this.handleAddAccount}>Add Account</button>
                        </div>
                    </div>
                    <hr />
                    <div className="faq">
                        <input type="search" placeholder="search" id="searchBar"/>
                        <div className="faq_not_found">
                            <p>No Matches were found</p>
                        </div>
                        <ChartOfAccountsTable chartOfAccounts={this.state.ChartOfAccounts} loadChartOfAccountsFromServer={this.loadChartOfAccountsFromServer} />
                    </div>
                </div>
            </div>
        );
    }
});

if (document.getElementById('AllChartOfAccounts') != null) {
  ReactDOM.render(<AllChartOfAccounts />, document.getElementById('AllChartOfAccounts'));
}

var JournalDebitRow = React.createClass({
  getInitialState: function() {
    return {
      index: this.props.index,
      amount: this.props.JournalDebit.amount
    };
  },
  componentDidMount: function() {
    //This is used to format the initial balance as a number
    var formattedAmount = this.state.amount;

    if (!(/^(\d+\.\d\d)$/.test(formattedAmount))) {
      //number needs formatting
      formattedAmount = formattedAmount.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedAmount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedAmount = parts.join(".");

    this.setState({
        amount: formattedAmount
    });
  },
  redirectToRemove: function(evt) {
    this.props.removeDebitJournalEntry(this.state.index);
  },
  render: function() {
    return (
      <div className="row">
          <div className="row">
            <div className="col-md-4 text-left"><h4>{this.props.JournalDebit.accountCode} - {this.props.JournalDebit.accountName}</h4></div> 
            <div className="col-md-4 text-right"><h4>$ {this.state.amount}</h4></div> 
            <div className="col-md-2"></div> 
            <div className="col-md-2">
               <button className="btn btn-danger" onClick={this.redirectToRemove} value={this.state.index}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
            </div> 
          </div>
      </div>
    );
  }
});

var JournalCreditRow = React.createClass({
  getInitialState: function() {
    return {
      index: this.props.index,
      amount: this.props.JournalCredit.amount
    };
  },
  componentDidMount: function() {
    //This is used to format the initial balance as a number
    var formattedAmount = this.state.amount;

    if (!(/^(\d+\.\d\d)$/.test(formattedAmount))) {
      //number needs formatting
      formattedAmount = formattedAmount.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedAmount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedAmount = parts.join(".");

    this.setState({
        amount: formattedAmount
    });
  },
  redirectToRemove: function(evt) {
    this.props.removeCreditJournalEntry(this.state.index);
  },
  render: function() {
    return (
      <div className="row">
          <div className="row">
            <div className="col-md-2"></div> 
            <div className="col-md-4 text-left"><h4>{this.props.JournalCredit.accountCode} - {this.props.JournalCredit.accountName}</h4></div> 
            <div className="col-md-4 text-right"><h4>$ {this.state.amount}</h4></div> 
            <div className="col-md-2">
              <button className="btn btn-danger" onClick={this.redirectToRemove} value={this.state.index}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
            </div> 
          </div>
      </div>
    );
  }
});

var JournalsDebitTable = React.createClass({
    propTypes: {
            JournalsDebit: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var rows = [];
        var index = 1;
        this.props.JournalsDebit.forEach(function(JournalDebit) {
                rows.push(<JournalDebitRow removeDebitJournalEntry={self.props.removeDebitJournalEntry} JournalDebit={JournalDebit} key={index} index={index}/>);
                index++;
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});

var JournalsCreditTable = React.createClass({
    propTypes: {
            JournalsCredit: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var rows = [];
        var index = 1;
        this.props.JournalsCredit.forEach(function(JournalCredit) {
            rows.push(<JournalCreditRow removeCreditJournalEntry={self.props.removeCreditJournalEntry} JournalCredit={JournalCredit} key={index} index={index}/>);
            index++;
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});

var SupportingDocuments = React.createClass({

  render: function() {
    var self = this;
    var files = [];
    var json = $.parseJSON(this.props.files);

    for (var i = 0; i < json.length; i++) {
      files.push(<li key={i}><a href={json[i]['href']} download={json[i]['download']}>{json[i]['download']}</a></li>)
    }
    return (
        <ul>
          {files}
        </ul>
    );
  }
});

var JournalRow = React.createClass({
    getInitialState: function() {

      //handle error in console for null values
      var rejectionReason = this.props.rejectionReason;
      if (rejectionReason === null) {
        rejectionReason = ""
      }

      return {rows: [],
              posted: this.props.posted,
              rejected: this.props.rejected,
              rejectionReason: rejectionReason
              };
    },
   componentDidMount: function () {
        this.loadTransactions();
    },
    loadTransactions: function() {
        var self = this;
        var tempRow = [];
        var index = 0;
        var firstCredit = true;
        $.ajax({
            url: self.props.transactionsUrl
        }).then(function (data) {
           data._embedded.transactions.forEach(function(transaction) {
                tempRow.push(<TransactionRow index={index} firstCredit={firstCredit} transaction={transaction} key={index++}/>);
               if (transaction.debit === false) {
                 firstCredit = false;
               }
           });
           self.setState({
                rows: tempRow
           });
        });
    },
    postJournalEntry: function() {
        var username = document.getElementById("username").innerText;
        var self = this;
        $.ajax({
            url: "http://localhost:8080/journals/postJournalEntry",
            type: "POST",
            data: {
                   rows: JSON.stringify(this.state.rows),
                   journalId: this.props.journalEntryId,
                   username: username
                   },
            success: function() {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully Posted Journal Entry!");
                self.props.loadJournalEntriesFromServer();
                self.setState({
                    posted: true
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
    },
    updateRejectionReason: function(evt) {
      this.setState({
        rejectionReason: evt.target.value
      });
    },
    showRejectionPrompt: function() {
      var id = "#myRejectionModal" + this.props.journalEntryId;
      $(id).modal("show");
    },
    handleReject: function() {
      //hide modal because submit was clicked
      var id = "#myRejectionModal" + this.props.journalEntryId;
      $(id).modal("hide");

      var self = this;
      $.ajax({
          url: "http://localhost:8080/journals/rejectJournalEntry",
          type: "POST",
          data: {
            journalId: this.props.journalEntryId,
            rejectionReason: this.state.rejectionReason
          },
          success: function() {
            toastr.options = {
                "debug": false,
                "positionClass": "toast-top-center",
                "onclick": null,
                "fadeIn": 300,
                "fadeOut": 100,
                "timeOut": 500,
                "extendedTimeOut": 500
            }
            toastr.success("Successfully Rejected Journal Entry!");
            self.props.loadJournalEntriesFromServer();
            self.setState({
                rejected: true
            });
          },
          error: function(xhr, ajaxOptions, thrownError) {
              toastr.options = {
                  "debug": false,
                  "positionClass": "toast-top-center",
                  "onclick": null,
                  "fadeIn": 300,
                  "fadeOut": 100,
                  "timeOut": 500,
                  "extendedTimeOut": 500
              }
              toastr.error("Not Authorized");
          }
      });
    },
    render: function() {
      var date = this.props.addedOn.split(" ")[0];
      if (this.state.rejected === true) {
        return (
          <div className="well">
            <h4>
              <span className="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>
              Journal Entry #{this.props.journalEntryId} ({date})
              <span className="text-danger"> (REJECTED)</span>
            </h4>
            {this.state.rows}
            <hr />
            <div className="row">
              <div className="col-md-6">
                <label>Comment:</label>
                <p>{this.props.comment}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-center">
                <h5 className="pull-left"><b>Reason for rejection:</b> <span className="text-danger">{this.state.rejectionReason}</span></h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Supporting Documents:</label>
                <SupportingDocuments files={this.props.files}/>
              </div>
            </div>
          </div>
        );
      } else {
        var id = "myRejectionModal" + this.props.journalEntryId;
        return (
          <div className="well">
            <div id={id} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Reason For Rejection</h4>
                  </div>
                  <div className="modal-body">
                    <textarea type="search" className="form-control" onChange={this.updateRejectionReason} value={this.state.rejectionReason}/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-success" onClick={this.handleReject}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
            <h4>
              {this.state.posted &&
                <span className="glyphicon glyphicon-ok text-success" aria-hidden="true"></span>
              }
              Journal Entry #{this.props.journalEntryId} ({date})
              {this.state.posted &&
                <span className="text-success"> (APPROVED)</span>
              }
            </h4>
            {this.state.rows}
            <hr />
            <div className="row">
              <div className="col-md-3">
                <label>Comment:</label>
                <p>{this.props.comment}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label>Supporting Documents:</label>
                <SupportingDocuments files={this.props.files}/>
              </div>


              {this.props.canPost &&
                <div className="col-md-2">
                  {!this.state.posted &&
                    <button className="btn btn-success" onClick={this.postJournalEntry}>Approve</button>
                  }
                </div>
              }
              {this.props.canPost &&
                <div className="col-md-2">
                  {!this.state.posted &&
                    <button className="btn btn-danger" onClick={this.showRejectionPrompt}>Reject</button>
                  }
                </div>
              }
            </div>
          </div>
        );
      }

    }
})

var TransactionRow = React.createClass({
  getInitialState: function() {
    var formattedAmount = this.props.transaction.amount;
    if (!(/^(\d+\.\d\d)$/.test(formattedAmount))) {
      //number needs formatting
      formattedAmount = formattedAmount.toFixed(2);
    }
    //Add commas to thousands place i.e. 1000000.00 = 1,000,000.00
    var parts = formattedAmount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedAmount = parts.join(".");

    return {
      amount: formattedAmount,
      journalEntry: ''
    };
  },
  loadJournalEntry: function() {
    var self = this;
    $.ajax({
        url: "http://localhost:8080/api/journalEntries/"+this.props.transaction.journalEntryId
    }).then(function (data) {
      self.setState({journalEntry: data});
    });
  },
  componentDidMount: function() {
    this.loadJournalEntry()
  },
  showJournalEntry: function() {
    var id = "#journalEntry" + this.state.journalEntry.publicId;
    $(id).modal("show");
  },
  render: function() {
    if (this.props.ledger) {
      if (this.state.journalEntry !== '') {
        var addedOnDate = this.state.journalEntry.addedOn;
        addedOnDate = addedOnDate.split(' ')[0];
        var id = "journalEntry" + this.state.journalEntry.publicId;
        var transactionsUrl = this.state.journalEntry._links.transaction.href;
        return (
          <div className="row row-striped">
            <div className="row">
              <div className="col-md-1 text-center"><a onClick={this.showJournalEntry}>{this.state.journalEntry.publicId}</a></div> 
              <div className="col-md-2 text-center">{addedOnDate}</div> 
              <div className="col-md-1 text-center">{this.props.transaction.publicId}</div> 
              <div className="col-md-1">{this.props.transaction.addedByUsername}</div> 
              {!this.props.transaction.debit && <div className="col-md-1"></div> }
              <div className="col-md-2">{this.props.transaction.accountName}</div> 
              {!this.props.transaction.debit && <div className="col-md-1"></div>  }
              <div className="col-md-2 wrap-words text-right">{this.props.index === 0 || ( this.props.firstCredit && !this.props.transaction.debit)  ? '$' : ''} {this.state.amount}</div>
              {this.props.transaction.debit ? (
                <div className="col-md-4"></div> 
              ) : (
                <div className="col-md-2"></div> 
              )}
            </div>
            <div id={id} className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Journal #{this.state.journalEntry.publicId}</h4>
                  </div>
                  <div className="modal-body">
                    <JournalRow journalEntryId={this.state.journalEntry.publicId} addedOn={this.state.journalEntry.addedOn} transactionsUrl={transactionsUrl}
                                posted={this.state.journalEntry.posted} rejected={this.state.journalEntry.rejected} rejectionReason={this.state.journalEntry.rejectionReason}
                                canPost={false} files={this.state.journalEntry.supportingDocsBase64} comment={this.state.journalEntry.comment}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div></div>
        );
      }
    } else {
      return (
        <div className="row row-striped">
          <div className="row">
            <div className="col-md-2 text-center">{this.props.transaction.publicId}</div> 
            <div className="col-md-2">{this.props.transaction.addedByUsername}</div> 
            {!this.props.transaction.debit && <div className="col-md-1"></div> }
            <div className="col-md-2">{this.props.transaction.accountName}</div> 
            {!this.props.transaction.debit && <div className="col-md-1"></div>  }
            <div className="col-md-2 wrap-words text-right">{this.props.index === 0 || (this.props.firstCredit && !this.props.transaction.debit)  ? '$' : ''} {this.state.amount}</div>
            {this.props.transaction.debit ? (
              <div className="col-md-4"></div> 
            ) : (
              <div className="col-md-2"></div> 
            )}
          </div>
        </div>
      );
    }
  }
});

var JournalEntriesTable = React.createClass({
  propTypes: {
      journalEntries: React.PropTypes.array.isRequired
  },
  render: function() {
      var self = this;
      var rows = [];

      this.props.journalEntries.forEach(function(journalEntry) {
          let accountStatus;

          if (journalEntry.posted) {
              accountStatus = "approved"
          } else if (journalEntry.rejected) {
              accountStatus = "rejected"
          } else {
              accountStatus = "new"
          }

          if (self.props.filterJournalStatus === "" || self.props.filterJournalStatus === accountStatus){
              var transactionsUrl = journalEntry._links.transaction.href;
              var id = journalEntry.publicId;
              var addedOn = journalEntry.addedOn;
              var posted = journalEntry.posted;
              var rejected = journalEntry.rejected;
              var rejectionReason = journalEntry.rejectionReason;
              var files = journalEntry.supportingDocsBase64;
              var comment = journalEntry.comment;
              rows.push(<JournalRow journalEntryId={id} addedOn={addedOn} transactionsUrl={transactionsUrl}
                                    posted={posted} rejected={rejected} rejectionReason={rejectionReason} key={id}
                                    canPost={self.props.canPost} files={files} loadJournalEntriesFromServer={self.props.loadJournalEntriesFromServer} comment={comment}/>);
          }
      });
      return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div> 
                    <div className="col-md-2">Added By</div> 
                    <div className="col-md-2">Account</div> 
                    <div className="col-md-2 text-right">Debit</div>
                    <div className="col-md-2 text-right">Credit</div>
                </div>
                <hr />
                {rows}
            </div>
        );
  }
});

var AllJournals = React.createClass({

    getInitialState: function() {
        return {JournalsDebit: [],
                JournalsCredit: [],
                accounts: [],
                transactions: [],
                journalEntries: [],
                debitAmount: 0,
                creditAmount: 0,
                debitAccountID: 1,
                creditAccountID: 1,
                filterJournalStatus: '',
                comment: ''
        };
    },
    componentDidMount: function () {
        this.loadAccountsFromServer();
        this.loadTransactionsFromServer();
        this.loadJournalEntriesFromServer();
    },
    loadAccountsFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/accounts"
        }).then(function (data) {
            self.setState({accounts: data._embedded.accounts});
        });
    },
    loadTransactionsFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/transactions"
        }).then(function (data) {
            self.setState({transactions: data._embedded.transactions});
        });
    },
    loadJournalEntriesFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/journalEntries"
        }).then(function (data) {
            self.setState({journalEntries: data._embedded.journalEntries});
        });
    },
    updateDebitAmount: function(evt) {
        this.setState({
            debitAmount: Number(evt.target.value).toFixed(2)
        });
    },
    updateCreditAmount: function(evt) {
        this.setState({
            creditAmount: Number(evt.target.value).toFixed(2)
        });
    },
    updateDebitAccountID: function(evt) {
        this.setState({
            debitAccountID: evt.target.value
        });
    },
    updateCreditAccountID: function(evt) {
        this.setState({
            creditAccountID: evt.target.value
        });
    },
    updateFilterJournalStatus: function (evt) {
        this.setState({
            filterJournalStatus: evt.target.value
        });
    },
    updateComment: function(evt){
        this.setState({
            comment: evt.target.value
        });
    },
    addDebit: function() {
        var newDebit = {accountName: this.state.accounts[this.state.debitAccountID-1].name,
                        accountCode: this.state.accounts[this.state.debitAccountID-1].code,
                        amount:      this.state.debitAmount,
                        isDebit:     true};
        var self = this;
        this.setState({
            JournalsDebit: self.state.JournalsDebit.concat([newDebit])
        });
    },
    addCredit: function() {
        var newCredit = {accountName: this.state.accounts[this.state.creditAccountID-1].name,
                         accountCode: this.state.accounts[this.state.creditAccountID-1].code,
                         amount:      this.state.creditAmount,
                         isDebit:     false};
        var self = this;
        this.setState({
            JournalsCredit: self.state.JournalsCredit.concat([newCredit])
        });
    },
    removeDebitJournalEntry: function(index) {
        var self = this;
        index--; //index is based in as 1 based. Need to adjust
        this.state.JournalsDebit.splice(index, 1);
        this.setState({
            JournalsDebit: self.state.JournalsDebit
        });
    },
    removeCreditJournalEntry: function(index) {
        var self = this;
        index--; //index is based in as 1 based. Need to adjust
        this.state.JournalsCredit.splice(index, 1);
        this.setState({
            JournalsCredit: self.state.JournalsCredit
        });
    },
    confirmDebitsAndCreditsAreValid: function() {
      var debitTotal = 0;
      var creditTotal = 0;
      var accountsUsed = new Array();


      var isValid = true;
      if (this.state.JournalsDebit.length < 1 || this.state.JournalsCredit.length < 1) {
        toastr.options = {
          "debug": false,
          "positionClass": "toast-top-center",
          "onclick": null,
          "fadeIn": 3000,
          "fadeOut": 1000,
          "timeOut": 5000,
          "extendedTimeOut": 500
        }
        toastr.error("Invalid! You need to have at least 1 debit and 1 credit transaction.");
        isValid = false;
      }

      this.state.JournalsDebit.forEach( function(journalDebit) {
        if (journalDebit.amount <= 0) {
           toastr.options = {
             "debug": false,
             "positionClass": "toast-top-center",
             "onclick": null,
             "fadeIn": 3000,
             "fadeOut": 1000,
             "timeOut": 5000,
             "extendedTimeOut": 500
           }
           toastr.error("Invalid! All amounts must be greater than $0.00.");
           isValid = false;
        }
        if ($.inArray(journalDebit.accountName, accountsUsed) > -1) {
          toastr.options = {
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "fadeIn": 3000,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 500
          }
          toastr.error("Invalid! You can only use the account once.");
          isValid = false;
        } else {
          accountsUsed.push(journalDebit.accountName);
        }
        debitTotal += Number(journalDebit.amount);
      });

      this.state.JournalsCredit.forEach(function(journalCredit) {
        if (journalCredit.amount <= 0) {
          toastr.options = {
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "fadeIn": 3000,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 500
          }
          toastr.error("Invalid! All amounts must be greater than $0.00.");
          isValid = false;
        }
        if ($.inArray(journalCredit.accountName, accountsUsed) > -1) {
          toastr.options = {
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "fadeIn": 3000,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 500
          }
          toastr.error("Invalid! You can only use the account once.");
          isValid = false;
        } else {
          accountsUsed.push(journalCredit.accountName);
        }
        creditTotal += Number(journalCredit.amount);
      });

      if (debitTotal !== creditTotal) {
        toastr.options = {
          "debug": false,
          "positionClass": "toast-top-center",
          "onclick": null,
          "fadeIn": 3000,
          "fadeOut": 1000,
          "timeOut": 5000,
          "extendedTimeOut": 500
        }
        toastr.error("Invalid! Debits and Credits must be equal.");
        isValid = false;
      }

      return isValid;
    },
    addJournalEntry: function() {

        //check to make sure the conditions are valid
        if (!this.confirmDebitsAndCreditsAreValid()) {
          return; //don't perform the submission
        }

        var self = this;
        var username = document.getElementById("username").innerText;

        var accounts = this.state.JournalsDebit.concat(this.state.JournalsCredit);

        var files = [];
        var length = $("#upload-file-info").children("li").length;
        for (var i = 0; i < length; i++) {
          var download = $("#upload-file-info").children("li").eq(i).children("a").eq(0).attr("download");
          var href = $("#upload-file-info").children("li").eq(i).children("a").eq(0).attr("href");
          files[i] = {"download":download, "href":href};
        }

        var comment = this.state.comment;

        $.ajax({
            url: "http://localhost:8080/journals/addJournal",
            type: "POST",
            data: {
               accounts: JSON.stringify(accounts),
               username: username,
               files: JSON.stringify(files),
               comment: comment
            },
            success: function() {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.success("Successfully added Journal Entry");
                $("#upload-file-info").empty(); //clear added files from input field
                self.loadTransactionsFromServer();
                self.loadJournalEntriesFromServer();
                self.setState({
                  comment: ''
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 500
                }
                toastr.error("Not Authorized");
            }
        });
        this.setState({
            JournalsDebit: [],
            JournalsCredit: []
        });

    },
    render: function() {
        var self = this;
        return (
            <div>
                <div className="container">
                    <h1>Add Journal Entries</h1>
                    <div className="well well-lg">
                        <div className="row">
                            <div className="col-md-4">
                                <AccountSelect accounts={this.state.accounts} onChange={this.updateDebitAccountID} id={this.state.debitAccountID} comboId={"debit"}/>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                  <span className="input-group-addon">$</span>
                                  <input type="number" min="0.01" step="0.01" className="form-control" onChange={this.updateDebitAmount} aria-label="Amount"/>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-2">
                                <button className="btn btn-success" onClick={this.addDebit}>Add Debit</button>
                            </div>
                        </div>
                        <hr />
                        { (this.state.JournalsDebit.length > 0) &&
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                                <AccountSelect accounts={this.state.accounts} onChange={this.updateCreditAccountID} id={this.state.creditAccountID} comboId={"credit"}/>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                  <span className="input-group-addon">$</span>
                                  <input type="number" min="0.01" step="0.01" className="form-control" onChange={this.updateCreditAmount} aria-label="Amount"/>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-success" onClick={this.addCredit}>Add Credit</button>
                            </div>
                        </div>
                        }
                    </div>
                    <hr />
                    <div className="well well-lg">
                        <JournalsDebitTable removeDebitJournalEntry={this.removeDebitJournalEntry} JournalsDebit={this.state.JournalsDebit} />
                        <JournalsCreditTable removeCreditJournalEntry={this.removeCreditJournalEntry} JournalsCredit={this.state.JournalsCredit} />
                        <hr />
                        <div className="row">
                            <div className="col-md-5">
                                <label>Comment</label>
                                <textarea type="text" className="form-control" aria-label="Comment" value={this.state.comment} onChange={this.updateComment}></textarea>
                            </div>
                            <div className="col-md-5">
                              <form id="my-file-selector-form">
                                <label className="btn btn-default pull-right" for="my-file-selector">
                                    <input id="my-file-selector" className="hidden" type="file" multiple="multiple" name="uploadfile" accept="*"/>
                                    Upload Supporting Documents
                                </label>
                              </form>
                              <ul id="upload-file-info"></ul>
                            </div>
                            <div className="col-md-2">
                                { (this.state.JournalsDebit.length > 0 || this.state.JournalsCredit.length > 0) ? (
                                    <button className="btn btn-primary" onClick={this.addJournalEntry}>Submit Journal Entry</button>
                                    ) : (
                                    <button className="btn btn-primary disabled">Submit Journal Entry</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h1>All Journal Entries</h1>
                    <hr />
                    <select className="form-control" onChange={this.updateFilterJournalStatus} value={this.state.filterJournalStatus}>
                        <option value="">All</option>
                        <option value="new">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <hr />
                    <div className="faq">
                        <input type="search" placeholder="search" id="searchBar"/>
                        <div className="faq_not_found">
                            <p>No Matches were found</p>
                        </div>
                        <JournalEntriesTable className="Journals" journalEntries={this.state.journalEntries} filterJournalStatus={this.state.filterJournalStatus} />
                    </div>
                </div>
            </div>
        );
    }
});

if (document.getElementById('AllJournals') != null) {
    ReactDOM.render(<AllJournals />, document.getElementById('AllJournals'));
}

var AllJournalsToPost = React.createClass({
  getInitialState: function() {
    return {
      journalEntries: [],
        filterJournalStatus: ""
    };
  },
  componentDidMount: function () {
    this.loadJournalEntriesFromServer();
  },
    updateFilterJournalStatus: function (evt) {
      this.setState({
          filterJournalStatus: evt.target.value
      });
    },
  loadJournalEntriesFromServer: function() {
    var self = this;
    $.ajax({
      url: "http://localhost:8080/api/journalEntries"
    }).then(function (data) {
      self.setState({journalEntries: data._embedded.journalEntries});
    });
  },
  render: function() {
    return (
      <div className="container">
        <h1>Post Journals</h1>
          <hr />
          <select className="form-control" onChange={this.updateFilterJournalStatus} value={this.state.filterJournalStatus}>
              <option value="">All</option>
              <option value="new">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
          </select>
          <hr />
        <div className="faq">
          <input type="search" placeholder="search" id="searchBar"/>
          <div className="faq_not_found">
            <p>No Matches were found</p>
          </div>
          <JournalEntriesTable className="Journals" journalEntries={this.state.journalEntries} canPost={true} filterJournalStatus={this.state.filterJournalStatus} loadJournalEntriesFromServer={this.loadJournalEntriesFromServer} />
        </div>
      </div>
    )
  }
});

if (document.getElementById('AllJournalsToPost') != null) {
    ReactDOM.render(<AllJournalsToPost />, document.getElementById('AllJournalsToPost'));
}

var LedgerTable = React.createClass({
  render: function() {
    var self = this;
    var rows = [];
    var index = 0;
    var firstCredit = true;
    this.props.transactions.forEach(function(transaction) {
      if (Number(self.props.accountId) === transaction.accountId) {

        rows.push(<TransactionRow index={index++} firstCredit={firstCredit} transaction={transaction} key={transaction.publicId} ledger={true}/>);
        if (transaction.debit === false) {
          firstCredit = false;
        }
      }
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-1">Journal ID</div> 
          <div className="col-md-2">Added On</div> 
          <div className="col-md-1">Transaction ID</div> 
          <div className="col-md-1">Added By</div> 
          <div className="col-md-3">Account</div> 
          <div className="col-md-2">Debit</div>
          <div className="col-md-2">Credit</div>
        </div>
        <hr />
        {rows}
      </div>
   );
 }
});


var Ledger = React.createClass({

  getInitialState: function() {
    return {
      journalEntries: [],
      transactions: [],
      accounts: [],
      accountId: 1
    };
  },
  componentDidMount: function () {
    this.loadJournalEntriesFromServer();
    this.loadAccountsFromServer();
  },
  loadJournalEntriesFromServer: function() {
    var self = this;
    $.ajax({
      url: "http://localhost:8080/api/journalEntries"
    }).then(function (data) {
      self.setState({journalEntries: data._embedded.journalEntries});
      self.loadApprovedTransactions();
    });
  },
  loadApprovedTransactions: function() {
    var self = this;
    this.state.journalEntries.forEach(function(journalEntry) {
      if ((!(journalEntry.rejected === true)) && journalEntry.posted === true) {
        var url = journalEntry._links.transaction['href']
        $.ajax({
          url: url
        }).then(function (data) {
          self.setState({
            transactions: self.state.transactions.concat(data._embedded.transactions)

          });
        });
      }
    });
  },
  loadAccountsFromServer: function() {
    var self = this;
    $.ajax({
      url: "http://localhost:8080/api/accounts"
    }).then(function (data) {
      self.setState({accounts: data._embedded.accounts});
    });
  },
  updateAccountId: function(evt) {
    this.setState({
      accountId: evt.target.value
    });
  },
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

    var currentAccount = this.state.accounts[this.state.accountId - 1];
    var balance;

    if (currentAccount) {
        balance = this.formatBalance(currentAccount.balance);
    }

    return (
      <div>
        <div className="container">
          <h1>Ledger</h1>
          <hr />
          <AccountSelect onChange={this.updateAccountId} accounts={this.state.accounts} id={this.state.accountId} comboId={"ledger"}/>
          <hr />
          <h4>Account Balance: $ {balance}</h4>
          <hr />
          <div className="faq">
            <input type="search" placeholder="search" id="searchBar"/>
            <div className="faq_not_found">
              <p>No Matches were found</p>
            </div>
            <LedgerTable className="Ledger" accountId={this.state.accountId} transactions={this.state.transactions}/>
          </div>
        </div>
      </div>
    );
  }
});


if (document.getElementById('AllApprovedJournals') != null) {
    ReactDOM.render(<Ledger />, document.getElementById('AllApprovedJournals'));
}

$("#my-file-selector").on("change", function(e) {
//Note: I was not able to figure out what some of the code did so I just commented it out in case it is needed later
  var data_array = [];
  var loaded = false;
  for (var i = 0; i < e.target.files.length; i++) {
    var file = e.target.files[i];
    var filename = name.length > 1 ? name + ".pdf" : file.name;
    var filetype = file.type;
    var filesize = file.size;
    var data = {
      "filename":filename,
      "filetype":filetype,
      "filesize":filesize
    };
    data_array.push(data)

    var currentIndex = 0;
    var reader = new FileReader();
    reader.onload = function(e) {
      var file_base64 = e.target.result.split(/,/)[1];

      var results = $("<li></li>");
      var fileData = $("<a />", {
        "href": "data:" + data_array[currentIndex].filetype + ";base64," + file_base64,
        "download": data_array[currentIndex].filename,
        "target": "_blank",
        "text": data_array[currentIndex].filename
      });
      results.append(fileData);
      results.append("&nbsp;","<button class='btn btn-default removeAppendedFile'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>","<br>");

      $("#upload-file-info").append(results[0]);

      currentIndex++;

    }, function(jqxhr, textStatus, errorThrown) {
      //console.log(textStatus, errorThrown)
    };
    reader.readAsDataURL(file);
  }
});

$("body").on("click", ".btn.btn-default.removeAppendedFile", function(){
  $(this).parent().remove();
});