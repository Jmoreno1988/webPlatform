ModelGames.prototype.constructor = ModelGames;

function ModelGames(nameTable, sq, Sequelize) {
	this.model = sq.define(nameTable, {
            idCreator: { type: Sequelize.INTEGER },
            idFollow: { type: Sequelize.INTEGER },
            nameCreator: { type: Sequelize.STRING },
            nameFollow: { type: Sequelize.STRING },
            turn: { type: Sequelize.INTEGER },
            board: { type: Sequelize.STRING },
            type: { type: Sequelize.STRING }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
    });
}

/** Getters & Setters **/
ModelGames.prototype.getModel = function () {
	return this.model;
}