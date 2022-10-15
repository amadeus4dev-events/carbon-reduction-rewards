import type { NextPage } from "next";
import axios from "axios";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import { useTrip } from "../../services/trips";
import Link from "next/link";
import { SearchResult } from "../api/hotels";
import toTitleCase from "../../lib/toTitleCase";
import { useState } from "react";
import countriesByCode from "../../lib/countriesByCode";

interface StayFormValues {
  nights: number;
  keyword: string;
}

interface StayFormProps {
  setNights: (nights: number) => void;
  setResults: (results: SearchResult[]) => void;
}

const StayForm = ({ setNights, setResults }: StayFormProps) => {
  const router = useRouter();
  const methods = useForm<StayFormValues>({
    defaultValues: {
      nights: 3,
    },
  });
  const { register, handleSubmit } = methods;

  const { addStay } = useTrip();
  const onSubmit: SubmitHandler<StayFormValues> = async ({
    nights,
    keyword,
  }) => {
    if (nights && keyword) {
      const { status, data } = await axios.get<SearchResult[]>("/api/hotels", {
        params: {
          keyword,
        },
      });
      console.log(status, data);

      if (status === 200) {
        console.log(data);
        setNights(nights);
        setResults(data);
      } else {
        // TODO: Error
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-[200px_1fr_200px]">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Number of nights</span>
            </label>
            <select className="select w-full max-w-xs" {...register("nights")}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Search Query</span>
            </label>
            <input
              type="text"
              placeholder="Query"
              className="input input-bordered w-full "
              {...register("keyword")}
            />
          </div>
          <button type="submit" className="mt-6 btn btn-primary self-end">
            Search
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

interface AccommodationSelectProps {
  nights: number;
  results: SearchResult[];
}

const AccommodationSelect = ({ nights, results }: AccommodationSelectProps) => {
  const router = useRouter();
  const { addStay } = useTrip();

  if (results.length === 0) {
    return (
      <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
        No results yet.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto border">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{toTitleCase(result.name)}</td>
              {/* @ts-ignore */}
              <td>{countriesByCode[result.address.countryCode] ?? ""}</td>
              <td>{toTitleCase(result.address.cityName)}</td>
              <td className="text-right">
                <button
                  onClick={() => {
                    addStay({
                      accommodation: {
                        name: toTitleCase(result.name),

                        city: toTitleCase(result.address.cityName),
                        country:
                          // @ts-ignore
                          countriesByCode[result.address.countryCode] ?? "",
                        isSustainable: true,
                      },
                      nights,
                      kilosCo2: 103.52,
                    });
                    router.push("/trips/new");
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Stay: NextPage = () => {
  const [nights, setNights] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <div className="container px-8 py-4">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/trips">
              <a>Your Trips</a>
            </Link>
          </li>
          <li>
            <Link href="/trips/new">
              <a>New Trip</a>
            </Link>
          </li>
          <li>Add Stay</li>
        </ul>
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Add Accommodation Stay
      </h1>
      <StayForm setNights={setNights} setResults={setResults} />
      <AccommodationSelect nights={nights} results={results} />
    </div>
  );
};

export default Stay;
