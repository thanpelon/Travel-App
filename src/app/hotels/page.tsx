"use client";

import React, { useState } from "react";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Form } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import axios from "axios";

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

      <div className="p-6">
        {searchResult.length == 0
          ? "Go search something..."
          : <HotelSearchResults rawHotelResults={searchResult}/>
        }
      </div>
    </div>
  );
}

const Hotels = () => {
  const [showHotelSearch, setShowHotelSearch] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex-grow flex flex-col items-center">
        <Button
          onClick={() => setShowHotelSearch(!showHotelSearch)}
        >
          {showHotelSearch
            ? "/\\ Show hotel search /\\"
            : "\\/ Show hotel search \\/"
          }
        </Button>
        {showHotelSearch && <HotelSearchSection />}
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;
