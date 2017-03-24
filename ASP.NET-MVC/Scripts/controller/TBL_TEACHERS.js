$(function () {

    //Subject-----------

    var rootUrl = "/";
    var app = {};
    get_ValueSubject();
   cmbx_subject();
    createGrid();
    createWindow();
    button();  
    initVars();
    ConvertJsonDateString();
    get_ValueTeacher();
    var subject;

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
      //  app.paramQuery.filter = 1;

    }

    function button() {

        //button insert ---Қосу
        $('.btn-ins').click(function () {           
            app.editMode = "add";
            setRecord();
            app.modalInstrumentsWindow.open();
        });

        //button save -- Сақтау
        $('.btn-save').click(saveRecord);

        //----өзгерту
        $('.btn-update').click(function () {
            
            app.editMode = "edit";
            setEdit();

        });

        // жанарту
        $('.btn-refresh').click(function () {
            get_ValueTeacher();
        })

        //----жою
        $('.btn-del').click(function () {

            var dataItem = app.grid.dataItem(app.grid.select());
            if (dataItem == null) {
                openAlertWindow("Таңдалмады!");
                return;
            }

            openAlertWindow("Шыныменде жойғыңыз келеді ме?", {
                yes: function () {
                    $.post(rootUrl + 'Home/del_TBL_TEACHER', { ID: dataItem.ID },
                        function (data) {
                            if (data.ErrorMessage) {
                                openAlertWindow(data.ErrorMessage);
                            } else {
                                get_ValueTeacher();
                                app.modalInstrumentsWindow.close();
                            }
                        });

                }
            });

        });


    }
    var dataItem_NAME;
    function cmbx_subject() {
        app.cmbx_subject = $('.cmbx_subject').kendoComboBox({
            dataTextField: "NAME",
            dataValueField: "ID",
            placeholder: "Класс тандау",
            change: function () {
                var dataItem = this.dataItem(this.select());
                console.log("осы жерде cmbx_subject", dataItem.NAME);
                dataItem_NAME = dataItem.NAME;
            }
        }).data('kendoComboBox');


    }
    function get_ValueSubject() {

        $.post(rootUrl + 'Home/get_ValueSubject', function (data) {
            if (data.ErrorMessage) {
                openAlertWindow(data.ErrorMessage);
            } else {
                app.cmbx_subject.dataSource.data(data);

            }
        });
    }
    function get_ValueTeacher() {

        $.post(rootUrl + 'Home/get_ValueTeacher', function (data) {
            if (data.ErrorMessage) {
                openAlertWindow(data.ErrorMessage);
            } else {
                app.grid.dataSource.data(data);

            }
        });
    }
    //таблица грид 
    function createGrid() {

        app.grid = $('#div-grid').kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 50
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
                    field: "LOGIN",
                    title: "Логин"
                },
                        {
                            field: "PASSWORD",
                            title: "Пароль"
                        },

                         {
                             field: "SUBJECTS",
                             title: "Пән"
                         }
                       
            ],
            resizable: true
        }).getKendoGrid();

    }
    //окно виндоу моделное окно 
    function createWindow() {

        app.modalInstrumentsWindow = $('.div-window').kendoWindow({
            width: "550px",
            height: "360px",
            title: "Жаңа мәліметтер қосу",
            visible: false,
            modal: true,
            resizable: false,
            draggable: true,
            actions: ["Close"],
            open: function () {

            }
        }).getKendoWindow().center();
    }

    //manderi alip baza jiberedi
    function saveRecord() {
        var dataItem = app.grid.dataItem(app.grid.select());
        app.editObject = dataItem;
        try {
            if ($('.INP_FIO').val() == "" || $('.INP_LOGIN').val() == "" || $('.INP_PASSWORD').val() == "") {
                openAlertWindow("Мәліметтер толтыру керек!");

            } else {
                if (app.editMode == "add") {

                    $.post(rootUrl + 'Home/insert_tbl_teacher', {

                        FIO: $('.INP_FIO').val(),
                        LOGIN: $('.INP_LOGIN').val(),
                        PASSWORD: $('.INP_PASSWORD').val(),
                        SUBJECTS: dataItem_NAME
                            //app.cmbx_subject.value(),
                        
                    }, function (data) {
                        if (data.ErrorMessage) {
                            openAlertWindow(data.ErrorMessage);

                        } else {
                            console.log(data);
                            get_ValueTeacher();
                            app.modalInstrumentsWindow.close();
                        }
                    });

                } else {
                    app.modalInstrumentsWindow.close();

                    //Модальное окно ашылганда save болмаса update болады
                    $.post(rootUrl + 'Home/update_tbl_teacher', {
                        ID: dataItem.ID,
                        FIO: $('.INP_FIO').val(),
                        LOGIN: $('.INP_LOGIN').val(),
                        PASSWORD: $('.INP_PASSWORD').val(),                     
                        SUBJECTS: dataItem_NAME

                    }, function (data) { // data метод кайтарган данныйлар
                        if (data.ErrorMessage) {
                            openAlertWindow(data.ErrorMessage);
                            console.log(data.ErrorMessage);
                        } else {
                            get_ValueTeacher();
                            app.modalInstrumentsWindow.close();
                        }
                    });

                }
            }
        } catch (e) {
            openAlertWindow('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }
   
     function setRecord() {

        $('.INP_FIO').val(""),
        $('.INP_LOGIN').val(""),
        $('.INP_PASSWORD').val(""),       
        $('.cmbx_subject').val("")

    }

    //update ишинде
    function setEdit() {

        var dataItem = app.grid.dataItem(app.grid.select());
        app.editObject = dataItem;
        if (dataItem == null) {
            openAlertWindow("Объект таңдалмады!");
            return;
        }
        //  string1 = JSON.parse(dataItem.CLASS_NAME);
        $('.INP_FIO').val(dataItem.FIO),
       $('.INP_LOGIN').val(dataItem.LOGIN),
       $('.INP_PASSWORD').val(dataItem.PASSWORD),
      // $('.cmbx_subject').val(dataItem.SUBJECTS),
        console.log(dataItem.SUBJECTS);
        //app.cmbx_subject.value(""),

               app.modalInstrumentsWindow.open();

        console.log('[update ишинде dataItem],', dataItem);
    }
   
    
});
