$(function () {

    //Student-----------
    var SUBJECT_ID;  var CLASS_NAME="11";  var STUDENS_ID = 20;
    console.log("Student.js");
    
    var rootUrl = "/";
    var app = {};
    get_ValueSubject();
    
    createControllers();
    createGrid();    
    button();    
    Search();
    initVars();
    ConvertJsonDateString();

    function ConvertJsonDateString(jsonDate) {
        var shortDate = null;
        if (jsonDate) {
            var regex = /-?\d+/;
            var matches = regex.exec(jsonDate);
            var dt = new Date(parseInt(matches[0]));
            var month = dt.getMonth() + 1;
            var monthString = month > 9 ? month : '0' + month;
            var day = dt.getDate();
            var dayString = day > 9 ? day : '0' + day;
            var year = dt.getFullYear();
            shortDate = dayString + '.' + monthString + '.' + year;
        }
        return shortDate;
    };

    function initVars() {

        app.paramQuery = {};
        app.paramQuery.filter = 1;

    }

    function button() {

        // жанарту
        $('.btn-refresh').click(function () {
            var valueSubject = SUBJECT_ID;          
            var valueData = $("#SearchInput_Data").val();

            $.post(rootUrl + 'Home/Search_Method', {
                ValueSubject: valueSubject,               
                ValueData: valueData,

            }, function (data) {
                if (data.ErrorMessage) {
                    openAlertWindow(data.ErrorMessage);

                } else {
                    console.log(data);
                    app.grid.dataSource.data(data);
                }
            });

        })      

        //-----excel
        $('.btn-excel').click(function () {
            console.log("excel");
            app.grid.saveAsExcel();

        });
    }

    function createControllers() {
        
        $("#datePicker").kendoDatePicker({
            start: "month",
            depth: "month",
            format: "yyyy/MM/dd",  //"yyyy.MM.dd"
            change: pikcerChange_datePicker
        });

        function pikcerChange_datePicker() {
            var pikcer = $("#datePicker").data('kendoDatePicker');
            var mydate = pikcer.value();
            if (mydate) {

                console.log(mydate);
            }
            return mydate;

        }


        app.cmbx_Subject = $('.cmbx_Subject').kendoComboBox({
            dataTextField: "NAME",
            dataValueField: "ID",
            change: function () {
                var dataItem = this.dataItem(this.select());
                console.log(dataItem, dataItem.ID);
                SUBJECT_ID = dataItem.ID;

            }
        }).data('kendoComboBox');
        }

    //таблица грид 
    function createGrid() {

        app.grid = $('#div-grid').kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 100
            },
            excel: {
                fileName: "Kendo UI Grid Export.xlsx"
            },
            pdf: {
                allPages: true,
                avoidLinks: true,
                paperSize: "A4",
                margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                landscape: true,
                repeatHeaders: true,
                template: $("#page-template").html(),
                scale: 0.8
            },

            height: 400,
            scrollable: true,
            selectable: 'row',
            columns: [
               {
                   field: "FIO",
                   title: "Аты-жөні"
               },

                {
                    field: "DATE",
                    title: "Уақыты"
                },
                        {
                            field: "ASSESSMENT",
                            title: "Бағасы"
                        }
            ],
            resizable: true
        }).getKendoGrid();

    }
    
    $("#SearchInput_Data").kendoDatePicker({
        start: "month",
        depth: "month",
        format: "yyyy/MM/dd",  //"yyyy.MM.dd"
        change: pikcerChange
    });

    function pikcerChange() {
        var pikcer = $("#SearchInput_Data").data('kendoDatePicker');
        var MyDate = pikcer.value();
        if (MyDate) {

            console.log(MyDate);
        }
        return MyDate;

    }

    function get_ValueSubject() {

        $.post(rootUrl + 'Home/get_ValueSubject', function (data) {
            if (data.ErrorMessage) {
                openAlertWindow(data.ErrorMessage);
            } else {
                app.cmbx_Subject.dataSource.data(data);

            }
        });
    }
          
    //GET_JURNAL
    //----запрос искать по предемету классу и по дате
    var array = [];
    function Search() {
        $('.btn-Search').click(function () {
            var valueSubject = SUBJECT_ID;
            var valueClass = CLASS_NAME;
            var valueData = $("#SearchInput_Data").val();

            $.post(rootUrl + 'Home/Search_Method', {
                ValueSubject: valueSubject,
                ValueClass: valueClass,
                ValueData: valueData,

            }, function (data) {
                if (data.ErrorMessage) {
                    openAlertWindow(data.ErrorMessage);

                } else {
                    console.log(data);
                    
                        $.map(data, function (item) {                           
                            if (item.STUDENS_ID == STUDENS_ID) {
                                array.length = 0;
                                array.push(item);
                                return;
                            } 
                        });
                    }                  
                    app.grid.dataSource.data(array);
                    array.length = 0;
               
            });

        });
    }

});
