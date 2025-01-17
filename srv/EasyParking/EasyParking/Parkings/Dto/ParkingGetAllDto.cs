﻿using EasyParking.Extensions;
using EasyParking.Parkings.Models;
using EasyParking.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyParking.Parkings.Dto
{
    public class ParkingGetAllDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public long PricePerHour { get; set; }

        public UserAccountParkingDto Owner { get; set; }

        public IList<ParkingSpotDto> ParkingSpots { get; set; }

        public int AvailableSpots
            => ParkingSpots.Where(s => s.IsAvailableDuring(DateTime.Now, DateTime.Now.AddHours(1)))
                           .Count();
    }
}
