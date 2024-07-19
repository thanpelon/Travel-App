"use client";

import React, { useEffect, useState } from "react";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Form } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CalendarDaysIcon } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";

const Hotels = () => {
  const [showHotelSearch, setShowHotelSearch] = useState(true);
  const [showOfferSearch, setShowOfferSearch] = useState(true);
  const [showOffersOnCitySearch, setShowOffersOnCitySearch] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex-grow flex flex-col items-center">
        <div className="flex-grow flex flex-col items-center">
          <Button
            onClick={() => setShowHotelSearch(!showHotelSearch)}
          >
            {showHotelSearch
              ? "/\\ Show hotel search /\\"
              : "\\/ Show hotel search \\/"
            }
          </Button>
          {showHotelSearch && <HotelSearchSection />}
        </div>
        <div className="flex-grow flex flex-col items-center">
          <Button
            onClick={() => setShowOfferSearch(!showOfferSearch)}
          >
            {showOfferSearch
              ? "/\\ Show offer search /\\"
              : "\\/ Show offer search \\/"
            }
          </Button>
          {showOfferSearch && <OfferSearchSection />}
        </div>
        <div className="flex-grow flex flex-col items-center">
          <Button
            onClick={() => setShowOffersOnCitySearch(!showOffersOnCitySearch)}
          >
            {showOffersOnCitySearch
              ? "/\\ Show offers on city search /\\"
              : "\\/ Show offers on city search \\/"
            }
          </Button>
          {showOffersOnCitySearch && <OffersOnCitySection />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HotelSearch({ resultSetter }) {
  const rawSubTypes = [
    "HOTEL_LEISURE",
    "HOTEL_GDS",
  ];

  const [keyword, setKeyword] = useState("");
  const [subType, setSubType] = useState(rawSubTypes[0]);
  const [max, setMax] = useState(15);

  async function handleSubmit(e) {
    if (e) e.preventDefault();

    try {
      const params = {
        keyword,
        subType,
        max,
      };

      const response =  await axios.get(
        '/test/api/reference/hotels/search/keyword?' +
          new URLSearchParams(params)
      );

      resultSetter(response.data.data);

    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  }

  return (
    <form
      className='flex flex-col gap-5 w-2xl p-6 bg-background shadow-xl rounded-sm'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-5'>
        <h2 className="text-center text-2xl">
          Hotels Search
        </h2>
        <div className="relative max-w-2xl mt-4 flex">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <Input
            type="search"
            placeholder="Search Hotels"
            className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-2xl">
          Subtype
        </h2>
        <select
          name="thing"
          id="subtype"
          className="px-4 py-2 rounded-md"
          value={subType}
          onChange={e => setSubType(e.target.value)}
        >
          {rawSubTypes.map((rawSubType) => {
            const subType = rawSubType.split("_")[1];

            return (
              <option value={rawSubType} key={rawSubType}>
                {subType}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-2xl">
          Max
        </h2>
        <Input
          type="number"
          min={1}
          max={20}
          value={max}
          onChange={e => setMax(parseInt(e.target.value))}
        />
      </div>
      <Button>Search Hotels</Button>
    </form>
  );
}

function HotelSearchResults({rawHotelResults}) {
  const displayedHotelResults = rawHotelResults.map(hotelResult => {
    const geoCode = hotelResult.geoCode;

    return [
      { key: "Name", value: hotelResult.name },
      { key: "Country", value: hotelResult.address.countryCode },
      { key: "City", value: hotelResult.address.cityName },
      { key: "GeoCode", value: `${geoCode.latitude}, ${geoCode.longitude}` },
      { key: "Hotels", value: hotelResult.hotelIds.join(", ") },
    ]
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
      {displayedHotelResults.map((hotelResult: Array<{ key: string, value: string }>, i: number) => {
        return (
          <div className="p-4 bg-sky-50 shadow-lg" key={i}>
            {hotelResult.map((detail: { key: string, value: string }, j: number) => {
              return (
                <div className="flex gap-5" key={j}>
                  <div className="text-md">{detail.key + ":"}</div>
                  <div>{detail.value}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function HotelSearchSection() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="bg-slate-50 flex flex-col items-center">
      <div className="p-6">
        <HotelSearch resultSetter={setSearchResult}/>
      </div>

      <div className="p-6 ">
        {searchResult.length == 0
          ? "Go search something..."
          : <HotelSearchResults rawHotelResults={searchResult}/>
        }
      </div>
    </div>
  );
}

function OfferSearch({ setResults }) {
  const priceStep = 10;

  const [hotelId, setHotelId] = useState("");
  const [adults, setAdults] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      return;
    }

    try {
      const params = {
        hotelIds: hotelId,
        adults,
        checkInDate,
        checkOutDate,
        priceRange: `${minPrice}-${maxPrice}`,
        currency: "USD",
      };
      console.log(params);

      const response = await axios.get(
        "/test/api/reference/hotels/offers/search?" +
          new URLSearchParams(params)
      );

      setResults(response.data.data);
    } catch (error) {
      console.log("Error fetching offerData...", error);
      // TODO: Display property not found error
    }
  }

  return (
    <form
      className='flex flex-col gap-5 w-2xl p-6 bg-background shadow-xl rounded-sm'
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-items-center">
        <div className='flex gap-5 items-center'>
          <span className="text-center text-xl items-center">
            Hotel Id:
          </span>
          <div className="relative max-w-2xl flex">
            <Input
              type="text"
              className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
              placeholder="Hotel ID"
              value={hotelId}
              onChange={e => setHotelId(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <span className="text-center text-xl">
            Adults:
          </span>
          <Input
            type="number"
            className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
            placeholder="Adults"
            min={1}
            max={9}
            step={priceStep}
            value={adults}
            onChange={e => setAdults(parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <CalendarDaysIcon className="w-6 h-6 text-muted-foreground" />
          <div className="flex-1">
            <label
              htmlFor="departure-date"
              className="block text-sm font-medium text-muted-foreground"
            >
              Check In
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="departure-date"
                  variant="outline"
                  className="w-full mt-1 justify-start text-left font-normal"
                >
                  <span>{checkInDate || "Select date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={checkInDate ? new Date(checkInDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setCheckInDate(date.toLocaleDateString('en-CA')); // Formats as YYYY-MM-DD
                    }
                  }}
                  disabled={(date) => (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) || (
                    checkOutDate.length !== 0 && (date > new Date(checkOutDate))
                  )} // Disable dates before today
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <label
              htmlFor="return-date"
              className="block text-sm font-medium text-muted-foreground"
            >
              Check Out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="return-date"
                  variant="outline"
                  className="w-full mt-1 justify-start text-left font-normal"
                >
                  <span>{checkOutDate || "Select date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={checkOutDate ? new Date(checkOutDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setCheckOutDate(date.toLocaleDateString('en-CA')); // Formats as YYYY-MM-DD
                    }
                  }}
                  disabled={(date) => (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) || (
                    checkInDate.length !== 0 && (date.setHours(0) < new Date(checkInDate).setHours(0))
                  )} // Disable dates before today
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='flex gap-5 items-center'>
          <label htmlFor="offer-min-price" className='flex items-center gap-5'>
            <span className="text-center text-xl items-center">
              Min:
            </span>
            <div className="relative max-w-2xl flex">
              <Input
                type="number"
                className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
                placeholder="Min Price"
                id="offer-min-price"
                min={0}
                max={maxPrice - priceStep}
                step={priceStep}
                value={minPrice}
                onChange={e => setMinPrice(parseInt(e.target.value))}
              />
            </div>
          </label>
          <label htmlFor="offer-max-price" className='flex items-center gap-5'>
            <span className="text-center text-xl items-center">
              Max:
            </span>
            <div className="relative max-w-2xl flex">
              <Input
                type="number"
                className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
                placeholder="Max Price"
                id="offer-max-price"
                min={minPrice + priceStep}
                value={maxPrice}
                onChange={e => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
          </label>
        </div>
      </div>
      <Button>Search Hotel Offers</Button>
    </form>
  );
}

// look here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
const options1: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
};

const dateTimeFormatter = new Intl.DateTimeFormat('en', options1);

function screamingCamelCaseToCapitalized(string: string) {
  return string
    .toLowerCase()
    .split("_")
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
}

const OfferResults = React.memo(function OfferResults({ results }) {
  console.log("rendered offer results");
  const hotelOffers = results.flatMap((hotelWithOffer) => {
    const { hotel, offers } = hotelWithOffer;
    const { hotelId, name, contact } = hotel;

    return offers.map((offer) => {
      offer.hotel = { hotelId, name, contact };
      return offer;
    });
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {hotelOffers.map((hotelOffer) => {
        return <OfferResult offer={hotelOffer} key={hotelOffer.id} />
      })}
    </div>
  )
});

// originally from:
// https://stackoverflow.com/questions/542938/how-to-calculate-number-of-days-between-two-dates/543152#543152
function datesDaysDiff(first: Date, second: Date) {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const millisDifference = second.valueOf() - first.valueOf();

  return Math.round(millisDifference / millisecondsInADay);
}

const OfferResult = React.memo(function OfferResult({ offer }) {
  const { hotel, room, price } = offer;
  const { name, hotelId } = hotel;

  const checkInDate = new Date(offer.checkInDate);
  const checkOutDate = new Date(offer.checkOutDate);
  const checkInOutRange = dateTimeFormatter.formatRange(checkInDate, checkOutDate);

  const daysOfStay = Math.abs(datesDaysDiff(checkInDate, checkOutDate));
  const unformattedAverage = price.total / daysOfStay;
  let averagePrice = unformattedAverage.toFixed(2);

  const [imageHref, setImageHref] = useState("");

  console.log("here");
  useEffect(() => {
    const fetchPhotos = async (signal: AbortSignal) => {
      try {
        const hotelPhotoReference = await axios.get(
          '/test/api/reference/hotels/id?' +
            new URLSearchParams({
                hotelIds: hotelId,
            })
            , { signal }
          )
          .then(response => response["data"]["data"][0]["photo_reference"]);

        if (!hotelPhotoReference) {
          throw Error("No references found.");
        }

        const results = await axios.get(
          '/test/api/reference/hotels/photo/' + hotelPhotoReference,
          { params: { maxWidth: "200", }, responseType: "blob", signal }
        ).then((response) => {
          const imageBlob = response.data;
          const objectURL = window.URL.createObjectURL(imageBlob);

          setImageHref(objectURL);
        });

        console.log({ photoReference: hotelPhotoReference });
      } catch (error) {
        console.error("Failed fetching of photos:", error);
      }
    }

    const controller = new AbortController();
    fetchPhotos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [offer]);

  console.log(offer);
  return (
    <div
      className="flex justify-center items-stretch min-w-px w-screen lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm text-secondary-foreground shadow-lg h-36"
      key={offer.checkInDate + offer.checkOutDate + price.total}
    >
      <div className="bg-sky-50 rounded-l-md h-full min-w-[200px]">
        <img
          src={imageHref}
          width={200}
          alt={`Image of ${hotel.name}`}
          className="object-cover h-full grid place-content-center rounded-l-md shadow-lg"
        />
      </div>
      <div className="flex-1 flex gap-3 justify-stretch items-center min-w-px bg-background rounded-r-md px-6 py-4">
        <div className="flex-1 flex flex-col gap-3 min-w-px">
          <div className="truncate">
            <h2 className="text-2xl truncate">{hotel.name}</h2>
            <p>
              {checkInOutRange}
            </p>
          </div>
          <div>
            <span>{screamingCamelCaseToCapitalized(room.typeEstimated.category)}</span>
            <p>
              <span>{room.typeEstimated.beds} </span>
              <span className="italic">{room.typeEstimated.bedType}</span>
              <span>-sized bed(s)</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <h3 className="text-2xl">
                <span>{price.currency} </span>
                <span>{averagePrice}</span>
              </h3>
              <p className="text-muted-foreground">
                <span>Total Price: </span>
                <span>{price.currency} </span>
                <span>{price.total} </span>
              </p>
            </div>
            <Button className="w-64"> {'>'} Book </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

function OfferSearchSection() {
  const [results, setResults] = useState([]);

  return (
    <div className="bg-slate-50 flex flex-col items-center">
      <div className="p-3">
        <OfferSearch setResults={setResults}/>
      </div>
      <div className="p-3 grid place-content-center">
        {results.length === 0
          ? (<p>Go search something...</p>)
          : <OfferResults results={results}/>
        }
      </div>
    </div>
  );
}

function OffersOnCitySection() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="bg-slate-50 flex flex-col items-center">
      <div className="p-6">
        <OffersOnCitySearch setResults={setSearchResult}/>
      </div>

      <div className="p-6 min-w-px grid place-content-center">
        {searchResult.length == 0
          ? "Go search something..."
          : <OfferResults results={searchResult}/>
        }
      </div>
    </div>
  );
}

function OffersOnCitySearch({ setResults }) {
  const priceStep = 10;
  const maxHotels = 20;
  const minimumHotelsToFetch = 10;

  const [cityIataCode, setCityIataCode] = useState("");
  const [adults, setAdults] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      return;
    }

    try {
      const citySearchParams: Record<string, string> = {
        cityCode: cityIataCode,
        radius: "10",
      };

      const citySearchResponse = await axios.get(
        "/test/api/reference/hotels/search/city?" +
          new URLSearchParams(citySearchParams)
      );

      const hotelsData = citySearchResponse.data.data;
      let hotelsWithOffers = [];

      while (hotelsData.length > 0 && hotelsWithOffers.length < minimumHotelsToFetch) {
        try {
          console.log("Remaining hotels fetched:", hotelsData.length);
          console.log("Hotels with offers:", hotelsWithOffers.length);

          const hotelIds = hotelsData
            .splice(0, maxHotels)
            .map((hotelInfo) => hotelInfo.hotelId)
            .join(",");

          const offerSearchParams: Record<string, string> = {
            hotelIds,
            // amenities: , // TODO
            adults: adults.toString(),
            checkInDate: checkInDate.toString(),
            checkOutDate: checkOutDate.toString(),
            priceRange: `${minPrice}-${maxPrice}`,
            currency: "USD",
          };

          const hotelOffersResponse = await axios.get(
            "/test/api/reference/hotels/offers/search?" +
              new URLSearchParams(offerSearchParams)
          );

          console.log(hotelOffersResponse.data);
          Array.prototype.push.apply(hotelsWithOffers, hotelOffersResponse.data.data);
        } catch (error) {
          if (error.response?.data?.message?.length !== 0) {
            continue;
          }

          throw error;
        }
      }

      console.log(hotelsWithOffers);
      setResults(hotelsWithOffers);
    } catch (error) {
      console.log("Error fetching offerData...", error);
      // TODO: Display property not found error
    }
  }

  return (
    <form
      className='flex flex-col gap-5 w-2xl p-6 bg-background shadow-xl rounded-sm'
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-items-center">
        <div className='flex gap-5 items-center'>
          <span className="text-center text-xl items-center">
            City Iata Code:
          </span>
          <div className="relative max-w-2xl flex">
            <Input
              type="text"
              className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
              placeholder="City Code"
              value={cityIataCode}
              onChange={e => setCityIataCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <span className="text-center text-xl">
            Adults:
          </span>
          <Input
            type="number"
            className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
            placeholder="Adults"
            min={1}
            max={9}
            step={priceStep}
            value={adults}
            onChange={e => setAdults(parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <CalendarDaysIcon className="w-6 h-6 text-muted-foreground" />
          <div className="flex-1">
            <label
              htmlFor="departure-date"
              className="block text-sm font-medium text-muted-foreground"
            >
              Check In
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="departure-date"
                  variant="outline"
                  className="w-full mt-1 justify-start text-left font-normal"
                >
                  <span>{checkInDate || "Select date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={checkInDate ? new Date(checkInDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setCheckInDate(date.toLocaleDateString('en-CA')); // Formats as YYYY-MM-DD
                    }
                  }}
                  disabled={(date) => (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) || (
                    checkOutDate.length !== 0 && (date > new Date(checkOutDate))
                  )} // Disable dates before today
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <label
              htmlFor="return-date"
              className="block text-sm font-medium text-muted-foreground"
            >
              Check Out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="return-date"
                  variant="outline"
                  className="w-full mt-1 justify-start text-left font-normal"
                >
                  <span>{checkOutDate || "Select date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={checkOutDate ? new Date(checkOutDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setCheckOutDate(date.toLocaleDateString('en-CA')); // Formats as YYYY-MM-DD
                    }
                  }}
                  disabled={(date) => (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) || (
                    checkInDate.length !== 0 && (date.setHours(0) < new Date(checkInDate).setHours(0))
                  )} // Disable dates before today
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='flex gap-5 items-center'>
          <label htmlFor="offer-min-price" className='flex items-center gap-5'>
            <span className="text-center text-xl items-center">
              Min:
            </span>
            <div className="relative max-w-2xl flex">
              <Input
                type="number"
                className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
                placeholder="Min Price"
                id="offer-min-price"
                min={0}
                max={maxPrice - priceStep}
                step={priceStep}
                value={minPrice}
                onChange={e => setMinPrice(parseInt(e.target.value))}
              />
            </div>
          </label>
          <label htmlFor="offer-max-price" className='flex items-center gap-5'>
            <span className="text-center text-xl items-center">
              Max:
            </span>
            <div className="relative max-w-2xl flex">
              <Input
                type="number"
                className="bg-gray-100 text-black placeholder:text-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
                placeholder="Max Price"
                id="offer-max-price"
                min={minPrice + priceStep}
                value={maxPrice}
                onChange={e => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
          </label>
        </div>
      </div>
      <Button>Search Hotel Offers</Button>
    </form>
  );
}

export default Hotels;
