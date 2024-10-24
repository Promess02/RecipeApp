class CategoriesDAO {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    getAllCategories() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Categories';
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    createCategory(category) {
        return new Promise((resolve, reject) => {
            const { category_name, category_type, category_description } = category;

            const sql = `
                INSERT INTO Categories (category_name, category_type, category_description)
                VALUES (?, ?, ?)`;

            const params = [category_name, category_type, category_description];

            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ category_id: this.lastID });
                }
            });
        });
    }
}

module.exports = CategoriesDAO;
