import type { NextPage } from "next";
import axios from "axios";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

import Combobox from "../../components/Combobox";
import { useTrip, Airport } from "../../services/trips";
import airports from "../../lib/airports";

interface FlightFormValues {
  origin: Airport;
  destination: Airport;
  flightNumber: string;
  travelClass: string;
  isReturn: boolean;
}

const displayValue = (a: Airport) => (a ? `${a.name} (${a.iataCode})` : "");
const getKey = ({ iataCode }: Airport) => iataCode;

const FlightForm = () => {
  const router = useRouter();
  const methods = useForm<FlightFormValues>({
    defaultValues: {
      travelClass: "economy",
      isReturn: false,
    },
  });
  const { register, handleSubmit } = methods;

  const { addFlight } = useTrip();
  const onSubmit: SubmitHandler<FlightFormValues> = async ({
    origin,
    destination,
    flightNumber,
    travelClass,
    isReturn,
  }) => {
    if (origin && destination) {
      const { status, data } = await axios.get("/api/flights", {
        params: {
          origin: origin.iataCode,
          destination: destination.iataCode,
          travelClass,
          isReturn,
        },
      });

      if (status === 200) {
        console.log(data);
        addFlight({
          origin,
          destination,
          flightNumber: flightNumber ?? null,
          travelClass,
          isReturn,
          distance: data.distance,
          kilosCo2: data.kilosCo2,
        });
        router.push("/trips/new");
      } else {
        // TODO: Error
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Origin</span>
          </label>
          <Combobox
            name="origin"
            options={airports}
            displayValue={displayValue}
            getKey={getKey}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <Combobox
            name="destination"
            options={airports}
            displayValue={displayValue}
            getKey={getKey}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Flight Number (optional)</span>
          </label>
          <input
            type="text"
            placeholder="Flight Number"
            className="input input-bordered w-full max-w-xs"
            {...register("flightNumber")}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Travel Class</span>
          </label>
          <select
            className="select w-full max-w-xs"
            {...register("travelClass")}
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium Economy</option>
            <option value="business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Is Return?</span>
          </label>
          <input type="checkbox" className="toggle" {...register("isReturn")} />
        </div>

        <button type="submit" className="mt-6 btn btn-primary">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

const Flight: NextPage = () => (
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
        <li>Add Flight</li>
      </ul>
    </div>
    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Add Flight
    </h1>
    <FlightForm />
  </div>
);

export default Flight;
