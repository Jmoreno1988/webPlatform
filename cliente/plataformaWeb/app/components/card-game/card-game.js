Polymer({

    is: 'card-game',

    properties: {
        creator: String,
        follower: String,
        type: String,
        turn: String,
        state: String,
        initgame: String,
        lastmov: String,
        board: String,

        labelGame: String
    },

    attached: function () {
        this.$$("#buttonAcceptRemoveGame").addEventListener('click', function () { this._remove() }.bind(this));
        this.$$("#buttonRemoveGame").addEventListener('click', function () { this._toggleModal('modalRemoveGame') }.bind(this));
        this.$$("#buttonCancelRegister").addEventListener('click', function () { this._toggleModal('modalRemoveGame') }.bind(this));
        this.$$("#card-content").addEventListener('click', function () { this._loadBoard() }.bind(this))
        this.$$("#buttonShare").addEventListener('click', function () { this._toggleModal('modalShare') }.bind(this));
        this.$$("#buttonCancelShare").addEventListener('click', function () { this._toggleModal('modalShare') }.bind(this));
        //this.labelGame = this.creator + " VS " + this.follower;
        this.labelGame = this.follower;
        (parseInt(this.turn) % 2 == 1) ? this.state = "white" : this.state = "black";
    },

    _init: function () {

    },

    _finish: function () {
    },

    _toggleModal: function (id) {
        document.querySelector("#" + id).toggle();
    },

    _remove: function () {
        //socket.emit('getRandomUser', {});
        var parent = Polymer.dom(this).parentNode;
        Polymer.dom(parent).removeChild(this);
    },

    _loadBoard: function () {
        this.fire('loadBoardChess', { board: this.board });
    },

    _goToBoard: function () {

        /*
        var node = document.createElement("board-chess");
        node.board = this.board;
        document.body.appendChild(node);
        */
    }
});