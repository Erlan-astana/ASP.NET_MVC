/// <reference path="../../Views/Shared/Users.cshtml" />
/// <reference path="../../Views/Shared/Admins.cshtml" />
$(function () {

    //loginDemo-----------   
    console.log("loginDemo.js");

    var rootUrl = "/";
    var app = {};  
    var param_id=1;
    selectUser();
    function selectUser() {

        app.selectUser = $('.selectUser').kendoDropDownList({
            dataSource: [{ ID: 1, NAME: "Администратор" }, { ID: 2, NAME: "Модератор" }, { ID: 3, NAME: "Мұғалім" }, { ID: 4, NAME: "Оқушы" }],
            dataTextField: "NAME",
            dataValueField: "ID",
            change: function () {
                var dataItem = this.dataItem(this.select());
                param_id = dataItem.ID;

            }
        }).getKendoDropDownList();
    }
             
    $('#Submit1').click(function () {        
       
        $.post(rootUrl + 'Login/selectUser', {
            id: param_id,           
            val_log:  $("#login_input").val(),
            val_pass: $("#pass_input").val()

        }, function (data) {
            if (data.ErrorMessage) {
                openAlertWindow(data.ErrorMessage);

            } else {
                console.log(data);
                $.map(data, function (item) {
                    openAlertWindow("welcome " + item.FIO);
                    //if (data[0]) {
                    //    $('#container').html('');
                    //    if (data[1] == 'student') { $('#container').load("JURNAL", "Home"); }
                    //    else if (data[1] == 'teacher') { $('#container').load(teacher.php); }
                    //}
                    // window.location.replace("http://localhost:64143/Home/Index"); @Url.Action("JURNAL", "Home")
                   
                    if(param_id==1)
                        window.location.href = "/Home/TBL_TEACHERS";
                    if (param_id == 2)
                        window.location.href = "/Home/TBL_TEACHERS";
                    if (param_id == 3)
                        window.location.href = "/Home/JURNAL";
                    if (param_id == 4)
                        window.location.href = "/Home/Student";

                });                
           
            }         

        });

    });     

});
