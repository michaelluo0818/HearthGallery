using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

//A deck object that contains the users id and 30 cards.
namespace HearthGallery.Models
{
    [Table("Decks")]
    public class Deck
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        [MaxLength(16)]
        public string hero { get; set; }

        [Required]
        [MaxLength(32)]
        public string deckName { get; set; }

        [Required]
        public ICollection<Card> cards { get; set; }
    }

    //db context for db access
    public class HearthGalleryDbContext : DbContext
    {
        public DbSet<Deck> Decks { get; set; }

        public DbSet<Card> Cards { get; set; }
    }
}