/**
The class acts as the handler for the User objects.

Methods:

*GetInitialState
*loadUsersFromServer
*handleDelete
*handleEdit
*handleEditChange
*handleEditCancel
*updateUsername
*updatePassword
*updateRole
*updateEnabled
*render

*/
var User = React.createClass({
    /**
        propTypes defines the values that this class will be expecting as properties.
    */
    propTypes: {
        roles:        React.PropTypes.array.isRequired,
        user:         React.PropTypes.object.isRequired
    },
    /**
        This sets the initial state of the User class. As well as defines initial state variables
    */
    getInitialState: function() {
        return {
            users: [],
            display: true,
            editing: false,
            username: this.props.user.username,
            password: '',
            enabled: this.props.user.enabled,
            role: this.props.user.authorities[0].authority
        };
    },
    /**
        This makes an AJAX call to load users.
        This is primarily used for reloading users when an add/delete has occurred
    */
    loadUsersFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/users"
        }).then(function (data) {
            self.setState({users: data._embedded.users});
        });
    },
    /**
        This handles whenever a user tries to delete an entry
    */
    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.user._links.self.href,
            type: 'DELETE',
            success: function(result) {
                self.setState({display: false});
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
    /**
        This flags the form to let it know that it is being edited
    */
    handleEdit: function() {
        var self = this;
        self.setState({editing: true});
    },
    /**
        This posts the changes made to the user
    */
    handleEditChange: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/admin/editUser",
            type: "POST",
            data: {username: this.state.username,
                   password: this.state.password,
                   enabled: this.state.enabled,
                   role: this.state.role},
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
                toastr.success("Successfully Edited User!");
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
        self.setState({editing: false});
    },
    /**
        This cancels the editing of a user.
        Removes the edit flag.
    */
    handleEditCancel: function() {
        var self = this;
        self.setState({editing: false});
    },
    /**
        This updates the username as it is being updated in the UI
    */
    updateUsername: function(evt) {
        this.setState({
            username: evt.target.value
        });
    },
    /**
        This updates the password as it is being updated in the UI
    */
    updatePassword: function(evt) {
        this.setState({
            password: evt.target.value
        });
    },
    /**
        This updates the role as it is being updated in the UI
    */
    updateRole: function(evt) {
        this.setState({
            role: evt.target.value
        });
    },
    /**
        This updates the enabled property as it is being updated in the UI

        You will notice this one has a little more logic than the other
        update methods. This is because I was only able to pull back a string
        "true" or "false" from the select control. This was causing an issue with
        React not rendering the changes automatically.
    */
    updateEnabled: function(evt) {
        if (evt.target.value === 'true') {
            this.setState({
                enabled: true
            });
        } else {
            this.setState({
                enabled: false
            });
        }
    },
    /**
        Renders the HTML
    */
    render: function() {
        if (this.state.display == false) {
            return null;
        } else if (this.state.editing == true) {
            /**
                This HTML provides input fields for the specified user to be edited.
            */
            return (
                <div className="row row-striped">
                      <div className="col-md-2">{this.state.username}</div>
                      <div className="col-md-4">
                        <input type="password" className="form-control" name="inputPassword" placeholder="New Password" value={this.state.password} onChange={this.updatePassword}/>
                      </div>
                      <div className="col-md-2">
                        <RoleSelect roles={this.props.roles} role={this.state.role} onChange={this.updateRole} />
                      </div>
                      <div className="col-md-2">
                        <EnabledSelect onChange={this.updateEnabled} enabled={this.state.enabled} />
                      </div>
                      <div className="col-md-1">
                        <button className="btn btn-success" onClick={this.handleEditChange}>
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="col-md-1">
                        <button className="btn btn-danger" onClick={this.handleEditCancel}>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                      </div>
                </div>
            );
        } else {
            /**
                This HTML provides fields to show user data.
            */
            return (
                <div className="row row-striped">
                      <div className="col-md-2">{this.props.user.username}</div>
                      <div className="col-md-4">********</div>
                      <div className="col-md-2">{this.state.role}</div>
                      <div className="col-md-2">{this.state.enabled ? 'Enabled' : 'Disabled'}</div>
                      <div className="col-md-1">
                        <button className="btn btn-warning" onClick={this.handleEdit}>
                            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="col-md-1">
                        <button className="btn btn-danger" onClick={this.handleDelete}>
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                      </div>
                </div>
            );
        }
    }
});


