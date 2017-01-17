using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HearthGallery.Controllers
{
    public class GalleryController : Controller
    {
        
        //Redirect to views/gallery/index
        public ActionResult Index()
        {
            return View();
        }

    }
}
