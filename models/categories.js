var mongoose = require('mongoose');
var q = require('q');

//Определяем структуру сущности пользователя
var categoriesSchema = new mongoose.Schema({
    name: String
});

var Category = mongoose.model('Categories', categoriesSchema);

//Инициализация модели пользовател
var categoryModel = {};

//Заполняем нашу базу, для этого берем пользователй у гитхаба и дополняем их собственной информацией
categoryModel.seed = function(){
    var defaultCategory1 = new Category({
        name: 0,
    });
    defaultCategory1.save(function(err, category) {
        if(err) console.dir('error occured in populating database');
    });
    var defaultCategory2 = new Category({
        name: 1,
    });
    defaultCategory2.save(function(err, category) {
        if(err) console.dir('error occured in populating database');
    });
    var defaultCategory3 = new Category({
        name: 2,
    });
    defaultCategory3.save(function(err, category) {
        if(err) console.dir('error occured in populating database');
    });
    var defaultCategory4 = new Category({
        name: 3,
    });
    defaultCategory4.save(function(err, category) {
        if(err) console.dir('error occured in populating database');
    });
};

//Возвращаем всех пользователей, используем параметры для постепенной загрузки или пагинации
categoryModel.get = function(){
    var results = q.defer();
    Category.find(function(err, categories) {
        if (err){
            results.reject(err);
        }
        results.resolve(categories);
    }).skip(skip).limit(limit);
    return results.promise;
};


module.exports = categoryModel;