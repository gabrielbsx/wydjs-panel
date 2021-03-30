const   express     = require('express'),
        cors        = require('cors'),
        morgan      = require('morgan'),
        helmet      = require('helmet'),
        compression = require('compression'),
        jwt         = require('jsonwebtoken'),
        ejs         = require('ejs'),
        engine      = require('ejs-locals'),
        flash       = require('express-flash-messages'),
        path        = require('path')
        routes      = require('./routes');

require('dotenv').config();
app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.set('trust proxy', 1);

app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`);
});
