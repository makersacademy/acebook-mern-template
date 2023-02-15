
switch (process.env.NODE_ENV) {
    case "test":
        require("dotenv").config({path: `${process.cwd()}/.env.test.local`});
        break;
    case "development":
        require("dotenv").config({path: `${process.cwd()}/.env.development.local`});
        break;
    case "production":
        require("dotenv").config({path: `${process.cwd()}/.env.production.local`});
        break;
    default:
        require("dotenv").config({path: `${process.cwd()}/.env.development.local`});
        break
}



