const fs = require('fs');
const csv = require('csv-parser');

// Load CSV data
function load_data(csv_file) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(csv_file, { encoding: 'utf-8' })
            .pipe(csv())
            .on('data', (row) => {
                console.log(row);
                data.push(row);
            })
            .on('end', () => {
                resolve(data);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Search function
function search(query, data) {
    const results = [];
    const pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
    const lowercaseQuery = query.toLowerCase();
    data.forEach((row) => {
        const lowercaseName = row['Doctor Name'].toLowerCase();
        const lowercaseArea = row['Doctor Area'].toLowerCase();
        const lowercaseLocation = row['Doctor Location'].toLowerCase();
        if (
            pattern.test(lowercaseName) ||
            pattern.test(lowercaseArea) ||
            pattern.test(lowercaseLocation)
        ) {
            results.push(row);
        }
    });
    return results;
}


// Example usage
async function searche(name) {
    const csv_file = 'doctors.csv';
    try {
        const data = await load_data(csv_file);
        const results = search(name, data);
        if (results.length > 0) {
            return results;
        } else {
            return 'no results found';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'error';
    }
}

// Call the searche function with the query string
searche('rishi').then((results) => {
    console.log(results);
});
