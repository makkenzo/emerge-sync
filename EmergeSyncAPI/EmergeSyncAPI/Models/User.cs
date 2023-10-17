﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EmergeSyncAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}
