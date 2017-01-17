using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

//A card object in a deck. A deck will always have 30 cards in it.
namespace HearthGallery.Models
{
    [Table("Cards")]
    public class Card
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        [MaxLength(16)]
        public string cardId { get; set; }

        [Required]
        [MaxLength(32)]
        public string name { get; set; }

        [Required]
        public int cost { get; set; }

        [Required]
        public int quantity { get; set; }
    }
}