/**
    This class acts as the handler for UserTable objects.
    Essentially this class helps order all of the user objects together.

    Methods:

    *render
*/
var UserTable = React.createClass({
    /**
        propTypes defines the values that this class will be expecting as properties.
    */
    propTypes: {
            roles: React.PropTypes.array.isRequired,
            users: React.PropTypes.array.isRequired
    },
    /**
        Renders the HTML
    */
    render: function() {
        var self = this;
        var rows = [];
        this.props.users.forEach(function(user) {
            rows.push(<User user={user} key={user.username} roles={self.props.roles} />);
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});

/**
    This class handles the roles to be displayed in the select control
*/
var Role = React.createClass({
    /**
        propTypes defines the values that this class will be expecting as properties.
    */
    propTypes: {
            role: React.PropTypes.object
    },
    render: function() {
        var roleName         = this.props.role.name;
        if (roleName != null && roleName.length > 5) {
            /**
             * This formats the role name to look nice.
             * i.e. ROLE_ADMIN -> Admin
             */
            roleName = roleName.substring(5).toLowerCase();
            roleName = roleName.charAt(0).toUpperCase() + roleName.slice(1);
        } else {
            roleName = "INVALID";
        }

        return (
            <option value={this.props.role.name}>{roleName}</option>
        );
    }
});


/**
    This class acts as the handler for the select element that will display the roles
*/
var RoleSelect = React.createClass({
    /**
        propTypes defines the values that this class will be expecting as properties.
    */
    propTypes: {
                role: React.PropTypes.string
    },
    render: function() {
        var roles = [];
        this.props.roles.forEach(function(role) {
            roles.push(<Role role={role} key={role.name}/>);
        });
        return (
            <select className="form-control" name="selectRole" value={this.props.role} onChange={this.props.onChange}>
                {roles}
            </select>
        );
    }
});

/**
    This class acts as the handler for the select element that will display the enabled property
*/
var EnabledSelect = React.createClass({
    /**
        propTypes defines the values that this class will be expecting as properties.
    */
    propTypes: {
        role: React.PropTypes.bool
    },
    render: function() {
        return (
            <select className="form-control" name="selectEnabled" value={this.props.enabled} onChange={this.props.onChange}>
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
            </select>
        );
    }
});

/**
    This class is used for displaying all of the users neatly on the page

    Methods:

    *getInitialState
    *componentDidMount
    *loadUsersFromServer
    *loadRolesFromServer
    *handleAddUser
    *updateUsername
    *updatePassword
    *updateRole
    *updateEnabled
    *render

*/
var AllUsers = React.createClass({
    /**
        This method loads the initial state variables
    */
    getInitialState: function() {
        return {users: [],
                roles: [],
                username: '',
                password: '',
                enabled: true,
                role: ''};
    },
    /**
        This method fires when the component has mounted
    */
    componentDidMount: function () {
        this.loadUsersFromServer();
        this.loadRolesFromServer();
    },
    /**
        This method loads the users from the server
    */
    loadUsersFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/users"
        }).then(function (data) {
            self.setState({users: data._embedded.users});
        });
    },
    /**
        This method loads the different roles from the server.
    */
    loadRolesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/roles"
        }).then(function (data) {
            self.setState({roles: data._embedded.roles});
        });
    },
    /**
        This method handles the adding of a user. (via AJAX)
    */
    handleAddUser: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/admin/addUser",
            type: "POST",
            data: {username: this.state.username,
                   password: this.state.password,
                   enabled: this.state.enabled,
                   role: this.state.role},
            success: function() {
                self.loadUsersFromServer();
                toastr.options = {
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 100,
                    "timeOut": 500,
                    "extendedTimeOut": 100
                }
                toastr.success("Successfully Added User!");
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
    /**
        This method updates the username as it is being updated in the UI
    */
    updateUsername: function(evt) {
        this.setState({
            username: evt.target.value
        });
    },
    /**
        This method updates the password as it is being updated in the UI
    */
    updatePassword: function(evt) {
        this.setState({
            password: evt.target.value
        });
    },
    /**
        This method updates the role as it is being updated in the UI
    */
    updateRole: function(evt) {
        this.setState({
            role: evt.target.value
        });
    },
    /**
        This method updates the enabled as it is being updated in the UI
    */
    updateEnabled: function(evt) {
        this.setState({
            enabled: evt.target.value
        });
    },
    /**
        This method renders the HTML
    */
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row header-row">
                        <div className="col-md-2"><h5>Username</h5></div>
                          <div className="col-md-4"><h5>Password</h5></div>
                          <div className="col-md-2"><h5>Role</h5></div>
                          <div className="col-md-2"><h5>Enabled</h5></div>
                          <div className="col-md-2"></div>
                     </div>
                     <hr />
                    <div className="row">
                        <div className="col-md-2">
                            <input type="text" className="form-control" name="inputUsername" placeholder="Username" value={this.state.username} onChange={this.updateUsername}/>
                        </div>
                        <div className="col-md-4">
                            <input type="password" className="form-control" name="inputPassword" placeholder="Password" value={this.state.password} onChange={this.updatePassword}/>
                        </div>
                        <div className="col-md-2">
                            <RoleSelect roles={this.state.roles} onChange={this.updateRole} />
                        </div>
                        <div className="col-md-2">
                            <EnabledSelect onChange={this.updateEnabled} />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success" onClick={this.handleAddUser}>Add User</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                      <input id="inputSearch" type="text" className="form-control" placeholder="Search" />
                    </div>
                    <hr />
                </div>
                <UserTable users={this.state.users} roles={this.state.roles} />
            </div>
        );
    }
});

