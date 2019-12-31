var dataService = function () {
    var urlBase = 'http://localhost:38129/api/customers',

        authenticate = function (authToken) {
            return $.ajax({
                url: "api/authentication",
                type: "POST",
                beforeSent: function (request) {
                    request.setRequestHeader("AuthToken", authToken);
                }
            })
        },

        getCustomers = function () {
            return $.getJSON(urlBase);
        }

    updateCustomer = function (cust) {
        return $.ajax({
            url: urlBase + '/' + cust.ID,
            data: cust,
            type: 'PUT'
        });
    },

        getCustomer = function (id) {
            return $.getJSON(urlBase + '/' + id);
        },

        getCustomerJSONP = function (id) {
            return $.getJSON(urlBase + '/' + id + '?callback=?');
        },

        getCustomerAndOrders = function (id) {
            var promises = [getCustomer(custID), getOrders(custID)];
            return $.when.apply($, promises);

        },

        insertCustomer = function (cust) {
            return $.ajax({
                url: urlBase,
                data: cust,
                type: 'POST'
            });
        },

        deleteCustomer = function (id) {
            return $.ajax({
                url: urlBase + '/' + id,
                type: 'DELETE'
            });
        },

        getOrders = function (id) {
            return $.getJSON(urlBase + '/' + id + '/orders');
        };

    return {
        authenticate: authenticate,
        getCustomer: getCustomer,
        getCustomerJSONP: getCustomerJSONP,
        insertCustomer: insertCustomer,
        deleteCustomer: deleteCustomer,
        getOrders: getOrders,
        getCustomers: getCustomers,
        updateCustomer: updateCustomer,
        getCustomerAndOrders: getCustomerAndOrders
    };
}();