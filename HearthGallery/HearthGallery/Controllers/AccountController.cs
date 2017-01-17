using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using HearthGallery.ViewModels;
using HearthGallery.Models;
using HearthGallery.Filters;

namespace MvcApplication1.Controllers
{
    [Authorize]
    [InitializeSimpleMembership]
    public class AccountController : Controller
    {
        //
        // GET: /Account/Login

            //Redirect to views/account/login
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        //
        // POST: /Account/Login
        //Logs the user in, return json message back to client

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                return Json(new
                {
                    Succeeded = true,
                    Message = "User was successfully logged in."
                });
            }

            return Json(new
            {
                Succeeded = false,
                Message = "Login failed."
            });
        }

        //
        // POST: /Account/LogOff

        //Logs the user off, return json message back to client
        [HttpPost]
        public ActionResult LogOff()
        {
            WebSecurity.Logout();

            return Json(new
            {
                Succeeded = true,
                Message = "User was successfully logged off."
            });
        }

        //
        // GET: /Account/Register
        //redirect to views/account/register

        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        //registers an account if the user name is unique in the database                                

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                try
                {
                    WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
                    WebSecurity.Login(model.UserName, model.Password);
                    return Json(new
                    {
                        Succeeded = true,
                        Message = "User was successfully registered."
                    });
                }
                catch (MembershipCreateUserException e)
                {
                    ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
                }
            }

            return Json(new
            {
                Succeeded = false,
                Message = "Registration has failed."
            });
        }

        //generated error log center
        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
    }
}
