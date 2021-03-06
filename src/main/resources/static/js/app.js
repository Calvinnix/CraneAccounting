/**
This file contains the user accounts.

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
    handleDeactivate: function () {
      var self = this;
      $.ajax({
        url: "http://localhost:8080/admin/editUser",
        type: "POST",
        data: {username: this.state.username,
          password: this.state.password,
          enabled: false,
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
          toastr.success("Successfully Deactivated User!");
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
        enabled: false
      });
    },
    handleActivate: function () {
      var self = this;
      $.ajax({
        url: "http://localhost:8080/admin/editUser",
        type: "POST",
        data: {username: this.state.username,
          password: this.state.password,
          enabled: true,
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
          toastr.success("Successfully Activated User!");
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
          enabled: true
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
                  <div className="col-md-3">********</div>
                  <div className="col-md-2">{this.state.role}</div>
                  <div className="col-md-2">{this.state.enabled ? 'Enabled' : 'Disabled'}</div>
                  <div className="col-md-1">
                    <button className="btn btn-warning" onClick={this.handleEdit}>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                  </div>
                  {this.state.enabled ? (
                      <div className="col-md-2">
                          <button className="btn btn-danger" onClick={this.handleDeactivate}>
                              Deactivate
                          </button>
                      </div>
                    ):(
                      <div className="col-md-2">
                          <button className="btn btn-success" onClick={this.handleActivate}>
                              Activate
                          </button>
                      </div>
                    )}
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
                </div>
                <div className="faq">
                  <div className="container">
                    <input id="searchBar" type="search" className="form-control" placeholder="Search" />
                    <div className="faq_not_found">
                      <p>No Matches were found</p>
                    </div>
                  </div>
                  <UserTable users={this.state.users} roles={this.state.roles} />
                </div>

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

$("#btnLogin").click(function(e) {
  validateLoginForm($(this), e);
});

$("#btnSignup").click(function(e) {
  validateSignupForm($(this), e);
});

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

var EventRow = React.createClass({
  render: function() {
    return (
      <div className="row row-striped">
        <div className="row">
          <div className="col-md-2 text-center">{this.props.event.timestamp}</div> 
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
        var index = 0;
        this.props.events.forEach(function(event) {
            rows.push(<EventRow event={event} key={index++}/>);
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
            events: [],
            sortedByDescending: false
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
    sortEvents: function () {
      var events = this.state.events;

      if (this.state.sortedByDescending) {
        events.sort(this.ascending)
        this.setState({
          sortedByDescending: false,
          events: events
        });
      } else {
        events.sort(this.descending)
        this.setState({
          sortedByDescending: true,
          events: events
        });
      }
    },
    descending: function(a,b) {
      if (a.timestamp > b.timestamp)
        return -1;
      if (a.timestamp < b.timestamp)
        return 1;
      return 0;
    },
    ascending: function(a,b) {
      if (a.timestamp < b.timestamp)
        return -1;
      if (a.timestamp > b.timestamp)
        return 1;
      return 0;
    },
    render: function() {
      var self = this;
      return (
        <div>
          <div className="container">
            <h1>Event Log</h1>
            <div className="faq">
              <div className="container">
                <input id="searchBar" type="search" className="form-control" placeholder="Search" />
                <div className="faq_not_found">
                  <p>No Matches were found</p>
                </div>
              </div>
              <div className="row header-row">
                <div className="col-md-2 text-center" onClick={this.sortEvents}><h5>Timestamp&nbsp;
                  {this.state.sortedByDescending ? (
                      <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                    ) : (
                      <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                    )}</h5></div>
                <div className="col-md-2"><h5>User</h5></div>
                <div className="col-md-8"><h5>Description</h5></div>
              </div>
              <EventsTable events={this.state.events} />
            </div>
          </div>
        </div>
      );
    }

});

if (document.getElementById('AllEvents') != null) {
    ReactDOM.render(<AllEvents />, document.getElementById('AllEvents'));
}

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
    var firstCurrentLiabilities = true;
    var firstLongTermLiabilities = true;
    var firstOwnersEquity = true;
    var firstRevenue = true;
    var firstExpense = true;
    var firstDividend = true;

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
        currentLiabilities.push(<TrialBalanceAccount first={firstCurrentLiabilities} account={account} key={account.publicId} />);
        firstCurrentLiabilities = false;
      }else if (account.type === "Liabilities" && account.code < 300 && account.code >= 240)   {
         longTermLiabilities.push(<TrialBalanceAccount first={firstLongTermLiabilities} account={account} key={account.publicId} />);
         firstLongTermLiabilities = false;
      }else if (account.type === "Owner's Equity")   {
        ownersEquity.push(<TrialBalanceAccount first={firstOwnersEquity} account={account} key={account.publicId} />);
        firstOwnersEquity = false;
      }else if (account.type === "Revenues")   {
        revenues.push(<TrialBalanceAccount first={firstRevenue} account={account} key={account.publicId} />);
        firstRevenue = false;
      }else if (account.type === "Operating Expenses")   {
        expenses.push(<TrialBalanceAccount first={firstExpense} account={account} key={account.publicId} />);
        firstExpense = false;
      }else if (account.type === "Dividends")   {
        dividends.push(<TrialBalanceAccount first={firstDividend} account={account} key={account.publicId} />);
        firstDividend = false;
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
                <hr className="bar-t"/>
            </div>
            <div className="col-md-2">
                <hr className="bar-t"/>
            </div>
        </div>
        <div className="row text-primary">
          <div className="col-md-8 text-right">Total:</div>
          <div className="col-md-2 text-right">$ {this.formatBalance(leftSideBalanceTotal)}</div>
          <div className="col-md-2 text-right">$ {this.formatBalance(rightSideBalanceTotal)}</div>
        </div>
        <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
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

    var firstShortTermAsset = true;
    var firstLongTermAsset = true;
    var firstCurrentLiabilities = true;
    var firstLongTermLiabilities = true;
    var firstOwnersEquity = true;

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
        currentAssets.push(<TrialBalanceAccount first={firstShortTermAsset} account={account} key={account.publicId} />);
        firstShortTermAsset = false;
      }else if (account.type === "Asset" && account.code < 200 && account.code >= 150) {
        longTermAssets.push(<TrialBalanceAccount first={firstLongTermAsset} account={account} key={account.publicId} />);
        firstShortTermAsset = false;
      }else if (account.type === "Liabilities" && account.code < 240 && account.code >= 200)   {
        currentLiabilities.push(<TrialBalanceAccount first={firstCurrentLiabilities} account={account} key={account.publicId} />);
        firstCurrentLiabilities = false;
      }else if (account.type === "Liabilities" && account.code < 300 && account.code >= 240)   {
         longTermLiabilities.push(<TrialBalanceAccount first={firstLongTermLiabilities} account={account} key={account.publicId} />);
         firstLongTermLiabilities = false;
      }else if (account.type === "Owner's Equity")   {
        ownersEquity.push(<BalanceSheetAccount first={firstOwnersEquity} account={account} key={account.publicId} />);
        firstOwnersEquity = false;
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
                <hr className="bar-t"/>
            </div>
            <div className="col-md-2">
                <hr className="bar-t"/>
            </div>
        </div>
        <div className="row text-primary">
          <div className="col-md-8 text-right">Total:</div>
          <div className="col-md-2 text-right">$ {this.formatBalance(leftSideBalanceTotal)}</div>
          <div className="col-md-2 text-right">$ {this.formatBalance(rightSideBalanceTotal)}</div>
        </div>
        <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
            <div className="col-md-2">
                <hr className="bar"/>
            </div>
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
            <div className="col-md-6 text-right">{this.props.first ? '$' : ''} {this.state.balance}</div>
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
    var firstRevenue = true;
    var firstExpense = true;
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
        revenues.push(<IncomeStatementAccount first={firstRevenue} account={account} key={account.publicId} />);
        firstRevenue = false;
      } else if (account.type === "Operating Expenses")   {
        expenses.push(<IncomeStatementAccount first={firstExpense} account={account} key={account.publicId} />);
        firstExpense = false;
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
        <hr className="bar-t"/>
        <div className="row text-primary">
          <div className="col-md-1"></div>
          <div className="col-md-5">Net Income(Loss):</div>
          <div className="col-md-6 text-right">$ {this.formatBalance(totalIncome)}</div>
        </div>
        <hr className="bar"/>
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
    var firstDividend = true;
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
        dividends.push(<StatementOfRetainedEarningsAccount first={firstDividend} account={account} key={account.publicId} />);
        firstDividend = false;
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
          <div className="col-md-2 text-right">$ {this.formatBalance(currentRetainedRevenues)}</div>
        </div>
        }

        {Math.abs(rightSideBalanceTotal) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Current Net Income</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right">$ {this.formatBalance(rightSideBalanceTotal)}</div>
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
        <hr className="bar-t"/>
        <div className="row text-primary">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">End Retained Earnings:</div>
          <div className="col-md-4 text-right"></div>
          <div className="col-md-2 text-right">$ {this.formatBalance(totalIncome)}</div>
        </div>
        <hr className="bar"/>
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

var RatioAnalysisTable = React.createClass({
  currentRatioColor: function(){
    var cRatio = document.getElementById("currentRatio");
    var colors = document.getElementById("var1");
    if(cRatio === null){
        return;
    }
    else if(cRatio.textContent < 5){
        colors.style.backgroundColor = "red";
    }else if (cRatio.textContent > 6){
        colors.style.backgroundColor = "green";
    }else{
        colors.style.backgroundColor = "#efd300";
    }
  },
  quickRatioColor: function(){
    var qRatio = document.getElementById("quickRatio");
    var colors = document.getElementById("var2");
    if(qRatio === null){
        return;
    }
    else if(qRatio.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (qRatio.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  invWorkingCapColor: function(){
    var workingCap = document.getElementById("invWorkingCap");
    var colors = document.getElementById("var3");
    if(workingCap === null){
        return;
    }
    else if(workingCap.textContent < 5){
        colors.style.backgroundColor = "red";
    }else if (workingCap.textContent > 6){
        colors.style.backgroundColor = "green";
    }else{
        colors.style.backgroundColor = "#efd300";
    }
  },
  invTurnoverColor: function(){
    var invTurnover = document.getElementById("invTurnover");
    var colors = document.getElementById("var4");
    if(invTurnover === null){
        return;
    }
    else if(invTurnover.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (invTurnover.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  dsoColor: function(){
    var dso = document.getElementById("dso");
    var colors = document.getElementById("var5");
    if(dso === null){
        return;
    }
    else if(dso.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (dso.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  fixedAssetColor: function(){
    var fixedAsset = document.getElementById("fixedAsset");
    var colors = document.getElementById("var6");
    if(fixedAsset === null){
        return;
    }else if(fixedAsset.textContent < 5){
        colors.style.backgroundColor = "red";
    }else if (fixedAsset.textContent > 6){
        colors.style.backgroundColor = "green";
    }else{
        colors.style.backgroundColor = "#efd300";
    }
  },
  totalAssetColor: function(){
    var totalAsset = document.getElementById("totalAsset");
    var colors = document.getElementById("var7");
    if(totalAsset === null){
        return;
    }else if(totalAsset.textContent < 5){
        colors.style.backgroundColor = "red";
    }else if (totalAsset.textContent > 6){
        colors.style.backgroundColor = "green";
    }else{
        colors.style.backgroundColor = "#efd300";
    }
  },
  debtRatioColor: function(){
    var debtRatio = document.getElementById("debtRatio");
    var colors = document.getElementById("var8");
    if(debtRatio === null){
        return;
    }
    else if(debtRatio.textContent < 5){
        colors.style.backgroundColor = "red";
    }else if (debtRatio.textContent > 6){
        colors.style.backgroundColor = "green";
    }else{
        colors.style.backgroundColor = "#efd300";
    }
  },
  longDebtEquityColor: function(){
    var longDebtEquity = document.getElementById("longDebtEquity");
    var colors = document.getElementById("var9");
    if(longDebtEquity === null){
        return;
    }
    else if(longDebtEquity.textContent < 5){
        colors.style.backgroundColor = "red";
    }else if (longDebtEquity.textContent > 6){
        colors.style.backgroundColor = "green";
    }else{
        colors.style.backgroundColor = "#efd300";
    }
  },
  tieColor: function(){
    var tie = document.getElementById("tie");
    var colors = document.getElementById("var10");
    if(tie === null){
        return;
    }
    else if(tie.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (tie.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  ecColor: function(){
     var ec = document.getElementById("ec");
     var colors = document.getElementById("var11");
    if(ec === null){
        return;
    }
    else if(ec.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (ec.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  pmColor: function(){
    var pm = document.getElementById("pm");
    var colors = document.getElementById("var12");
    if(pm === null){
        return;
    }
    else if(pm.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (pm.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  gpmColor: function(){
    var gpm = document.getElementById("gpm");
    var colors = document.getElementById("var13");
    if(gpm === null){
        return;
    }
    else if(gpm.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (gpm.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  omColor: function(){
    var om = document.getElementById("om");
    var colors = document.getElementById("var14");
    if(om === null){
        return;
    }
    else if(om.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (om.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  bepColor: function(){
    var bep = document.getElementById("bep");
    var colors = document.getElementById("var16");
    if(bep === null){
        return;
    }
    else if(bep.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (bep.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  roaColor: function(){
    var roa = document.getElementById("roa");
    var colors = document.getElementById("var17");
    if(roa === null){
        return;
    }
    else if(roa.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (roa.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  roeColor: function(){
    var roe = document.getElementById("roe");
    var colors = document.getElementById("var18");
    if(roe === null){
        return;
    }
    else if(roe.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (roe.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
    }
  },
  interestEarnedColor: function(){
    var interestEarned = document.getElementById("interestEarned");
    var colors = document.getElementById("var15");
    if(interestEarned === null){
        return;
    }
    else if(interestEarned.textContent < 5){
      colors.style.backgroundColor = "red";
    }else if (interestEarned.textContent > 6){
      colors.style.backgroundColor = "green";
    }else{
      colors.style.backgroundColor = "#efd300";
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

      if (account.type === "Asset" && account.code > 150) {
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
        sales += account.balance
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

      if(currentInventories === 0){
        invTurnover = 0;
      }else{
        invTurnover = sales/currentInventories;
      }


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

      if(fixedAsset === 0){
        fixedAssetRatio = 0;
      }else{
        fixedAssetRatio = sales/fixedAsset;
      }

      if(totalAssets === 0){
        totalAsset = 0;
        bep = 0;
        debtRatio = 0;
        roa = 0;
      }else{
          totalAsset = sales/totalAssets;
          bep = totalIncome/totalAssets;
          debtRatio = totalLiabilities/totalAssets;
          roa = totalIncome/totalAssets;
      }

      if(intExpense === 0){
        tie = 0;
        ec = 0;
      }else{
        tie = ebit/intExpense;
        ec = (ebit-currentDepreciation)/intExpense;
      }

      if(commonEquity === 0){
        roe = 0;
        debtEquity = 0;
        longDebtEquity = 0;
      }else{
        roe = totalIncome/commonEquity;
        debtEquity = totalLiabilities/commonEquity;
        longDebtEquity = longTermDebt/commonEquity;
      }

      if(currentLiabilities === 0){
        currentRatio = 0;

      }else{
        currentRatio = currentAssets/currentLiabilities;
      }

      totalIncome = rightSideBalanceTotal - leftSideBalanceTotal + currentRetainedRevenues;
      invWorkingCap = currentInventories/(currentAssets - currentLiabilities);

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
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="currentRatio">{currentRatio.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var1" className="circle"/></div>
        </div>
        }

        {Math.abs(quickRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Quick Ratio</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="quickRatio" >{quickRatio.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var2" className="circle"/></div>
        </div>
        }

        {Math.abs(invWorkingCap) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Inventory to Net Working Capital</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="invWorkingCap" >{invWorkingCap.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var3" className="circle"/></div>
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
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="invTurnover">{invTurnover.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var4" className="circle"/></div>
        </div>
        }

        {Math.abs(dso) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Days Sales Outstanding (DSO)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="dso">{dso.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var5" className="circle"/></div>
        </div>
        }

        {Math.abs(fixedAssetRatio) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Fixed Asset Turnover</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="fixedAsset">{fixedAssetRatio.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var6" className="circle"/></div>
        </div>
        }

        {Math.abs(totalAsset) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Total Asset Turnover</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="totalAsset">{totalAsset.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var7" className="circle"/></div>
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
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="debtRatio">{debtRatio.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var8" className="circle"/></div>
        </div>
        }

        {Math.abs(longDebtEquity) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Debt-to-Equity Ratio</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="longDebtEquity">{longDebtEquity.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var9" className="circle"/></div>
        </div>
        }

        {Math.abs(interestEarned) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Times-interest-earned Ratio</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="interestEarned">{interestEarned.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var15" className="circle"/></div>
        </div>
        }

        {Math.abs(tie) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Times Interest Earned (TIE)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="tie">{tie.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var10" className="circle"/></div>
        </div>
        }

        {Math.abs(ec) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Economic Capital (EC)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="ec">{ec.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var11" className="circle"/></div>
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
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="pm">{pm.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var12" className="circle"/></div>
        </div>
        }

        {Math.abs(om) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Operating Profit Margin (OM)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="om">{om.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var14" className="circle"/></div>
        </div>
        }

        {Math.abs(gpm) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Gross Profit Margin (GPM)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="gpm">{gpm.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var13" className="circle"/></div>
        </div>
        }

        {Math.abs(bep) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Basic Earning Power (BEP)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="bep">{bep.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var16" className="circle"/></div>
        </div>
        }

        {Math.abs(roa) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Return on Assets (ROA)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="roa">{roa.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var17" className="circle"/></div>
        </div>
        }

        {Math.abs(roe) > 0 &&
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 text-left">Return on Equity (ROE)</div>
          <div className="col-md-3 text-right"></div>
          <div className="col-md-2 text-right" id="roe">{roe.toFixed(2)}</div>
          <div className="col-md-1"><input type="text" id="var18" className="circle"/></div>
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

$('#searchBar').click(function(e){
    //'use strict';

      ;( function ( document, window, index )
      {
        var hasElementClass   = function( element, className ){ return element.classList ? element.classList.contains( className ) : new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className ); },
          addElementClass   = function( element, className ){ element.classList ? element.classList.add( className ) : element.className += ' ' + className; },
          removeElementClass  = function( element, className ){ element.classList ? element.classList.remove( className ) : element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' ); };


        // search & highlight

        ;( function ( document, window, index )
        {
          var container = document.querySelector( '.faq' );
          if( !container ) return true;

          var input     = container.querySelector( 'input' ),
            notfound    = container.querySelector( '.faq_not_found' ),
            items     = document.querySelectorAll( '.faq > div > div' ),
            item      = {},
            itemsIndexed  = [];

          [].forEach.call( items, function( entry )
          {
            itemsIndexed.push( entry.textContent.replace( /\s{2,}/g, ' ' ).toLowerCase() );
          });

          input.addEventListener( 'keyup', function( e )
          {
            if( e.keyCode == 13 ) // enter
            {
              input.blur();
              return true;
            }

            [].forEach.call( items, function( entry )
            {
              //Fixes bug where we can't edit/delete after searching
              //entry.innerHTML = entry.innerHTML.replace( /<span class="highlight">([^<]+)<\/span>/gi, '$1' );
            });

            var searchVal = input.value.trim().toLowerCase();
            if( searchVal.length )
            {
              itemsIndexed.forEach( function( entry, i )
              {
                if( itemsIndexed[ i ].indexOf( searchVal ) != -1 )
                {
                  //Fixes bug where we can't edit/delete after searching
                  removeElementClass( items[ i ], 'is-hidden' );
                  //items[ i ].innerHTML = items[ i ].innerHTML.replace( new RegExp( searchVal+'(?!([^<]+)?>)', 'gi' ), '<span class="highlight">$&</span>' );
                }
                else
                  addElementClass( items[ i ], 'is-hidden' );
              });
            }
            else [].forEach.call( items, function( entry ){ removeElementClass( entry, 'is-hidden' ); });

            if( items.length == [].filter.call( items, function( entry ){ return hasElementClass( entry, 'is-hidden' ) } ).length )
              addElementClass( notfound, 'is-visible' );
            else
              removeElementClass( notfound, 'is-visible' );

          });
        }( document, window, 0 ));

        // toggling items on title press
        ;( function ( document, window, index )
        {
          [].forEach.call( document.querySelectorAll( '.faq div ' ), function( entry )
          {
            addElementClass( entry, 'js--is-toggleable-item' );
          });

          document.addEventListener( 'click', function( e )
          {
            if( hasElementClass( e.target, 'js--is-toggleable-item' ) )
            {
              e.preventDefault();
              var current = e.target;
              while( current.parentNode )
              {
                current = current.parentNode;
                if( current.tagName.toLowerCase() == 'div' )
                {
                  hasElementClass( current, 'is-active' ) ? removeElementClass( current, 'is-active' ) : addElementClass( current, 'is-active' );
                  break;
                }
              }
            }
          });
        }( document, window, 0 ));


        // auto-show item content when show results reduces to single

        ;( function ( document, window, index )
        {
          var container = document.querySelector( '.faq' );
          if( !container ) return true;

          var input = container.querySelector( 'input' ),
            items = document.querySelectorAll( '.faq > div > div ' ),
            item  = {};

          input.addEventListener( 'keyup', function( e )
          {
            item = [].filter.call( items, function( entry ){ return !hasElementClass( entry, 'is-hidden' ); } )

            if( item.length == 1 )
            {
              addElementClass( item[ 0 ], 'js--autoshown' );
              addElementClass( item[ 0 ], 'is-active' );
            }
            else
              [].forEach.call( items, function( entry )
              {
                if( hasElementClass( entry, 'js--autoshown' ) )
                {
                  removeElementClass( entry, 'js--autoshown' );
                  removeElementClass( entry, 'is-active' );
                }
              });
          });
        }( document, window, 0 ));

      }( document, window, 0 ));
   });