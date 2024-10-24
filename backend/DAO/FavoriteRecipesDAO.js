class FavoriteRecipesDAO {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    getFavoritesByUser(user_id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT Recipes.recipe_name, FavoriteRecipes.update_date
                FROM FavoriteRecipes
                JOIN Recipes ON FavoriteRecipes.recipe_id = Recipes.recipe_id
                WHERE FavoriteRecipes.user_id = ?`;

            this.db.all(sql, [user_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    addFavorite(user_id, recipe_id, update_date) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO FavoriteRecipes (user_id, recipe_id, update_date)
                VALUES (?, ?, ?)`;

            this.db.run(sql, [user_id, recipe_id, update_date], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ favorite_id: this.lastID });
                }
            });
        });
    }

    removeFavorite(user_id, recipe_id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM FavoriteRecipes WHERE user_id = ? AND recipe_id = ?';

            this.db.run(sql, [user_id, recipe_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ deleted: this.changes });
                }
            });
        });
    }
}

module.exports = FavoriteRecipesDAO;
