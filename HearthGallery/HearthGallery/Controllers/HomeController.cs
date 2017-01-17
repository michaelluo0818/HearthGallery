using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HearthGallery.Controllers
{
    public class HomeController : Controller
    {
        //redirect to views/home/index
        public ActionResult Index()
        {
            return View();
        }
    }
}
