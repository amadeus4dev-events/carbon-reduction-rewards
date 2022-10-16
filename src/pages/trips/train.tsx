import type { NextPage } from "next";
import axios from "axios";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

import Combobox from "../../components/Combobox";
import { useTrip, Airport } from "../../services/trips";
import airports from "../../lib/airports";

interface TrainFormValues {
  origin: Airport;
  destination: Airport;
  isReturn: boolean;
}

const displayValue = (a: Airport) => (a ? a.cityName : "");
const getKey = ({ iataCode }: Airport) => iataCode;

const TrainForm = () => {
  const router = useRouter();
  const methods = useForm<TrainFormValues>({
    defaultValues: {
      isReturn: false,
    },
  });
  const { register, handleSubmit } = methods;

  const { addTrainRide } = useTrip();
  const onSubmit: SubmitHandler<TrainFormValues> = async ({
    origin,
    destination,
    isReturn,
  }) => {
    if (origin && destination) {
      const { status, data } = await axios.get("/api/trains", {
        params: {
          origin: origin.cityName,
          destination: destination.cityName,
          isReturn,
        },
      });

      if (status === 200) {
        console.log(data);
        addTrainRide({
          origin,
          destination,
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

const Train: NextPage = () => (
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
        <li>Add Train</li>
      </ul>
    </div>
    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Add Train
    </h1>
    <TrainForm />
  </div>
);

export default Train;
