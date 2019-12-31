var customersPage = function () {
    var urlBase = "http://localhost:38129/api/customers",
        init = function () {
            $("#GetCustomers").click(function () {
                getCustomers();
            });

            $("#UpdateCustomer").click(function () {
                updateCustomer();
            });

            $("#InsertCustomer").click(function () {
                insertCustomer();
            });

            $("#DeleteCustomer").click(function () {
                deleteCustomer();
            });

            $("#GetCustomerOrders").click(function () {
                getCustomerOrders(1);
            });

            $("#GetCustomerJSONP").click(function () {
                getCustomerJSONP(1);
            });
        },

        getCustomers = function () {
            dataService.getCustomers()
                .done(function (custs) {
                    var custsHtml = ""
                    for (var i = 0; i < custs.length; i++) {
                        custsHtml += "<li>" + custs[i].FirstName + " " + custs[i].LastName + "&nbsp;</li>";
                    }
                    $("#CustomersContainer").html(custsHtml);
                })
                .fail(function () {
                    alert("Unable to get customers");
                });
        },


        updateCustomer = function () {
            //Simulate customer data
            var cust = {
                ID: 2,
                FirstName: "Michelle",
                LastName: "Smith"
            };

            dataService.updateCustomer(cust)
                .done(function () {
                    updateStatus("Updated Customers! Refeshing customer list");
                    getCustomers();
                })
                .fail(function (jqXHR, textStatus, err) {

                })
        },

        insertCustomer = function () {
            //Fake customer data
            var cust = {
                ID: 10,
                FirstName: "JoJo",
                LastName: "Pikidily"
            };
            dataService.insertCustomer(cust)
                .done(function () {
                    updateStatus("Inserted Customer! Refreshing customer list.");
                    getCustomers();
                }).
                fail(function (jqXHR, textStatus, err) {
                    alert("Unable to insert customer: " + textStatus);
                });
        },

        deleteCustomer = function () {
            dataService.deleteCustomer(10)
                .done(function () {
                    updateStatus("Deleted Customer! Refreshing customer list.");
                    getCustomers();
                })
                .fail(function (jqXHR, textStatus, err) {
                    alert("Unable to delete customer: " + textStatus);
                });
        },

        getCustomerOrders = function (custID) {
            dataService.getOrders(custID).done(function (orders) {
                var ordersHtml = ""
                for (var i = 0; i < orders.length; i++) {
                    ordersHtml += "<li>" + orders[i].ProductTitle + "</li>";
                }
                $("#OrdersContainer").html(ordersHtml);
            });
        },

        updateStatus = function (msg) {
            $("#OutputDiv").html(msg);
        },

        getCustomerJSONP = function (id) {
            dataService.getCustomerJSONP(id).done(function (cust) {
                alert("Customer retrieved using JSONP: " + cust.FirstName + " " + cust.LastName);
            });
        };

    return {
        init: init
    };

}();