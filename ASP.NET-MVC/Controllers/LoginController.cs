using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using schoolDbMvc.baza_con;

namespace schoolDbMvc.Controllers
{
    
    public class LoginController : Controller
    {
        COPI_15_12_16Entities3 con = new COPI_15_12_16Entities3();
       public ActionResult LoginDemo (){
      
           return View();
       }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult selectUser(int id, string val_log, string val_pass)
        {
            try
            {

                string sqlQuery = "";
                if (id == 1)
                {
                    sqlQuery = "SELECT * FROM TBL_ADMINS  WHERE TBL_ADMINS.LOGIN LIKE '"+ val_log +"' AND TBL_ADMINS.PASSWORD LIKE '"+ val_pass +"'";
                    var items = con.Database.SqlQuery<TBL_ADMINS>(sqlQuery).ToList();
                    return Json(items);
                }               

                if (id == 2)
                {
                    sqlQuery = "SELECT * FROM TBL_MODERATORS  WHERE TBL_MODERATORS.LOGIN LIKE '" + val_log + "' AND TBL_MODERATORS.PASSWORD LIKE '" + val_pass + "'";
                    var items = con.Database.SqlQuery<TBL_MODERATORS>(sqlQuery).ToList();
                    return Json(items);
                }
                if (id == 3)
                {
                    sqlQuery = "SELECT * FROM TBL_TEACHERS  WHERE TBL_TEACHERS.LOGIN LIKE '" + val_log + "' AND TBL_TEACHERS.PASSWORD LIKE '" + val_pass + "'";
                    var items = con.Database.SqlQuery<TBL_TEACHERS>(sqlQuery).ToList();
                    return Json(items);
                }
                if (id == 4)
                {
                    sqlQuery = "SELECT * FROM TBL_STUDENS  WHERE TBL_STUDENS.LOGIN LIKE '" + val_log + "' AND TBL_STUDENS.PASSWORD LIKE '" + val_pass + "'";
                    var items = con.Database.SqlQuery<TBL_STUDENS>(sqlQuery).ToList();
                    return Json(items);
                }

                

                return Json(null);
            }
            catch (Exception ex)
            {
                Dictionary<string, object> list = new Dictionary<string, object>();
                list["ErrorMessage"] = ex.Message;
                return Json(list);
            }
        }

        public ActionResult Admins() {
            return View();
        
        }
        public ActionResult Moderators() {
            return View();
        }
        public ActionResult Teachers() {
            return View();
        }
        public ActionResult Studens() {
            return View();
        }
    }
}
