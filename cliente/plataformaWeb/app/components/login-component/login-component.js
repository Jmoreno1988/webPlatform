Polymer({

    is: 'login-component',

    properties: {
        socketManager: {
            type: Object,
            value: null
        }
    },

    ready: function () {
        this.socketManager = document.querySelector('socket-manager');
        document.addEventListener('closeSession', function () { this._close() }.bind(this));
    },

    _enter: function () {
        var nHeader = document.querySelector('#header');
        var nBody = document.querySelector('#body');

        nHeader.classList.add('moveUp');
        nBody.classList.add('moveDown');

        this.fire('initSession', { userName: this.$.userName.value });
    },

    _close: function () {
        var nHeader = document.querySelector('#header');
        var nBody = document.querySelector('#body');

        nHeader.classList.remove('moveUp');
        nBody.classList.remove('moveDown');
    },

    _validate: function () {
        if (!this.socketManager.isConnected())
            this.socketManager.createSocket();

        var socket = this.socketManager.getSocket();
        socket.on('respondValidate', function (msg) {
            switch (msg.type) {
                case 200:
                    this._enter();
                    break;
                case 410:
                    this._showToast("error", "Usuario o contraseña incorrectos");
                    break;
            }
        }.bind(this))

        socket.emit('validateUser', {
            userName: this.$.userName.value,
            password: this.$.password.value
        })
    },

    _createUser: function () {
        if (!this.socketManager.isConnected())
            this.socketManager.createSocket();

        var socket = this.socketManager.getSocket();

        socket.on('respondCreateUser', function (msg) {
            switch (msg.type) {
                case 200:
                    this._toggleFormNewUser();
                    this._showToast("success", "Usuario registrado correctamente");
                    break;
                case 410:
                    this._showToast("error", "El nombre de usuario ya existe");
                    break;
            }
        }.bind(this))

        socket.emit('createUser', {
            userName: this.$.userName.value,
            password: this.$.password.value,
            email: this.$.email.value
        })
    },

    _showToast: function (type, msg) {
        switch (type) {
            case "error":
                this.$.msgError.text = msg;
                this.$.msgError.open();
                break;

            case "success":
                this.$.msgSuccess.text = msg;
                this.$.msgSuccess.open();
                break;
        }

    },

    _toggleFormNewUser: function () {
        this.$.rePassword.classList.toggle('hidden');
        this.$.email.classList.toggle('hidden');
        this.$.buttonCancel.classList.toggle('hidden');
        this.$.buttonRegister.classList.toggle('hidden');
        this.$.buttonEnter.classList.toggle('hidden');
        this.$.msgFormRegister.classList.toggle('hidden');
    },

    _isLoginValidate: function () {
        var isValid = false;
        var userName = this.$.userName;
        var userNewPassword = this.$.password;
        var userNewRePassword = this.$.rePassword;
        var email = this.$.email;
        /*
        if (this.validateInputsNewUSer(userName.value)) {
            userName.invalid = false;
            if (this.validatePasswords(userNewPassword.value, userNewRePassword.value)) {
                userNewPassword.invalid = false;
                userNewRePassword.invalid = false;
                if (this.validateEmail(email.value)) {
                    email.invalid = false;
                    isValid = true;
                } else {
                    email.invalid = true;
                    this.polymerObj.fire('showToastMsg', { typeMsg: "error", time: 6000, msg: "Formato del email invalido." });
                }
            } else {
                userNewPassword.invalid = true;
                userNewRePassword.invalid = true;
                this.polymerObj.fire('showToastMsg', { typeMsg: "error", time: 6000, msg: "La contraseña debe ser igual en los dos campos, estar compuesta solo por caracteres alfanuméricos y comprendida entre 5 y 12 caracteres." });
            }
        } else {
            userName.invalid = true;
            this.polymerObj.fire('showToastMsg', { typeMsg: "error", time: 6000, msg: "El nombre de usuario debe estar comprendido entre 5 y 12 caracteres y estar compuesto solo por caracteres alfanuméricos." });
        }
        */
        return isValid;
    },
});