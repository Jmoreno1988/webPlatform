Polymer({

    is: 'board-chess',

    properties: {
        fen: String,
        chess: Object,
        board: Object
    },

    attached: function () {

        //var board = new Chessboard('board', this.board);
        //this.$.board.addEventListener('click', function () { console.log(board.getPosition(ChessUtils.FEN.id)) });
        this.$.buttonBackToMenu.addEventListener('click', function () { this._backToMenu() }.bind(this));
        document.addEventListener('loadBoardChess', function (evt) { this._loadGame(evt.detail.fen) }.bind(this))
    },

    _loadGame: function (fen) {
        this.$.paperDrawerPanelChess.style.visibility = 'visible';
        this.chess = new Chess();
        this.chess.load(fen);
        this.board = new Chessboard('board', {
            position: fen,
            eventHandlers: {
                onPieceSelected: this._pieceSelected.bind(this),
                onMove: this._pieceMove.bind(this)
            }
        });
    },

    _pieceMove: function (move) {
        var nextPlayer = null;
        var status = null;
        var chessMove = this.chess.move({
            from: move.from,
            to: move.to,
            promotion: 'q'
        });


        nextPlayer = 'white';
        if (this.chess.turn() === 'b') 
            nextPlayer = 'black';
        

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

            this._updateGameInfo(status);
        }

        return this.chess.fen();
    },


    _pieceSelected: function (notationSquare) {
        var i,
          movesNotation,
          movesPosition = [];

        movesNotation = this.chess.moves({ square: notationSquare, verbose: true });
        for (i = 0; i < movesNotation.length; i++) {
            movesPosition.push(ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
        }
        return movesPosition;
    },

    _resetGame: function () {
        this.board.setPosition(ChessUtils.FEN.startId);
        this.chess.reset();

        this.updateGameInfo('Next player is white.');
    },


    _updateGameInfo: function (status) {
        $('#info-status').html(status);
        $('#info-fen').html(this.chess.fen());
        $('#info-pgn').html(this.chess.pgn());
    },


    // Metodos de la interface

    _backToMenu: function () {
        this.$.paperDrawerPanelChess.style.visibility = 'hidden';
    }
})