/**
    This is where the main React component, 'AllUsers' in this case, is being rendered.
*/
if (document.getElementById('allUsers') != null) {
    ReactDOM.render(<AllUsers />, document.getElementById('allUsers'));
}

var Account = React.createClass({
    propTypes: {
            account: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <option value={this.props.id}>{this.props.account.code} - {this.props.account.name}</option>
        );
    }
});

var AccountSelect = React.createClass({
    propTypes: {
          accounts: React.PropTypes.array
    },
    render: function() {
        var accounts = [];
        var id = 0;
        this.props.accounts.forEach(function(account) {
            /**
                There is no id property on account by default
                so we will add via this loop. We will just increment
                by one each time.
            */
            id = id + 1;
            accounts.push(<Account id={id} account={account} key={account.name}/>);
        });
        return (
            <select className="form-control" name="selectAccountName" value={this.props.id} onChange={this.props.onChange}>
                {accounts}
            </select>
        );
    }
});

var AccountRow = React.createClass({

    getInitialState: function() {
        return { active: this.props.account.active,
                 initialBalance: this.props.account.initialBalance,
                 comment: this.props.account.comment,
                 beforeEditInitialBalance: '',
                 beforeEditComment: '',
                 editing: false};
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
               initialBalance: this.state.initialBalance,
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
               initialBalance: this.props.account.initialBalance,
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
               initialBalance: this.props.account.initialBalance,
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
            beforeEditInitialBalance: self.state.initialBalance,
            beforeEditComment: self.state.comment
        });
    },
    handleEditCancel: function() {
        var self = this;
        this.setState({
            editing: false,
            initialBalance: self.state.beforeEditInitialBalance,
            comment: self.state.beforeEditComment
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
                      {this.state.editing ? ( 
                        <div className="col-md-4"><input type="text" className="form-control" onChange={this.updateAccountAmount} placeholder="Initial Balance" value={this.state.initialBalance} /></div> 
                      ) : (
                        <div className="col-md-4"><h4>Initial Balance: $<b>{this.props.account.initialBalance}</b></h4></div>
                      )}
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
                                  <button className={this.state.active ? "btn btn-warning accountOptions" : "btn btn-warning accountOptions disabled"} onClick={this.handleEdit}> Edit</button> 
                             )}
                            {this.state.active ? ( 
                                  <button className={this.state.editing ? "btn btn-danger accountOptions disabled hidden" : "btn btn-danger accountOptions"} onClick={this.handleDeactivate}> Deactivate</button> 
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
                 priority: id,
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
                   initialBalance: this.state.initialBalance,
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
                        <div className="col-md-5"><h5>Account Name</h5></div>
                          <div className="col-md-2"><h5>Initial Balance</h5></div>
                          <div className="col-md-3"><h5>Comments</h5></div>
                          <div className="col-md-2"></div>
                        </div>
                     <hr />
                    <div className="row">
                        <div className="col-md-5">
                            <AccountSelect onChange={this.updateAccountId} accounts={this.state.ChartOfAccounts} id={this.state.id}/>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                              <span className="input-group-addon">$</span>
                              <input type="text" className="form-control" onChange={this.updateAccountAmount} aria-label="Amount"/>
                            </div>
                        </div>
                        <div className="col-md-3">
                              <textarea type="text" className="form-control" onChange={this.updateAccountComment} aria-label="Comment"/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success" onClick={this.loadAccountInformationById}>Add Account</button>
                        </div>
                    </div>
                    <hr />
                    <AccountsTable accounts={this.state.accounts} loadAccountsFromServer={this.loadAccountsFromServer} />
                </div>
            </div>
        );
    }
});

if (document.getElementById('AllAccounts') != null) {
    ReactDOM.render(<AllAccounts />, document.getElementById('AllAccounts'));
}

var EventRow = React.createClass({
        render: function() {
            return (
                <div className="row row-striped">
                      <div className="row">
                          <div className="col-md-2">{this.props.event.timestamp}</div> 
                          <div className="col-md-2">{this.props.event.user}</div> 
                          <div className="col-md-8 wrap-words">{this.props.event.description}</div>
                      </div>
                </div>
            );
        }

});

