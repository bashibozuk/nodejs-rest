/**
 * Created by vasil on 3/30/16.
 */
var Storage = (function(){

    var pks = {};

    var data = {};

    function createCollection(name) {
        if (!data[name]) {
            data[name] = {};
        }

        if (!pks[name]) {
            pks[name] = 1;
        }
    }

    function nextKey(collection) {
        return pks[collection] ? pks[collection]++ : 0 ;
    }

    return {
        list: function(collectionName) {
            var list = [];
            if (!data[collectionName]) {
                return list;
            }

            for (var i in data[collectionName]) {
                list.push(data[collectionName][i]);
            }

            return list;
        },

        read: function (collectionName, pk) {
            return data[collectionName] && data[collectionName][pk] ? data[collectionName][pk] : null;
        },

        create: function (collectionName, item) {
            if (!data[collectionName]) {
                createCollection(collectionName);
            }

            item.id = nextKey(collectionName);

            data[collectionName][item.id] = item;

            return item;
        },

        update: function (collection, pk, props) {
            if (!data[collection]) {
                return false;
            }
            var old = data[collection][pk];

            if (!old) {
                return false;
            }

            for (var key in props) {
                old[key] = props[key];
            }

            return old;
        },
        remove : function (collectionName, pk) {
            if (data[collectionName] && data[collectionName][pk]) {
                delete data[collectionName][pk];
            }
        }


    }
}());

module.exports = Storage;