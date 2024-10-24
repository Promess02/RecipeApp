const sqlite3 = require('sqlite3').verbose();

class RecipesDAO {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    getAllRecipes() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Recipes';
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getRecipeById(recipe_id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Recipes WHERE recipe_id = ?';
            this.db.get(sql, [recipe_id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    createRecipe(recipe) {
        return new Promise((resolve, reject) => {
            const {
                recipe_name,
                ingredients,
                instructions,
                prepare_time,
                dish_category_id,
                diet_category_id,
                calories,
                image_path,
                num_of_portions,
                update_date,
                author_id
            } = recipe;

            const sql = `
                INSERT INTO Recipes (recipe_name, ingredients, instructions, prepare_time, dish_category_id, diet_category_id, calories, image_path, num_of_portions, update_date, author_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const params = [recipe_name, ingredients, instructions, prepare_time, dish_category_id, diet_category_id, calories, image_path, num_of_portions, update_date, author_id];

            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ recipe_id: this.lastID });
                }
            });
        });
    }

    updateRecipe(recipe_id, recipe) {
        return new Promise((resolve, reject) => {
            const {
                recipe_name,
                ingredients,
                instructions,
                prepare_time,
                dish_category_id,
                diet_category_id,
                calories,
                image_path,
                num_of_portions,
                update_date,
                author_id
            } = recipe;

            const sql = `
                UPDATE Recipes
                SET recipe_name = ?, ingredients = ?, instructions = ?, prepare_time = ?, dish_category_id = ?, diet_category_id = ?, calories = ?, image_path = ?, num_of_portions = ?, update_date = ?, author_id = ?
                WHERE recipe_id = ?`;

            const params = [recipe_name, ingredients, instructions, prepare_time, dish_category_id, diet_category_id, calories, image_path, num_of_portions, update_date, author_id, recipe_id];

            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ updated: this.changes });
                }
            });
        });
    }

    deleteRecipe(recipe_id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Recipes WHERE recipe_id = ?';
            this.db.run(sql, [recipe_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ deleted: this.changes });
                }
            });
        });
    }
}

module.exports = RecipesDAO;