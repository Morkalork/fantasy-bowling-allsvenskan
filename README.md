# Fantasy BowlingAllsvenskan

Since I (Magnus Ferm) started this project I've had to get a lot more acquainted with technologies such as Docker and MongoDB. Being a frontend developer that means there are things I am not completely used to and the whole concept of NoSQL databases is a bit new to me. Therefore there will be some comments and documentation that might seem odd if you know all this, but it's just so I don't forget how to do some things :)

## To get started

```
npm i
npm run dev
```

## To check the database through Docker

Open up Docker for Windows, select `fantasy-bowling-allsvenskan` and open a CLI for the mongo image
Select the admin database (`use admin`) and login (this example using the default settings): `db.auth("fbauser", "secret")`
Then select the fba database: `use fba` and show collections (`show collections`).
To show all entries in a collection, just write: `db.playerinfo.find()`. To find a specific one, do `db.playerinfo.find({"name": "Magnus Ferm"})` or `db.playerinfo.find({"name": /^Magnus/})` (everyone with a name beginning with Magnus).

