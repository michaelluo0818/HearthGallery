using HearthGallery.ViewModels;
using HearthGallery.Models;
using System;
using System.Data;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using WebMatrix.WebData;
using HearthGallery.Filters;

namespace HearthGallery.Controllers
{
    [InitializeSimpleMembership]
    public class DeckBuilderController : Controller
    {
        //Db context used to read and write data to database.
        private readonly HearthGalleryDbContext db = new HearthGalleryDbContext();

        /**
         * Redirect to view/deckbuilder/index if user is logged in
         * views/deckbuilder/error if not logged in 
         */
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("error");
            }
            return View();
        }

        //Redirect to views/deckbuilder/error
        public ActionResult Error()
        {
            return View();
        }

        /**
         * Redirect to view/deckbuilder/decks if user is logged in
         * views/deckbuilder/error if not logged in 
         */
        public ActionResult Decks()
        {
            if(!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("error");
            }
            return View();
        }

        /**
         *  Retreive all decks belonging to currently logged in user
         */
        [HttpPost]
        public ActionResult DeckLists()
        {
            try
            {
                int id = WebSecurity.GetUserId(User.Identity.Name);

                var lists = from e in db.Decks
                            where e.userId == id
                            select e;
                return Json(new
                {
                    Succeeded = true,
                    Lists = lists.ToList()
                });

            } catch (Exception e)
            {}

            return Json(new
            {
                Succeeded = false,
                Message = "Failed to retrieve deck list."
            });
        }

        /**
         *  Retreive detailed information of a deck through given id
         */
        [HttpPost]
        public ActionResult DeckInfo(Guid id)
        {
            try
            {
                var deck = from e in db.Decks.Include(x => x.cards)
                            where e.id == id
                            select e;
                return Json(new
                {
                    Succeeded = true,
                    Deck = deck.FirstOrDefault()
                });
            }
            catch (Exception e) { }
            return Json(new
            {
                Succeeded = false,
                Message = "Failed to retrieve deck information."
            });
        }
        
        /**
         *  Create a deck listing and save it to the database
         */
        [HttpPost]
        public ActionResult Create(string deckName, string hero, IList<DeckList> cards)
        {
            Deck deck = new Deck();
            Card cardToAdd;
             try
            {
                deck.id = Guid.NewGuid();
                deck.userId = WebSecurity.GetUserId(User.Identity.Name);
                deck.hero = hero;
                deck.deckName = deckName;
                deck.cards = new List<Card>();

                foreach (DeckList card in cards)
                {
                    cardToAdd = new Card();
                    cardToAdd.id = Guid.NewGuid();
                    cardToAdd.cardId = card.id;
                    cardToAdd.name = card.name;
                    cardToAdd.cost = card.cost;
                    cardToAdd.quantity = card.quantity;
                    deck.cards.Add(cardToAdd);
                }

                db.Decks.Add(deck);
                db.SaveChanges();
            } catch(Exception e)
            {
                return Json(new
                {
                    Succeeded = false,
                    Message = "Deck was not successfully created"
                });
            }

            return Json(new
            {
                Succeeded = true,
                Message = "Deck has been successfully created"
            });
        }

    }
}
