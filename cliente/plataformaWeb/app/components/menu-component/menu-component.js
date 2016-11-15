Polymer({

    is: 'menu-component',

    properties: {

    },

    attached: function () {
        document.addEventListener('initSession', function (evt) { this._init(evt.detail) }.bind(this));
        this.$$("#paper-fab").addEventListener('click', function () { this._toggleModal('createGameModal') }.bind(this));
        this.$$("#buttonCancelRegister").addEventListener('click', function () { this._toggleModal('createGameModal') }.bind(this));

        //this.$$("#buttonRandomOpponent").addEventListener('click', function () { this._getRandomUser() }.bind(this));
        //this.$$(".buttonRemoveGame").addEventListener('click', function () { this._toggleModal('modalRemoveGame') }.bind(this));

        this.$$("#paper-fab").addEventListener('click', function () {
            // this.$$("#reminderNewGame").classList.toggle("inflateReminderNewGame");
            // this.$$("#paper-fab").classList.add('beat');
        }.bind(this));
    },

    _init: function (cfgInit) {
        //this.style.visibility = "visible";

        var socket = io.connect('http://localhost:3000', { 'forceNew': true });

        socket.on('respondGetListGames', function (msg) {
            switch (msg.type) {
                case 200:
                    this._inflateListGames(msg.data.games);
                    break;
                case 400:
                    this._showToast("error", "Error con la conexión al servidor");
                    break;
            }
        }.bind(this))

        socket.emit('getListGames', { userName: cfgInit.userName });
    },

    _finish: function () {
        // Activar login
        this.fire('closeSession');
    },

    _toggleModal: function (id) {
        document.querySelector("#" + id).toggle();
    },

    _getRandomUser: function () {
        var socket = io.connect('http://localhost:3000', { 'forceNew': true });

        socket.on('respondGetRandomUser', function (msg) {
            switch (msg.type) {
                case 200:
                    this._enter();
                    break;
                case 400:
                    this._showToast("error", "Error con la conexión al servidor");
                    break;
            }
        }.bind(this))

        socket.emit('getRandomUser', {});
    },

    _remove: function () {
        var parent = Polymer.dom(this).parentNode;
        Polymer.dom(parent).removeChild(this);
    },

    _inflateListGames: function (listGames) {

        console.log(listGames)
        this.$.contentGames.innerHTML = "";
        for (var i = 0; i < listGames.length; i++) {
            var cardGame = document.createElement("card-game");
            cardGame.creator = listGames[i].nameCreator;
            cardGame.follower = listGames[i].nameFollow;
            cardGame.initgame = listGames[i].createdAt;
            cardGame.lastmov = listGames[i].updateAt;
            cardGame.type = listGames[i].type;
            cardGame.turn = listGames[i].turn;
            cardGame.board = listGames[i].board;
            this.$.contentGames.appendChild(cardGame);
        }
    },
    _goToBoard: function () {
        var node = document.createElement("board-chess");
        node.board = this.board;
        document.body.appendChild(node);
    }
});