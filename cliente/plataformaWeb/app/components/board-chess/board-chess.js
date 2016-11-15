Polymer({

    is: 'board-chess',

    properties: {
        board: String
    },

    attached: function () {
        //var board = new Chessboard('board', this.board);
        //this.$.board.addEventListener('click', function () { console.log(board.getPosition(ChessUtils.FEN.id)) });
        this.$.buttonBackToMenu.addEventListener('click', function () { this._backToMenu() }.bind(this));
        document.addEventListener('loadBoardChess', function (evt) { this._loadGame(evt.detail.board) }.bind(this))
    },

    _loadGame: function (board) {
        this.$.paperDrawerPanelChess.style.visibility = 'visible';
        var chess = new Chess();
        chess.load(board);
        var board = new Chessboard('board', {
            position: board,
            eventHandlers: {
                onPieceSelected: pieceSelected,
                onMove: pieceMove
            }
        });



        function resetGame() {
            board.setPosition(ChessUtils.FEN.startId);
            chess.reset();

            updateGameInfo('Next player is white.');
        }

        function updateGameInfo(status) {
            $('#info-status').html(status);
            $('#info-fen').html(chess.fen());
            $('#info-pgn').html(chess.pgn());
        }

        function pieceMove(move) {

            var nextPlayer,
              status,
              chessMove = chess.move({
                  from: move.from,
                  to: move.to,
                  promotion: 'q'
              });


            nextPlayer = 'white';
            if (chess.turn() === 'b') {
                nextPlayer = 'black';
            }

            if (chessMove !== null) {
                if (chess.in_checkmate() === true) {
                    status = 'CHECKMATE! Player ' + nextPlayer + ' lost.';
                } else if (chess.in_draw() === true) {
                    status = 'DRAW!';
                } else {
                    status = 'Next player is ' + nextPlayer + '.';

                    if (chess.in_check() === true) {
                        status = 'CHECK! ' + status;
                    }
                }

                updateGameInfo(status);
            }
            console.log(chess.fen())
            return chess.fen();
        }

        function pieceSelected(notationSquare) {
            var i,
              movesNotation,
              movesPosition = [];

            movesNotation = chess.moves({ square: notationSquare, verbose: true });
            for (i = 0; i < movesNotation.length; i++) {
                movesPosition.push(ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
            }
            return movesPosition;
        }
    },

    _backToMenu: function () {
        this.$.paperDrawerPanelChess.style.visibility = 'hidden';
    }
})