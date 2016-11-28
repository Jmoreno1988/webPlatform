Polymer({

    is: 'board-chess',

    properties: {
        fen: String,
        chess: Object,
        board: Object,
        socketManager: {
            type: Object,
            value: null
        }
    },

    attached: function () {
        this.socketManager = document.querySelector('socket-manager');

        //var board = new Chessboard('board', this.board);
        //this.$.board.addEventListener('click', function () { console.log(board.getPosition(ChessUtils.FEN.id)) });
        this.$.buttonBackToMenu.addEventListener('click', function () { this._backToMenu() }.bind(this));
        document.addEventListener('loadBoardChess', function (evt) { this._loadGame(evt.detail.raw) }.bind(this));
    },

    _loadGame: function (raw) {
        var socket = this.socketManager.getSocket();
        socket.on('moveChessPiece', function (msg) {
            this.moveRival(msg.raw);
        }.bind(this))

        this.raw = JSON.parse(raw);
        this.fen = this.raw.board;

        this.$.paperDrawerPanelChess.style.visibility = 'visible';
        this.chess = new Chess();
        this.chess.load(this.fen);
        this.board = new Chessboard('board', {
            position: this.fen,
            eventHandlers: {
                onPieceSelected: this.pieceSelected.bind(this),
                onMove: this.pieceMove.bind(this)
            }
        });

        //this.resetGame();
    },

    resetGame: function () {
        this.board.setPosition(ChessUtils.FEN.startId);
        this.chess.reset();

        this.updateGameInfo('Next player is white.');
    },

    updateGameInfo: function (status) {
        $('#info-status').html(status);
        $('#info-fen').html(this.chess.fen());
        $('#info-pgn').html(this.chess.pgn());
    },

    pieceMove: function (move) {

        var nextPlayer,
          status,
          chessMove = this.chess.move({
              from: move.from,
              to: move.to,
              promotion: 'q'
          });


        nextPlayer = 'white';
        if (this.chess.turn() === 'b') {
            nextPlayer = 'black';
        }

        if (chessMove !== null) {
            if (this.chess.in_checkmate() === true) {
                status = 'CHECKMATE! Player ' + nextPlayer + ' lost.';
            } else if (this.chess.in_draw() === true) {
                status = 'DRAW!';
            } else {
                status = 'Next player is ' + nextPlayer + '.';

                if (this.chess.in_check() === true) {
                    status = 'CHECK! ' + status;
                }
            }

            this.updateGameInfo(status);
        }

        // Actualizamos el board
        this.raw.board = this.chess.fen();

        // Mandar fen al servidor
        this.sendMove(move);
        

        return this.chess.fen();
    },

    sendMove: function (move) {
        this.raw.move = move;
        var socket = this.socketManager.getSocket();
        socket.emit('sendMoveToServer', {
            raw: this.raw
        })
    },

    pieceSelected: function (notationSquare) {
        var i,
          movesNotation,
          movesPosition = [];

        movesNotation = this.chess.moves({ square: notationSquare, verbose: true });
        for (i = 0; i < movesNotation.length; i++) {
            movesPosition.push(ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
        }
        return movesPosition;
    },

    moveRival: function (raw) {
        this.pieceMoveRival(raw);
    },

    pieceMoveRival: function (raw) {
        var move = raw.move;
        var fen = raw.board;
        
        
        this.chess.load(fen);
        this.board.setPosition(fen)

        var nextPlayer,
          status,
          chessMove = this.chess.move({
              from: move.from,
              to: move.to,
              promotion: 'q'
          });


        nextPlayer = 'white';
        if (this.chess.turn() === 'b') {
            nextPlayer = 'black';
        }

        if (chessMove !== null) {
            if (this.chess.in_checkmate() === true) {
                status = 'CHECKMATE! Player ' + nextPlayer + ' lost.';
            } else if (this.chess.in_draw() === true) {
                status = 'DRAW!';
            } else {
                status = 'Next player is ' + nextPlayer + '.';

                if (this.chess.in_check() === true) {
                    status = 'CHECK! ' + status;
                }
            }

            this.updateGameInfo(status);
        }

        // Actualizamos el board
        this.raw.board = this.chess.fen();        

        return this.chess.fen();
    }
})