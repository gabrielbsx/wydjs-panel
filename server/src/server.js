const   express     = require("express"),
        cors        = require("cors"),
        morgan      = require("morgan"),
        sequelize   = require("sequelize"),
        helmet      = require('helmet'),
        compression = require("compression"),
        jwt         = require('jsonwebtoken');

require("dotenv").config();
app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.set('trust proxy', 1);
app.use(require('./routes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
