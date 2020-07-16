const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:224225226227@localhost/test');
const {Op} = Sequelize;
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        getUser(id:Int): User
        
    }
    type User {
        id: Int
        name: String
    }

`);
app.use('/graphql', express_graphql( (req, res) => ({ //объект не подойдет, так как контекст разный от запроса к запросу.
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {user: req.user, session: req.session} //сразу для JWT и cookie-session
})))

class User extends Sequelize.Model {
    get age(){
        const now = (new Date()).getTime();
        const ageInMs = (now - this.birthday.getTime());
        const yearInMs = (1000 * 60 * 60 * 24 * 365.25);
        return ageInMs/yearInMs;
    };
    get money(){
        return this.getMoney();
    }
};

User.init({
    username: Sequelize.STRING,
    birthday: Sequelize.DATE,
    password: Sequelize.STRING
}, { sequelize, modelName: 'user' });


class Money extends Sequelize.Model {
    get balance() {
        return (async () => {
            let ins = await this.getIns();
            let inSum = !ins ? 0: ins.reduce((a,b) => a + (+b.amount), 0);
            let outs = await this.getOuts();
            let outSum = !outs ? 0 : outs.reduce((a,b) => a + (+b.amount), 0);
            return inSum - outSum;
        })();
    }

    async balanceBefore(date){
        let ins = await Transaction.scope('before', date).findOne({where: {inId: this.id}});
        let inSum = !ins ? 0: ins.reduce((a,b) => a + (+b.amount), 0);
        let outs = await Transaction.scope({method: ['before', date]}).findOne({where: {outId: this.id}});
        let outSum = !outs ? 0 : outs.reduce((a,b) => a + (+b.amount), 0);
        return inSum - outSum;
    }
};




Money.init({
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    currency: Sequelize.STRING
}, { sequelize, modelName: 'money' });

class Transaction extends Sequelize.Model {

};

Transaction.init({
    amount: Sequelize.DECIMAL
}, { sequelize, modelName: 'transaction', scope: {before(date) {
    return {
        where: {
            createdAt: {
                [Op.lte]: date
            }
        }
    }
}} });


User.hasMany(Money);
Money.belongsTo(User);

Transaction.belongsTo(Money, {as: 'in', sourceKey: 'inId'});
Transaction.belongsTo(Money, {as: 'out', sourceKey: 'outId'});

Money.hasMany(Transaction, {as: 'ins', foreignKey: 'inId'});
Money.hasMany(Transaction, {as: 'outs', foreignKey: 'outId'});


async function getUser({id}){
    return await User.findByPk(id);
}

// // console.log(User.prototype);
// // console.log(Money.prototype);


// (async () => {
//     let vasya = await User.findOne({where: {userName: 'Vasya'}}) || await User.create({username: 'Vasya', password: '123'});
//     let firstMoney = await vasya.createMoney({name: 'monobank',});
//     let secondMoney = await vasya.createMoney({name: 'privat'});
//     // console.log(await firstMoney.getUser());
//     // console.log(await secondMoney.getUser());        //.getMoney();
// })();
// 
// Transaction.create({amount: 100000, inId: 1, outId: 2}); 
// (async ()=> {
    
//     let zana4ka = await Money.findOne();
//     console.log(await zana4ka.balance);
// })();

// (async ()=> {
    
//     let zana4ka = await Money.findOne();
//     console.log(await zana4ka.balanceBefore(new Date(new Date().getTime()-1*60*60*1000)));
// })();

// console.log(Money.prototype)


let abc = new User();
console.log(abc.money);

// console.log(User.prototype);
sequelize.sync();