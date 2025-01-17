﻿using EasyParking.Users.Dto;

namespace EasyParking.Parkings.Dto
{
    public class ParkingReservationDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public long PricePerHour { get; set; }

        public UserAccountParkingDto Owner { get; set; }
    }
}
