using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto()
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(it => new BasketItemDto()
                {
                    ProductId = it.ProductId,
                    Name = it.Product.Name,
                    Price = it.Product.Price,
                    PictureUrl = it.Product.PictureUrl,
                    Type = it.Product.Type,
                    Brand = it.Product.Brand,
                    Quantity = it.Quantity
                }).ToList(),
            };
        }
    }
}