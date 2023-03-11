// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path        = require('path'),
    db_host     = process.env['NKDANCESERVICES_MARIADB_1_PORT_3306_TCP_ADDR'] || '172.17.0.2',
    db_password = process.env['NKDANCESERVICES_MARIADB_1_ENV_MARIADB_PASSWORD'] || 'nkdanceservices@123',
    db_database = process.env['NKDANCESERVICES_MARIADB_1_ENV_MARIADB_DATABASE'] || 'nkdanceservices',
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://www.nkdanceservices.com',
        mail: {
            from: '"Kaosochi Ezigboh" <kaosochi@nkdanceservices.com>',
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: 'postmaster@sandboxa6e156c8e3a14c3f824af89662fc520d.mailgun.org',
                    pass: '19ec2851acb3ef432bce20f4e9a55780'
                }
            }
        },
        database: {
            client: 'mysql',
            connection: {
                host     : db_host,
                user     : 'root',
                password : db_password,
                database : db_database,
                charset  : 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2368'
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',
        mail: {
            from: '"Kaosochi Ezigboh" <kaosochi@nkdanceservices.com>',
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: 'postmaster@sandboxa6e156c8e3a14c3f824af89662fc520d.mailgun.org',
                    pass: '19ec2851acb3ef432bce20f4e9a55780'
                }
            }
        },

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'mysql',
            connection: {
                host     : 'localhost',
                user     : 'root',
                password : 'password',
                database : 'ghost',
                charset  : 'utf8',
                port: '3306'
            }
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;
