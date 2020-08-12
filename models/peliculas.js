const getNewMovies = (amNewountOfMovies) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM shows  WHERE original_release_year = 2019 or original_release_year = 2018 or  original_release_year = 2017 or  original_release_year = 2016 or  original_release_year = 2015 or  original_release_year = 2014 or  original_release_year = 2013 or  original_release_year = 2012 ORDER BY tmdb_popularity DESC LIMIT 49 `, (err, result) => {
            if (err) reject(err);
            resolve(format(result))
        })
    })
};

const getMoreMovies = (from, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM shows  WHERE original_release_year = 2019 or original_release_year = 2018 or  original_release_year = 2017 or  original_release_year = 2016 or  original_release_year = 2015 or  original_release_year = 2014 or  original_release_year = 2013 or  original_release_year = 2012 ORDER BY tmdb_popularity DESC LIMIT ? `, [limit], (err, rows) => {
            if (err) { reject(err) }
            rows = format(rows)
            let result = []
            for (let i = from; i < limit; i++) {
                result.push(rows[i]);
            }
            resolve(result)
        })
    })
};

const searchByTitle = (title) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM shows WHERE title = '${title}'`, (err, result) => {
            if (err) reject(err);
            resolve(format(result));
        })
    })
};

const searchById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT *  FROM shows WHERE id = ?`, [id], (err, result) => {
            if (err) reject(err);
            resolve(format(result));
        });
    });
};

const getProviders = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM providers', (err, result) => {
            if (err) reject(err)
            resolve(format(result))
        })
    })
};

const getGenresById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM genres WHERE id = ?', [id], (err, result) => {
            if (err) reject(err);
            console.log(result)
            resolve(format(result));
        })
    })
}

const getMoviesByProvider = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM shows  WHERE original_release_year = 2019 or original_release_year = 2018 or  original_release_year = 2017 or  original_release_year = 2016 or  original_release_year = 2015 or  original_release_year = 2014 or  original_release_year = 2013 or  original_release_year = 2012 AND offers LIKE '%${id}%'  ORDER BY tmdb_popularity DESC LIMIT 49`), (err, result) => {
            if (err) reject(err)
            resolve(format(result))
        }
    })
}

const autocomplete = (query) => {
    query.replace(' ', '%');
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM shows WHERE title LIKE '%${query}%' or original_title LIKE '%${query}%' ORDER BY tmdb_popularity DESC LIMIT 6`, (err, result) => {
            if (err) reject(err);
            resolve(format(result));
        });
    });
}

const getReleatedMovies = (genreIds) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM shows WHERE genre_ids like  ? ORDER BY tmdb_popularity DESC LIMIT 10', [genreIds], (err, result) => {
            if (err) reject(err);
            resolve(format(result))
        })
    })
}

function format(json) {
    if (json != undefined) {
        json.forEach(element => {
            for (const key in element) {
                if (typeof element[key] == 'string') {
                    element[key] = element[key].replace(/ç/g, "'");
                };
            };
        });
    }
    return json;
};

module.exports = {
    getNewMovies: getNewMovies,
    searchByTitle: searchByTitle,
    searchById: searchById,
    getProviders: getProviders,
    getGenresById: getGenresById,
    autocomplete: autocomplete,
    getMoreMovies: getMoreMovies,
    getReleatedMovies: getReleatedMovies,
    getMoviesByProvider: getMoviesByProvider
};