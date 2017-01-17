using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HearthGallery.ViewModels
{
    public class DeckList
    {
        [Required]
        [MaxLength(16)]
        public string id { get; set; }

        [Required]
        [MaxLength(32)]
        public string name { get; set; }

        [Required]
        public int cost { get; set; }

        [Required]
        public int quantity { get; set; }
    }
}