var EventsTable = React.createClass({
    propTypes: {
            events: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var rows = [];
        this.props.events.forEach(function(event) {
            rows.push(<EventRow event={event} key={event.timestamp}/>);
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});

var AllEvents = React.createClass({

    getInitialState: function() {
        return {
                events: []
                };
    },
    componentDidMount: function () {
        this.loadEventsFromServer();
    },
    loadEventsFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/eventLogs"
        }).then(function (data) {
            self.setState({events: data._embedded.eventLogs});
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <div className="container">
                    <h1>Event Log</h1>
                    <div className="row header-row">
                          <div className="col-md-2"><h5>Timestamp</h5></div>
                          <div className="col-md-2"><h5>User</h5></div>
                          <div className="col-md-8"><h5>Description</h5></div>
                     </div>
                     <EventsTable events={this.state.events} />
                </div>
            </div>
        );
    }

});

if (document.getElementById('AllEvents') != null) {
    ReactDOM.render(<AllEvents />, document.getElementById('AllEvents'));
}

/*TODO:ctn Eventually will want to convert this code (as well as the login/signup page) to utilize REACT */
/*TODO:ctn some code is repeated... This should be cleaned up */

$("#btnLogin").click(function(e) {
  validateLoginForm($(this), e);
});

$("#btnSignup").click(function(e) {
  validateSignupForm($(this), e);
});

function validateLoginForm(element, e) {
    var username = $("#inputUsername");
    var password = $("#inputPassword");
    var errorMessage = "";

    element.siblings("div.errorDiv").each(function() {
      $(this).remove();
    });

    var usernameErrorMessage = returnUsernameErrorMessage(username);
    if ( usernameErrorMessage.length !== 0 ) {
      errorMessage += usernameErrorMessage;
      username.addClass("invalid");
      username.removeClass("valid");
    } else {
      username.addClass("valid");
      username.removeClass("invalid");
    }

    var passwordErrorMessage = returnPasswordErrorMessage(password);
    if ( passwordErrorMessage.length !== 0 ) {
      errorMessage += passwordErrorMessage;
      password.addClass("invalid");
      password.removeClass("valid");
    } else {
      password.addClass("valid");
      password.removeClass("invalid");
    }

    if (errorMessage.length !== 0) {
      e.preventDefault();
      element.parent().prepend('<div class="errorDiv"><div class="alert alert-danger">'+errorMessage+'</div></div>');
    }
}

function validateSignupForm(element, e) {
    var username = $("#inputUsername");
    var password = $("#inputPassword");
    var confirmPassword = $("#inputConfirmPassword")
    var errorMessage = "";

    element.siblings("div.errorDiv").each(function() {
      $(this).remove();
    });

    var usernameErrorMessage = returnUsernameErrorMessage(username);
    if ( usernameErrorMessage.length !== 0 ) {
      errorMessage += usernameErrorMessage;
      username.addClass("invalid");
      username.removeClass("valid");
    } else {
      username.addClass("valid");
      username.removeClass("invalid");
    }

    var passwordErrorMessage = returnPasswordErrorMessage(password);
    if ( passwordErrorMessage.length !== 0 ) {
      errorMessage += passwordErrorMessage;
      password.addClass("invalid");
      password.removeClass("valid");
    } else {
      password.addClass("valid");
      password.removeClass("invalid");
    }

    var confirmPasswordErrorMessage = returnConfirmPasswordErrorMessage(password, confirmPassword);
    if ( confirmPasswordErrorMessage.length !== 0 ) {
      errorMessage += confirmPasswordErrorMessage;
      confirmPassword.addClass("invalid");
      confirmPassword.removeClass("valid");
    } else {
      confirmPassword.addClass("valid");
      confirmPassword.removeClass("invalid");
    }

    if (errorMessage.length !== 0) {
      e.preventDefault();
      element.parent().prepend('<div class="errorDiv"><div class="alert alert-danger">'+errorMessage+'</div></div>');
    }
}



function returnUsernameErrorMessage(username) {
  var errorMessage = "";
  if (username.val().length < 4) {
    errorMessage += "Username must be 4 or more characters.\n";
  }
  if (username.val().length > 20) {
    errorMessage += "Username must be less than 20 characters.\n";
  }
  return errorMessage;
}

function returnPasswordErrorMessage(password) {
    var errorMessage = "";
    if (password.val().length < 8) {
      errorMessage += "Password must be 8 or more characters.\n";
    }
    if (password.val().length > 32) {
      errorMessage += "Password must be less than 32 characters.\n";
    }
  return errorMessage;
}

function returnConfirmPasswordErrorMessage(password, confirmPassword) {
  var errorMessage = "";
  if (password.val() !== confirmPassword.val()) {
    errorMessage += "The confirmation password does not match.\n";
  }
  return errorMessage;
}